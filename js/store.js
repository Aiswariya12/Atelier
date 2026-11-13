/**
 * Atelier E-Commerce Store & State Management
 * Handles central product catalog, cart persistence (localStorage), wishlist, and toast notifications.
 */

const AtelierStore = (function () {
  const PRODUCTS = [
    // --- 1. OUTERWEAR ---
    {
      id: 'prod-1',
      name: 'Structured Wool Overcoat',
      category: 'Outerwear',
      price: 450,
      originalPrice: null,
      rating: 4.9,
      reviews: 142,
      image: './images/wool-overcoat.jpg',
      isNew: true,
      color: 'Camel Tan',
      size: 'Medium',
      description: 'Hand-tailored double-faced melton wool overcoat with architectural notched lapels and horn buttons.'
    },
    {
      id: 'prod-2',
      name: 'Vintage Leather Biker Jacket',
      category: 'Outerwear',
      price: 580,
      originalPrice: null,
      rating: 5.0,
      reviews: 98,
      image: './images/leather-jacket.jpg',
      isNew: true,
      color: 'Onyx Black',
      size: 'Large',
      description: 'Supple full-grain cowhide leather motorcycle jacket with asymmetric zipper and silver hardware.'
    },
    {
      id: 'prod-3',
      name: 'Architectural Tailored Blazer',
      category: 'Outerwear',
      price: 390,
      originalPrice: null,
      rating: 4.8,
      reviews: 64,
      image: './images/tailored-blazer.jpg',
      isNew: false,
      color: 'Charcoal Grey',
      size: 'Medium',
      description: 'Sculptural single-breasted blazer woven from fine Italian tropical wool with structured shoulders.'
    },
    {
      id: 'prod-4',
      name: 'Minimalist Double-Breasted Trench',
      category: 'Outerwear',
      price: 295,
      originalPrice: 380,
      rating: 4.9,
      reviews: 178,
      image: './images/classic-trench.jpg',
      isNew: false,
      color: 'Stone Beige',
      size: 'Medium',
      description: 'Weatherproof cotton gabardine weave with storm flap, waist-cinching belt, and horn buckle closure.'
    },
    {
      id: 'prod-5',
      name: 'Quilted Down Puffer Jacket',
      category: 'Outerwear',
      price: 420,
      originalPrice: null,
      rating: 4.9,
      reviews: 83,
      image: './images/down-puffer.jpg',
      isNew: true,
      color: 'Matte Olive',
      size: 'Large',
      description: '750-fill-power ethical goose down encapsulated in lightweight ripstop shell with fleece-lined pockets.'
    },
    {
      id: 'prod-6',
      name: 'Washed Denim Trucker Jacket',
      category: 'Outerwear',
      price: 185,
      originalPrice: 240,
      rating: 4.7,
      reviews: 119,
      image: './images/denim-jacket.jpg',
      isNew: false,
      color: 'Vintage Indigo',
      size: 'Medium',
      description: '14oz Japanese selvedge denim pre-washed for vintage drape with shank buttons and chest flap pockets.'
    },

    // --- 2. APPAREL ---
    {
      id: 'prod-7',
      name: 'Pure Mongolian Cashmere Knit',
      category: 'Apparel',
      price: 320,
      originalPrice: null,
      rating: 5.0,
      reviews: 86,
      image: './images/cashmere-sweater.jpg',
      isNew: true,
      color: 'Oatmeal Heather',
      size: 'Medium',
      description: 'Spun from grade-A Mongolian cashmere yarns for extraordinary warmth and weightless cloud-like softness.'
    },
    {
      id: 'prod-8',
      name: 'Essential Heavyweight Cotton Tee',
      category: 'Apparel',
      price: 55,
      originalPrice: null,
      rating: 4.8,
      reviews: 265,
      image: './images/cotton-tee.jpg',
      isNew: false,
      color: 'Optical White',
      size: 'Medium',
      description: '280 GSM long-staple combed cotton jersey with reinforced rib collar and boxy modern drape.'
    },
    {
      id: 'prod-9',
      name: 'Relaxed Oxford Poplin Shirt',
      category: 'Apparel',
      price: 115,
      originalPrice: 145,
      rating: 4.7,
      reviews: 142,
      image: './images/oxford-shirt.jpg',
      isNew: false,
      color: 'Sky Blue',
      size: 'Large',
      description: 'Garment-washed breathable cotton poplin featuring mother-of-pearl buttons and curved hem.'
    },
    {
      id: 'prod-10',
      name: 'Pleated Wide-Leg Trousers',
      category: 'Apparel',
      price: 260,
      originalPrice: null,
      rating: 4.9,
      reviews: 73,
      image: './images/pleated-trousers.jpg',
      isNew: true,
      color: 'Dark Sand',
      size: '32 Waist',
      description: 'Double front pleats with relaxed drape through the leg, cut from high-twist wool-blend twill.'
    },
    {
      id: 'prod-11',
      name: 'Organic Fleece Minimalist Hoodie',
      category: 'Apparel',
      price: 165,
      originalPrice: null,
      rating: 4.8,
      reviews: 198,
      image: './images/minimalist-hoodie.jpg',
      isNew: false,
      color: 'Heather Grey',
      size: 'Medium',
      description: '500 GSM loopback organic French terry with double-layered hood and invisible seam kangaroo pouch.'
    },
    {
      id: 'prod-12',
      name: 'Fine Gauge Merino Wool Polo',
      category: 'Apparel',
      price: 170,
      originalPrice: 210,
      rating: 4.8,
      reviews: 94,
      image: './images/merino-polo.jpg',
      isNew: false,
      color: 'Espresso Brown',
      size: 'Medium',
      description: '19.5-micron extrafine merino wool knit with three-button placket and ribbed cuffs and hem.'
    },

    // --- 3. FOOTWEAR ---
    {
      id: 'prod-13',
      name: 'Atelier Baseline White Sneaker',
      category: 'Footwear',
      price: 295,
      originalPrice: null,
      rating: 4.9,
      reviews: 240,
      image: './images/white-sneakers.jpg',
      isNew: false,
      color: 'Chalk White',
      size: '42 EU',
      description: 'Italian Nappa calfskin low-tops built on durable Margom rubber cupsoles with leather lined footbeds.'
    },
    {
      id: 'prod-14',
      name: 'Full-Grain Leather Chelsea Boots',
      category: 'Footwear',
      price: 380,
      originalPrice: null,
      rating: 5.0,
      reviews: 115,
      image: './images/chelsea-boots.jpg',
      isNew: true,
      color: 'Deep Black',
      size: '43 EU',
      description: 'Goodyear welted Chelsea boots with elastic side gussets and pull tabs on weather-treated leather soles.'
    },
    {
      id: 'prod-15',
      name: 'Polished Boxcalf Penny Loafers',
      category: 'Footwear',
      price: 195,
      originalPrice: 260,
      rating: 4.8,
      reviews: 134,
      image: './images/penny-loafers.jpg',
      isNew: false,
      color: 'Burgundy Cordovan',
      size: '41 EU',
      description: 'Classic penny strap loafers in high-luster calfskin with stacked leather heels and brass nail detailing.'
    },
    {
      id: 'prod-16',
      name: 'Scarlet Suede Performance Runner',
      category: 'Footwear',
      price: 225,
      originalPrice: null,
      rating: 4.9,
      reviews: 89,
      image: './images/red-runner-sneakers.jpg',
      isNew: true,
      color: 'Crimson Red',
      size: '42 EU',
      description: 'Bold scarlet suede overlays paired with breathable technical mesh and dual-density EVA midsoles.'
    },
    {
      id: 'prod-17',
      name: 'Handcrafted Oxford Dress Shoes',
      category: 'Footwear',
      price: 340,
      originalPrice: null,
      rating: 4.9,
      reviews: 76,
      image: './images/oxford-derby.jpg',
      isNew: false,
      color: 'Polished Black',
      size: '42 EU',
      description: 'Closed-lace cap-toe oxford dress shoe crafted from hand-burnished French calfskin for black-tie elegance.'
    },
    {
      id: 'prod-18',
      name: 'Minimalist Leather Mule Slides',
      category: 'Footwear',
      price: 140,
      originalPrice: 180,
      rating: 4.8,
      reviews: 62,
      image: './images/leather-mules.jpg',
      isNew: false,
      color: 'Natural Tan',
      size: '41 EU',
      description: 'Slip-on mule silhouette featuring vegetable-tanned leather straps on molded ergonomic cork footbeds.'
    },

    // --- 4. ACCESSORIES ---
    {
      id: 'prod-19',
      name: 'Veau Epsom Structured Tote',
      category: 'Accessories',
      price: 890,
      originalPrice: null,
      rating: 5.0,
      reviews: 97,
      image: './images/leather-tote.jpg',
      isNew: true,
      color: 'Cognac Saddle',
      size: 'One Size',
      description: 'Architectural shopper tote in scratch-resistant Epsom calfskin with palladium hardware and zip pouch.'
    },
    {
      id: 'prod-20',
      name: 'Minimalist Chronograph Timepiece',
      category: 'Accessories',
      price: 350,
      originalPrice: null,
      rating: 4.9,
      reviews: 110,
      image: './images/chronograph-watch.jpg',
      isNew: true,
      color: 'Brushed Silver',
      size: '40mm',
      description: 'Precision Japanese chronograph movement protected by sapphire crystal and surgical 316L stainless casing.'
    },
    {
      id: 'prod-21',
      name: 'Handcrafted Acetate Sunglasses',
      category: 'Accessories',
      price: 165,
      originalPrice: 210,
      rating: 4.8,
      reviews: 145,
      image: './images/acetate-sunglasses.jpg',
      isNew: false,
      color: 'Dark Tortoise',
      size: 'One Size',
      description: 'Mazzucchelli bio-acetate frames fitted with anti-reflective 100% UV400 polarized Category 3 lenses.'
    },
    {
      id: 'prod-22',
      name: '18k Solid Gold Chain Necklace',
      category: 'Accessories',
      price: 480,
      originalPrice: null,
      rating: 5.0,
      reviews: 68,
      image: './images/gold-necklace.jpg',
      isNew: true,
      color: '18k Yellow Gold',
      size: '22 inch',
      description: 'Substantial interlocking flat curb links finished with high-polish mirror sheen and custom lobster clasp.'
    },
    {
      id: 'prod-23',
      name: 'Vegetable-Tanned Bifold Wallet',
      category: 'Accessories',
      price: 90,
      originalPrice: 125,
      rating: 4.8,
      reviews: 182,
      image: './images/leather-wallet.jpg',
      isNew: false,
      color: 'Rich Espresso',
      size: 'One Size',
      description: 'Ultra-slim leather wallet featuring 8 hand-finished card pockets, dual receipt sleeves, and cash billfold.'
    },
    {
      id: 'prod-24',
      name: 'Studio HD Noise-Cancelling Headphones',
      category: 'Accessories',
      price: 299,
      originalPrice: null,
      rating: 5.0,
      reviews: 74,
      image: './images/studio-headphones.jpg',
      isNew: false,
      color: 'Matte Gunmetal',
      size: 'Adjustable',
      description: 'Custom 45mm beryllium acoustic drivers with hybrid active noise cancellation and memory foam lambskin pads.'
    }
  ];

  // Default initial cart items if none in localStorage
  const DEFAULT_CART = [
    {
      id: 'prod-1',
      name: 'Structured Wool Overcoat',
      category: 'Outerwear',
      price: 450.00,
      quantity: 1,
      color: 'Camel Tan',
      size: 'Medium',
      image: './images/wool-overcoat.jpg'
    },
    {
      id: 'prod-8',
      name: 'Essential Heavyweight Cotton Tee',
      category: 'Apparel',
      price: 55.00,
      quantity: 2,
      color: 'Optical White',
      size: 'Medium',
      image: './images/cotton-tee.jpg'
    },
    {
      id: 'prod-16',
      name: 'Scarlet Suede Performance Runner',
      category: 'Footwear',
      price: 225.00,
      quantity: 1,
      color: 'Crimson Red',
      size: '42 EU',
      image: './images/red-runner-sneakers.jpg'
    }
  ];

  const STORAGE_KEYS = {
    CART: 'atelier_cart_v1',
    WISHLIST: 'atelier_wishlist_v1',
    USER: 'atelier_user_v1',
    ADDRESS: 'atelier_shipping_address_v1'
  };

  // Safe localStorage helper
  function getStorage(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn('LocalStorage error:', e);
      return fallback;
    }
  }

  function setStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }

  // Cart operations
  function getCart() {
    let cart = getStorage(STORAGE_KEYS.CART, null);
    if (!cart) {
      cart = DEFAULT_CART;
      setStorage(STORAGE_KEYS.CART, cart);
    } else {
      // Sync with latest catalog images and names if available
      cart.forEach(item => {
        const prod = PRODUCTS.find(p => p.id === item.id);
        if (prod) {
          item.image = prod.image;
          item.name = prod.name;
        }
      });
      setStorage(STORAGE_KEYS.CART, cart);
    }
    return cart;
  }

  function saveCart(cart) {
    setStorage(STORAGE_KEYS.CART, cart);
    updateCartBadges();
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart } }));
  }

  function addToCart(productOrId, quantity = 1, options = {}) {
    let product;
    if (typeof productOrId === 'string') {
      product = PRODUCTS.find(p => p.id === productOrId);
    } else {
      product = productOrId;
    }

    if (!product) {
      showToast('Product not found.', 'error');
      return;
    }

    const cart = getCart();
    const existingIndex = cart.findIndex(item => 
      item.id === product.id && 
      (!options.size || item.size === options.size) &&
      (!options.color || item.color === options.color)
    );

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        quantity: quantity,
        color: options.color || product.color || 'Standard',
        size: options.size || product.size || 'Regular',
        image: product.image
      });
    }

    saveCart(cart);
    showToast(`Added "${product.name}" to your bag!`, 'success');
  }

  function updateCartQuantity(index, quantity) {
    const cart = getCart();
    if (index >= 0 && index < cart.length) {
      if (quantity <= 0) {
        removeFromCart(index);
        return;
      }
      cart[index].quantity = quantity;
      saveCart(cart);
    }
  }

  function removeFromCart(index) {
    const cart = getCart();
    if (index >= 0 && index < cart.length) {
      const removed = cart.splice(index, 1)[0];
      saveCart(cart);
      if (removed) {
        showToast(`Removed "${removed.name}" from your bag.`, 'info');
      }
    }
  }

  function clearCart() {
    saveCart([]);
  }

  function getCartTotals() {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    // Free shipping if subtotal >= 150 or cart is empty
    const shipping = (subtotal === 0 || subtotal >= 150) ? 0 : 12.00;
    const tax = Math.round(subtotal * 0.082 * 100) / 100; // 8.2% tax
    const total = subtotal + (subtotal === 0 ? 0 : shipping) + tax;

    return {
      subtotal: subtotal.toFixed(2),
      shipping: shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`,
      shippingNum: shipping,
      tax: tax.toFixed(2),
      total: total.toFixed(2),
      itemCount: cart.reduce((count, item) => count + item.quantity, 0)
    };
  }

  function getCartCount() {
    const cart = getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  }

  function updateCartBadges() {
    const count = getCartCount();
    document.querySelectorAll('.cart-badge, .cart-count').forEach(badge => {
      badge.textContent = count;
      if (count > 0) {
        badge.classList.remove('hidden');
        badge.style.display = 'inline-flex';
        badge.classList.add('pop');
        setTimeout(() => badge.classList.remove('pop'), 300);
      } else {
        badge.classList.add('hidden');
        badge.style.display = 'none';
      }
    });
  }

  // Wishlist operations
  function getWishlist() {
    return getStorage(STORAGE_KEYS.WISHLIST, []);
  }

  function toggleWishlist(productId) {
    let wishlist = getWishlist();
    const index = wishlist.indexOf(productId);
    let isAdded = false;

    if (index > -1) {
      wishlist.splice(index, 1);
      showToast('Removed item from your wishlist.', 'info');
    } else {
      wishlist.push(productId);
      isAdded = true;
      showToast('Saved item to your wishlist!', 'success');
    }

    setStorage(STORAGE_KEYS.WISHLIST, wishlist);
    window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { wishlist, productId, isAdded } }));
    return isAdded;
  }

  function isInWishlist(productId) {
    const wishlist = getWishlist();
    return wishlist.includes(productId);
  }

  // Shipping Address
  function getShippingAddress() {
    return getStorage(STORAGE_KEYS.ADDRESS, {
      fullName: 'Alexander Vance',
      street: '221B Baker St',
      city: 'London',
      postcode: 'NW1 6XE',
      country: 'United Kingdom',
      phone: '+44 20 7946 0912'
    });
  }

  function saveShippingAddress(address) {
    setStorage(STORAGE_KEYS.ADDRESS, address);
    window.dispatchEvent(new CustomEvent('addressUpdated', { detail: { address } }));
  }

  // User auth state
  function getCurrentUser() {
    return getStorage(STORAGE_KEYS.USER, null);
  }

  function setCurrentUser(user) {
    setStorage(STORAGE_KEYS.USER, user);
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEYS.USER);
    showToast('You have been logged out.', 'info');
  }

  // Toast Notification System
  function showToast(message, type = 'success') {
    let container = document.getElementById('atelier-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'atelier-toast-container';
      container.className = 'atelier-toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `atelier-toast atelier-toast-${type}`;

    let iconHtml = '<i class="fa-solid fa-circle-check"></i>';
    if (type === 'error') iconHtml = '<i class="fa-solid fa-triangle-exclamation"></i>';
    if (type === 'info') iconHtml = '<i class="fa-solid fa-circle-info"></i>';

    toast.innerHTML = `
      <div class="toast-icon">${iconHtml}</div>
      <div class="toast-text">${message}</div>
      <button class="toast-close" aria-label="Close">&times;</button>
    `;

    container.appendChild(toast);

    // Auto remove after animation
    const timer = setTimeout(() => {
      dismissToast(toast);
    }, 3500);

    toast.querySelector('.toast-close').addEventListener('click', () => {
      clearTimeout(timer);
      dismissToast(toast);
    });
  }

  function dismissToast(toast) {
    toast.classList.add('hiding');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }

  // Format currency
  function formatMoney(amount) {
    return `$${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  return {
    PRODUCTS,
    getCart,
    saveCart,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    getCartTotals,
    getCartCount,
    updateCartBadges,
    getWishlist,
    toggleWishlist,
    isInWishlist,
    getShippingAddress,
    saveShippingAddress,
    getCurrentUser,
    setCurrentUser,
    logout,
    showToast,
    formatMoney
  };
})();

// Initialize badges on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  AtelierStore.updateCartBadges();
});
