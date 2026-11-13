/**
 * Atelier - Checkout Flow & Interactions
 * Manages order summary, shipping address modal, payment method accordions,
 * card auto-formatting, and order confirmation modal.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Only execute on CheckoutPage.html
  if (!document.querySelector('.bigbox') && !document.querySelector('.section3')) return;

  initCheckoutPage();
});

function initCheckoutPage() {
  const addressContainer = document.querySelector('.section3 .box2');
  const changeAddressBtn = document.querySelector('.section3 .box3');
  const rightDiv = document.querySelector('.rightdiv');
  const confirmPaymentBtn = document.querySelector('.checkout');

  // Input fields for card
  const cardNumberInput = document.querySelector('.input input[type="number"], .input input');
  const expiryInput = document.querySelector('.input100 input[placeholder="MM/YY"]');
  const cvvInput = document.querySelector('.input100 input[placeholder="123"]');
  const saveCardCheck = document.querySelector('.check input[type="checkbox"]');

  // Accordion triggers
  const upiSection = document.querySelector('.section4');
  const walletSection = document.querySelector('.section5');
  const cardSection = document.querySelector('.minibox');

  let selectedPaymentMethod = 'card'; // 'card', 'upi', 'wallet'

  // Load Shipping Address
  function renderAddress() {
    const addr = AtelierStore.getShippingAddress();
    if (addressContainer) {
      addressContainer.innerHTML = `
        <h3>Shipping Address</h3>
        <p><strong>${addr.fullName}</strong> — ${addr.street}, ${addr.city}, ${addr.postcode}, ${addr.country}</p>
      `;
    }
  }

  // Setup Address Change Modal
  if (changeAddressBtn) {
    changeAddressBtn.style.cursor = 'pointer';
    changeAddressBtn.addEventListener('click', openAddressModal);
  }

  function openAddressModal() {
    const addr = AtelierStore.getShippingAddress();
    let modal = document.getElementById('address-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'address-modal';
      modal.className = 'atelier-modal-overlay';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="atelier-modal-card">
        <div class="atelier-modal-header">
          <h3 class="atelier-modal-title">Edit Shipping Address</h3>
          <button class="atelier-modal-close" aria-label="Close">&times;</button>
        </div>
        <form id="address-form" class="atelier-modal-body">
          <div class="atelier-form-group">
            <label>Recipient Name</label>
            <input type="text" id="addr-name" value="${addr.fullName}" required>
          </div>
          <div class="atelier-form-group">
            <label>Street Address</label>
            <input type="text" id="addr-street" value="${addr.street}" required>
          </div>
          <div class="atelier-form-row">
            <div class="atelier-form-group">
              <label>City</label>
              <input type="text" id="addr-city" value="${addr.city}" required>
            </div>
            <div class="atelier-form-group">
              <label>Postal Code</label>
              <input type="text" id="addr-postcode" value="${addr.postcode}" required>
            </div>
          </div>
          <div class="atelier-form-group">
            <label>Country</label>
            <input type="text" id="addr-country" value="${addr.country}" required>
          </div>
          <div class="atelier-modal-footer">
            <button type="button" class="atelier-btn-secondary close-modal-btn">Cancel</button>
            <button type="submit" class="atelier-btn-primary">Save Address</button>
          </div>
        </form>
      </div>
    `;

    modal.classList.add('open');

    function closeModal() {
      modal.classList.remove('open');
    }

    modal.querySelector('.atelier-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.close-modal-btn').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    modal.querySelector('#address-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const updated = {
        fullName: document.getElementById('addr-name').value.trim(),
        street: document.getElementById('addr-street').value.trim(),
        city: document.getElementById('addr-city').value.trim(),
        postcode: document.getElementById('addr-postcode').value.trim(),
        country: document.getElementById('addr-country').value.trim()
      };
      AtelierStore.saveShippingAddress(updated);
      renderAddress();
      closeModal();
      AtelierStore.showToast('Shipping address updated successfully.', 'success');
    });
  }

  // Setup Card Input Auto-formatting
  if (cardNumberInput) {
    cardNumberInput.setAttribute('type', 'text');
    cardNumberInput.setAttribute('maxlength', '19');
    cardNumberInput.setAttribute('inputmode', 'numeric');

    cardNumberInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 16);
      let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
      e.target.value = formatted;

      // Visa / Mastercard badge detection
      const visaBadge = document.querySelector('.visa:nth-child(1)');
      const mcBadge = document.querySelector('.visa:nth-child(2)');
      if (visaBadge && mcBadge) {
        if (val.startsWith('4')) {
          visaBadge.style.backgroundColor = '#333697';
          visaBadge.style.color = '#FFFFFF';
          mcBadge.style.backgroundColor = '';
          mcBadge.style.color = '';
        } else if (val.startsWith('5')) {
          mcBadge.style.backgroundColor = '#333697';
          mcBadge.style.color = '#FFFFFF';
          visaBadge.style.backgroundColor = '';
          visaBadge.style.color = '';
        }
      }
    });
  }

  if (expiryInput) {
    expiryInput.setAttribute('type', 'text');
    expiryInput.setAttribute('maxlength', '5');
    expiryInput.setAttribute('inputmode', 'numeric');

    expiryInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 4);
      if (val.length >= 2) {
        val = val.substring(0, 2) + '/' + val.substring(2);
      }
      e.target.value = val;
    });
  }

  if (cvvInput) {
    cvvInput.setAttribute('type', 'password');
    cvvInput.setAttribute('maxlength', '4');
    cvvInput.setAttribute('inputmode', 'numeric');
  }

  // Setup Payment Accordions (Card vs UPI vs Wallets)
  setupPaymentAccordions();

  function setupPaymentAccordions() {
    const cardHeader = document.querySelector('.di');
    if (cardHeader) {
      cardHeader.style.cursor = 'pointer';
      cardHeader.addEventListener('click', () => {
        selectPaymentMethod('card');
      });
    }

    if (upiSection) {
      upiSection.style.cursor = 'pointer';
      // Add accordion content if not present
      if (!upiSection.querySelector('.upi-content')) {
        const upiContent = document.createElement('div');
        upiContent.className = 'upi-content';
        upiContent.style.display = 'none';
        upiContent.style.padding = '15px 20px';
        upiContent.style.background = '#FFFFFF';
        upiContent.style.borderRadius = '8px';
        upiContent.style.marginTop = '10px';
        upiContent.innerHTML = `
          <div style="text-align: center; padding: 10px;">
            <div style="font-size: 13px; color: #697489; margin-bottom: 12px;">Scan with Google Pay, PhonePe, or Paytm</div>
            <div style="display: inline-block; padding: 12px; background: white; border: 2px dashed #333697; border-radius: 12px; margin-bottom: 12px;">
              <i class="fa-solid fa-qrcode" style="font-size: 100px; color: #1E1B4B;"></i>
            </div>
            <div style="margin-top: 10px;">
              <input type="text" id="upi-vpa" placeholder="username@bank (Optional VPA)" style="width: 80%; max-width: 280px; padding: 8px 12px; border: 1px solid #CBD5E1; border-radius: 6px; font-size: 14px;">
            </div>
          </div>
        `;
        upiSection.appendChild(upiContent);
      }

      upiSection.querySelector('.code').addEventListener('click', (e) => {
        e.stopPropagation();
        selectPaymentMethod('upi');
      });
    }

    if (walletSection) {
      walletSection.style.cursor = 'pointer';
      if (!walletSection.querySelector('.wallet-content')) {
        const walletContent = document.createElement('div');
        walletContent.className = 'wallet-content';
        walletContent.style.display = 'none';
        walletContent.style.padding = '15px 20px';
        walletContent.style.background = '#FFFFFF';
        walletContent.style.borderRadius = '8px';
        walletContent.style.marginTop = '10px';
        walletContent.innerHTML = `
          <div style="display: flex; flex-direction: column; gap: 10px; max-width: 320px; margin: 0 auto; padding: 10px 0;">
            <button type="button" class="wallet-btn" style="padding: 12px; background: #000; color: white; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
              <i class="fa-brands fa-apple" style="font-size: 18px;"></i> Apple Pay
            </button>
            <button type="button" class="wallet-btn" style="padding: 12px; background: #0070BA; color: white; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
              <i class="fa-brands fa-paypal" style="font-size: 18px;"></i> PayPal Fast Checkout
            </button>
          </div>
        `;
        walletSection.appendChild(walletContent);
      }

      walletSection.querySelector('.codee').addEventListener('click', (e) => {
        e.stopPropagation();
        selectPaymentMethod('wallet');
      });
    }
  }

  function selectPaymentMethod(method) {
    selectedPaymentMethod = method;
    const cardInputs = document.querySelector('.minibox > div:last-child');
    const upiContent = upiSection ? upiSection.querySelector('.upi-content') : null;
    const walletContent = walletSection ? walletSection.querySelector('.wallet-content') : null;

    if (method === 'card') {
      if (cardInputs) cardInputs.style.display = 'block';
      if (upiContent) upiContent.style.display = 'none';
      if (walletContent) walletContent.style.display = 'none';
      AtelierStore.showToast('Selected Credit / Debit Card payment', 'info');
    } else if (method === 'upi') {
      if (cardInputs) cardInputs.style.display = 'none';
      if (upiContent) upiContent.style.display = 'block';
      if (walletContent) walletContent.style.display = 'none';
      AtelierStore.showToast('Selected UPI / QR Code payment', 'info');
    } else if (method === 'wallet') {
      if (cardInputs) cardInputs.style.display = 'none';
      if (upiContent) upiContent.style.display = 'none';
      if (walletContent) walletContent.style.display = 'block';
      AtelierStore.showToast('Selected Digital Wallets payment', 'info');
    }
  }

  // Render Dynamic Order Summary from Cart
  function renderOrderSummary() {
    if (!rightDiv) return;

    const cart = AtelierStore.getCart();
    const totals = AtelierStore.getCartTotals();

    // Rebuild item previews
    const existingItems = rightDiv.querySelectorAll('.pay, .pay1');
    existingItems.forEach(item => item.remove());

    const summaryHeader = rightDiv.querySelector('.summary') || rightDiv.querySelector('h3');
    const hrLine = rightDiv.querySelector('.h22');

    let itemsHtml = '';
    cart.forEach(item => {
      itemsHtml += `
        <div class="checkout-item-preview" style="display: flex; gap: 14px; padding: 12px 20px; align-items: center;">
          <div style="width: 52px; height: 52px; border-radius: 8px; background-image: url('${item.image}'); background-size: cover; background-position: center; flex-shrink: 0; background-color: #EEE;"></div>
          <div style="flex-grow: 1;">
            <h4 style="font-size: 14px; font-weight: 700; color: #181C1F; margin-bottom: 2px;">${item.name}</h4>
            <p style="font-size: 12px; color: #697489;">Qty: ${item.quantity} · ${item.color || 'Standard'}</p>
          </div>
          <div style="font-weight: 700; font-size: 14px; color: #1E1B4B;">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
      `;
    });

    const itemsWrapper = document.createElement('div');
    itemsWrapper.className = 'checkout-items-list';
    itemsWrapper.style.maxHeight = '240px';
    itemsWrapper.style.overflowY = 'auto';
    itemsWrapper.innerHTML = itemsHtml;

    if (hrLine && hrLine.parentNode) {
      hrLine.parentNode.insertBefore(itemsWrapper, hrLine);
    }

    // Update Totals
    const subtotalVal = rightDiv.querySelector('.row1 .a');
    const shippingRow = rightDiv.querySelectorAll('.row')[0];
    const taxRow = rightDiv.querySelectorAll('.row')[1];
    const totalElem = rightDiv.querySelector('.row2 .p');

    if (subtotalVal) subtotalVal.textContent = `$${totals.subtotal}`;
    if (shippingRow) {
      const sVal = shippingRow.querySelector('.a1') || shippingRow.querySelector('.a');
      if (sVal) sVal.textContent = totals.shipping;
    }
    if (taxRow) {
      const tVal = taxRow.querySelector('.a');
      if (tVal) tVal.textContent = `$${totals.tax}`;
    }
    if (totalElem) {
      totalElem.innerHTML = `$${totals.total} <span class="inc" style="display: block; font-size: 11px; font-weight: normal; color: #697489;">Inc. VAT</span>`;
    }
  }

  // Confirm Payment & Order Success Modal
  if (confirmPaymentBtn) {
    const parentLink = confirmPaymentBtn.closest('a');
    if (parentLink) {
      parentLink.addEventListener('click', (e) => e.preventDefault());
    }

    confirmPaymentBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const cart = AtelierStore.getCart();
      if (cart.length === 0) {
        AtelierStore.showToast('Your shopping bag is empty. Please add items first.', 'error');
        setTimeout(() => {
          window.location.href = './AllProducts.html';
        }, 1200);
        return;
      }

      // If Card selected, do basic validation
      if (selectedPaymentMethod === 'card') {
        const rawCard = cardNumberInput ? cardNumberInput.value.replace(/\s/g, '') : '';
        if (rawCard.length < 15) {
          AtelierStore.showToast('Please enter a valid 16-digit card number.', 'error');
          if (cardNumberInput) cardNumberInput.focus();
          return;
        }

        if (expiryInput && expiryInput.value.length < 5) {
          AtelierStore.showToast('Please enter card expiry date (MM/YY).', 'error');
          expiryInput.focus();
          return;
        }

        if (cvvInput && cvvInput.value.length < 3) {
          AtelierStore.showToast('Please enter a valid CVV.', 'error');
          cvvInput.focus();
          return;
        }
      }

      // Show processing state
      const originalText = confirmPaymentBtn.textContent;
      confirmPaymentBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Authorizing Payment...';
      confirmPaymentBtn.style.pointerEvents = 'none';

      setTimeout(() => {
        const totals = AtelierStore.getCartTotals();
        const addr = AtelierStore.getShippingAddress();
        const orderId = `ATL-${Math.floor(100000 + Math.random() * 900000)}`;

        // Clear cart
        AtelierStore.clearCart();

        // Show Success Modal
        showOrderSuccessModal(orderId, totals.total, addr);
        confirmPaymentBtn.innerHTML = originalText;
        confirmPaymentBtn.style.pointerEvents = 'auto';
      }, 1500);
    });
  }

  function showOrderSuccessModal(orderId, total, address) {
    let modal = document.getElementById('order-success-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'order-success-modal';
      modal.className = 'atelier-modal-overlay';
      document.body.appendChild(modal);
    }

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);
    const dateFormatted = deliveryDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    modal.innerHTML = `
      <div class="atelier-modal-card">
        <div class="order-success-content">
          <div class="order-success-icon">
            <i class="fa-solid fa-check"></i>
          </div>
          <h2 class="order-success-title">Order Confirmed!</h2>
          <p class="order-success-lead">Thank you for curating with Atelier. We have received your order and started hand-crafting your shipment.</p>

          <div class="order-details-box">
            <div class="order-detail-item">
              <span style="color: #697489;">Order Reference</span>
              <strong style="color: #333697;">#${orderId}</strong>
            </div>
            <div class="order-detail-item">
              <span style="color: #697489;">Estimated Delivery</span>
              <strong>${dateFormatted}</strong>
            </div>
            <div class="order-detail-item">
              <span style="color: #697489;">Shipping To</span>
              <strong>${address.street}, ${address.city}</strong>
            </div>
            <div class="order-detail-item">
              <span>Total Paid</span>
              <span style="color: #10B981;">$${total}</span>
            </div>
          </div>

          <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
            <a href="./index.html" class="atelier-btn-primary" style="text-decoration: none; display: inline-block;">
              Return to Home
            </a>
            <a href="./AllProducts.html" class="atelier-btn-secondary" style="text-decoration: none; display: inline-block;">
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('open');
  }

  // Initial loads
  renderAddress();
  renderOrderSummary();
}
