/**
 * Atelier Main UI & Navigation Interactions
 * Injects responsive mobile drawer, updates navbar cart badges, handles global search & newsletter.
 */

document.addEventListener('DOMContentLoaded', () => {
  setupNavbarEnhancements();
  setupMobileDrawer();
  setupGlobalSearch();
  setupNewsletterForms();
  highlightActiveNavLink();
});

/**
 * Ensures Cart icons have badge wrappers and proper links
 */
function setupNavbarEnhancements() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  // Find all cart links or cart images in nav
  const iconsContainer = nav.querySelector('.icons');
  if (iconsContainer) {
    // Check if cart image is already wrapped in link
    const cartImgs = iconsContainer.querySelectorAll('img[src*="Icon (2)"], img[src*="bag"]');
    cartImgs.forEach(img => {
      let parent = img.parentElement;
      if (parent.tagName !== 'A') {
        const link = document.createElement('a');
        link.href = './CartPage.html';
        link.className = 'cart-icon-wrapper';
        img.parentNode.insertBefore(link, img);
        link.appendChild(img);
        parent = link;
      } else {
        parent.classList.add('cart-icon-wrapper');
      }

      // Add badge if not already present
      if (!parent.querySelector('.cart-badge')) {
        const badge = document.createElement('span');
        badge.className = 'cart-badge';
        const count = typeof AtelierStore !== 'undefined' ? AtelierStore.getCartCount() : 0;
        badge.textContent = count;
        if (count === 0) badge.style.display = 'none';
        parent.appendChild(badge);
      }
    });

    // Also ensure login icon is linked
    const userImgs = iconsContainer.querySelectorAll('img[src*="Icon (1)"]');
    userImgs.forEach(img => {
      if (img.parentElement.tagName !== 'A') {
        const link = document.createElement('a');
        link.href = './LoginCard.html';
        link.setAttribute('title', 'My Account');
        img.parentNode.insertBefore(link, img);
        link.appendChild(img);
      }
    });
  }

  // Inject Hamburger Button if not present
  if (!nav.querySelector('.hamburger-btn')) {
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger-btn';
    hamburger.setAttribute('aria-label', 'Toggle Navigation Menu');
    hamburger.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;

    // Append to nav
    nav.appendChild(hamburger);
  }
}

/**
 * Creates and binds the mobile navigation drawer
 */
function setupMobileDrawer() {
  if (document.querySelector('.mobile-nav-drawer')) return;

  // Create overlay and drawer elements
  const overlay = document.createElement('div');
  overlay.className = 'mobile-nav-overlay';

  const drawer = document.createElement('aside');
  drawer.className = 'mobile-nav-drawer';
  drawer.setAttribute('aria-label', 'Mobile Navigation');

  const count = typeof AtelierStore !== 'undefined' ? AtelierStore.getCartCount() : 0;

  drawer.innerHTML = `
    <div class="mobile-drawer-header">
      <div class="mobile-drawer-logo">Atelier</div>
      <button class="mobile-drawer-close" aria-label="Close menu">&times;</button>
    </div>

    <form class="mobile-search" action="./AllProducts.html" method="GET">
      <i class="fa-solid fa-magnifying-glass"></i>
      <input type="text" name="search" placeholder="Search curated products...">
    </form>

    <ul class="mobile-nav-links">
      <li><a href="./index.html">Home</a></li>
      <li><a href="./AllProducts.html">Curated Collection</a></li>
      <li><a href="./AllProducts.html?category=Outerwear">Outerwear</a></li>
      <li><a href="./AllProducts.html?category=Apparel">Apparel</a></li>
      <li><a href="./AllProducts.html?category=Footwear">Footwear</a></li>
      <li><a href="./AllProducts.html?category=Accessories">Accessories</a></li>
      <li><a href="./CartPage.html">Shopping Bag (<span class="cart-count">${count}</span>)</a></li>
    </ul>

    <div class="mobile-drawer-actions">
      <a href="./CartPage.html" class="mobile-drawer-btn primary">
        <i class="fa-solid fa-bag-shopping"></i> View Cart (<span class="cart-count">${count}</span>)
      </a>
      <a href="./LoginCard.html" class="mobile-drawer-btn outline">
        <i class="fa-regular fa-user"></i> Sign In / Register
      </a>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(drawer);

  // Toggle logic
  const hamburger = document.querySelector('.hamburger-btn');
  const closeBtn = drawer.querySelector('.mobile-drawer-close');

  function openMenu() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    if (hamburger) hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    if (hamburger) hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      if (drawer.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  overlay.addEventListener('click', closeMenu);

  // Close when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeMenu();
    }
  });
}

/**
 * Search Bar redirect from navbar
 */
function setupGlobalSearch() {
  const searchBoxes = document.querySelectorAll('.searchbox');
  searchBoxes.forEach(box => {
    const input = box.querySelector('input');
    const icon = box.querySelector('i');

    if (!input) return;

    function doSearch() {
      const q = input.value.trim();
      if (q) {
        window.location.href = `./AllProducts.html?search=${encodeURIComponent(q)}`;
      }
    }

    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        doSearch();
      }
    });

    if (icon) {
      icon.style.cursor = 'pointer';
      icon.addEventListener('click', doSearch);
    }
  });
}

/**
 * Handles newsletter forms across footers
 */
function setupNewsletterForms() {
  const newsletterInputs = document.querySelectorAll('.footerdiv4 input[type="email"], .inputt input[type="email"]');
  newsletterInputs.forEach(input => {
    const container = input.closest('.inputt') || input.parentElement;
    const btn = container ? container.querySelector('button') : null;

    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = input.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        if (typeof AtelierStore !== 'undefined') {
          AtelierStore.showToast('Please enter a valid email address.', 'error');
        } else {
          alert('Please enter a valid email address.');
        }
        input.focus();
        return;
      }

      // Success
      if (typeof AtelierStore !== 'undefined') {
        AtelierStore.showToast('Thank you for subscribing to Atelier drops!', 'success');
      } else {
        alert('Thank you for subscribing to Atelier drops!');
      }
      input.value = '';
    });
  });
}

/**
 * Highlights current active link in the desktop and mobile nav (by text color only, no underline bars)
 */
function highlightActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const currentSearch = window.location.search;
  const navLinks = document.querySelectorAll('nav .list ul li a, .mobile-nav-links a');

  // Clear existing active states
  navLinks.forEach(a => a.classList.remove('nav-link-active'));

  let matched = false;
  // If there are search parameters (e.g. ?category=New), match the specific link
  if (currentSearch) {
    navLinks.forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href.includes(currentSearch)) {
        a.classList.add('nav-link-active');
        matched = true;
      }
    });
  }

  // Otherwise match the exact filename
  if (!matched) {
    navLinks.forEach(a => {
      const href = a.getAttribute('href') || '';
      const linkFile = href.split('?')[0].split('/').pop();
      if (linkFile === currentPath && !href.includes('?')) {
        a.classList.add('nav-link-active');
      }
    });
  }
}
