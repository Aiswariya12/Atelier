
document.addEventListener('DOMContentLoaded', () => {
  // Only execute on CartPage.html
  if (!document.querySelector('.leftdivv') && !document.querySelector('.rightdiv')) return;

  initCartPage();
});

function initCartPage() {
  const leftDiv = document.querySelector('.leftdivv');
  const rightDiv = document.querySelector('.rightdiv');
  const subtitleElem = document.querySelector('.sec > p');

  function renderCart() {
    const cart = AtelierStore.getCart();
    const totals = AtelierStore.getCartTotals();

    // Update Header count
    if (subtitleElem) {
      if (totals.itemCount === 0) {
        subtitleElem.textContent = 'Your atelier selection is currently empty.';
      } else {
        const itemWord = totals.itemCount === 1 ? 'item' : 'items';
        subtitleElem.textContent = `You have ${totals.itemCount} ${itemWord} in your atelier selection.`;
      }
    }

    // Render Order Summary
    if (rightDiv) {
      const subtotalElem = rightDiv.querySelector('.row1 .a');
      const shippingRow = rightDiv.querySelectorAll('.row')[0];
      const taxRow = rightDiv.querySelectorAll('.row')[1];
      const totalElem = rightDiv.querySelector('.row2 .p');
      const checkoutBtn = rightDiv.querySelector('.checkout');

      if (subtotalElem) subtotalElem.textContent = `$${totals.subtotal}`;
      if (shippingRow) {
        const shippingVal = shippingRow.querySelector('.a');
        if (shippingVal) shippingVal.textContent = totals.shipping;
      }
      if (taxRow) {
        const taxVal = taxRow.querySelector('.a');
        if (taxVal) taxVal.textContent = `$${totals.tax}`;
      }
      if (totalElem) totalElem.textContent = `$${totals.total}`;

      if (checkoutBtn) {
        if (cart.length === 0) {
          checkoutBtn.style.opacity = '0.5';
          checkoutBtn.style.pointerEvents = 'none';
        } else {
          checkoutBtn.style.opacity = '1';
          checkoutBtn.style.pointerEvents = 'auto';
        }
      }
    }

    // If Cart is Empty
    if (cart.length === 0) {
      if (leftDiv) {
        leftDiv.innerHTML = `
          <div class="empty-cart-state" style="background: white; border-radius: 12px; padding: 60px 30px; text-align: center; margin: 20px 0; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
            <i class="fa-solid fa-bag-shopping" style="font-size: 50px; color: #697489; margin-bottom: 20px;"></i>
            <h2 style="font-size: 26px; font-weight: 800; color: #1E1B4B; margin-bottom: 12px;">Your shopping bag is empty</h2>
            <p style="color: #697489; max-width: 440px; margin: 0 auto 28px auto; line-height: 1.6;">
              Explore our thoughtfully curated collection of architectural silhouettes and minimalist essentials.
            </p>
            <a href="./AllProducts.html" style="display: inline-block; padding: 14px 32px; background: #333697; color: white; border-radius: 10px; font-weight: 700; text-decoration: none; transition: transform 0.2s;">
              Discover Collections
            </a>
          </div>
        `;
      }
      return;
    }

    // Render Cart Items
    if (leftDiv) {
      let itemsHtml = '';
      cart.forEach((item, index) => {
        itemsHtml += `
          <div class="cart-item-card" data-index="${index}">
            <div class="cart-item-image" style="background-image: url('${item.image}');"></div>
            <div class="cart-item-details">
              <div class="cart-item-info">
                <h3 class="cart-item-title">${item.name}</h3>
                <p class="cart-item-meta">Color: ${item.color || 'Standard'} / Size: ${item.size || 'Medium'}</p>
                <p class="cart-item-price">$${Number(item.price).toFixed(2)}</p>
              </div>
              <div class="cart-item-actions">
                <div class="quantity-controller">
                  <button class="qty-btn qty-minus" data-index="${index}" aria-label="Decrease quantity" title="Decrease quantity">
                    <i class="fa-solid fa-minus"></i>
                  </button>
                  <span class="qty-number">${item.quantity}</span>
                  <button class="qty-btn qty-plus" data-index="${index}" aria-label="Increase quantity" title="Increase quantity">
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>
                <button class="cart-item-delete" data-index="${index}" title="Remove item" aria-label="Delete item">
                  <i class="fa-regular fa-trash-can"></i>
                </button>
              </div>
            </div>
          </div>
        `;
      });

      leftDiv.innerHTML = itemsHtml;

      // Event listeners for Quantity buttons
      leftDiv.querySelectorAll('.qty-minus').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-index'), 10);
          const currentQty = cart[idx].quantity;
          AtelierStore.updateCartQuantity(idx, currentQty - 1);
          renderCart();
        });
      });

      leftDiv.querySelectorAll('.qty-plus').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-index'), 10);
          const currentQty = cart[idx].quantity;
          AtelierStore.updateCartQuantity(idx, currentQty + 1);
          renderCart();
        });
      });

      leftDiv.querySelectorAll('.cart-item-delete').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-index'), 10);
          const card = btn.closest('.cart-item-card');
          if (card) {
            card.style.opacity = '0';
            card.style.transform = 'translateX(-20px)';
            card.style.transition = 'all 0.3s ease';
            setTimeout(() => {
              AtelierStore.removeFromCart(idx);
              renderCart();
            }, 300);
          } else {
            AtelierStore.removeFromCart(idx);
            renderCart();
          }
        });
      });
    }
  }

  // Initial render
  renderCart();

  // Listen for global cart updates
  window.addEventListener('cartUpdated', () => {
    renderCart();
  });
}
