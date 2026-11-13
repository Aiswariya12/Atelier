/**
 * Atelier E-Commerce Store & State Management
 * Handles central product catalog, cart persistence (localStorage), wishlist, and toast notifications.
 */

const AtelierStore = (function () {
  const PRODUCTS = [
    {
      id: 'prod-1',
      name: 'Structured Wool Overcoat',
      category: 'Outerwear',
      price: 450,
      originalPrice: null,
      rating: 4.9,
      reviews: 124,
      image: './Trench Coat.png',
      isNew: true,
      color: 'Camel Brown',
      size: 'Medium',
      description: 'Hand-tailored double-faced wool coat with architectural lapels and clean horn buttons.'
    },
    {
      id: 'prod-2',
      name: 'Veau Epsom Messenger',
      category: 'Accessories',
      price: 1200,
      originalPrice: null,
      rating: 5.0,
      reviews: 82,
      image: './Leather Bag.png',
      isNew: true,
      color: 'Cognac',
      size: 'One Size',
      description: 'Crafted from textured Epsom calfskin with palladium-plated hardware and adjustable strap.'
    },
    {
      id: 'prod-3',
      name: 'Atelier Baseline Sneaker',
      category: 'Footwear',
      price: 295,
      originalPrice: null,
      rating: 4.8,
      reviews: 210,
      image: './Sneakers.png',
      isNew: false,
      color: 'Chalk White',
      size: '42 EU',
      description: 'Minimalist low-top sneaker made from Italian Nappa leather on stitched Margom rubber soles.'
    },
    {
      id: 'prod-4',
      name: 'Pure Cashmere Knit',
      category: 'Apparel',
      price: 320,
      originalPrice: null,
      rating: 4.9,
      reviews: 56,
      image: './Sweater.png',
      isNew: false,
      color: 'Oatmeal',
      size: 'Medium',
      description: 'Spun from Mongolian grade-A cashmere fibers for exceptional warmth and featherlight drape.'
    },
    {
      id: 'prod-5',
      name: 'Gold Link Bracelet',
      category: 'Accessories',
      price: 450,
      originalPrice: null,
      rating: 4.9,
      reviews: 43,
      image: './Jewelry.png',
      isNew: false,
      color: '18k Yellow Gold',
      size: '7.5 inch',
      description: 'Solid heavy gauge interlocking oval links finished with bespoke safety lock mechanism.'
    },
    {
      id: 'prod-6',
      name: 'Polished Leather Loafers',
      category: 'Footwear',
      price: 180,
      originalPrice: 250,
      rating: 4.8,
      reviews: 112,
      image: './Loafers.png',
      isNew: false,
      color: 'Burgundy Glass',
      size: '41 EU',
      description: 'Goodyear welted penny loafer in high-shine box calf leather with stacked leather heels.'
    },
    {
      id: 'prod-7',
      name: 'Elysian Timepiece',
      category: 'Accessories',
      price: 189,
      originalPrice: null,
      rating: 4.8,
      reviews: 85,
      image: './card6.png',
      isNew: true,
      color: 'Silver Brushed',
      size: '38mm',
      description: 'Swiss quartz movement encased in 316L surgical-grade stainless steel with sapphire crystal.'
    },
    {
      id: 'prod-8',
      name: 'Essential Pima Tee',
      category: 'Apparel',
      price: 45,
      originalPrice: null,
      rating: 4.8,
      reviews: 210,
      image: './Organic cotton white tee.png',
      isNew: false,
      color: 'Optical White',
      size: 'Medium',
      description: 'Long-staple Peruvian Pima cotton jersey offering silky hand feel and shape retention.'
    },
    {
      id: 'prod-9',
      name: 'Studio HD-20 Headphones',
      category: 'Accessories',
      price: 299,
      originalPrice: null,
      rating: 5.0,
      reviews: 42,
      image: './card8.png',
      isNew: false,
      color: 'Anodized Silver',
      size: 'Adjustable',
      description: 'Custom 40mm titanium drivers with active hybrid noise cancellation and lambskin memory cushions.'
    },
    {
      id: 'prod-10',
      name: 'Designer Red Sneakers',
      category: 'Footwear',
      price: 225,
      originalPrice: null,
      rating: 4.9,
      reviews: 77,
      image: './Designer red sneakers.png',
      isNew: true,
      color: 'Crimson Red',
      size: '42 EU',
      description: 'Vibrant scarlet suede panels accented with performance mesh and cushioned dual-density soles.'
    },
    {
      id: 'prod-11',
      name: 'Double-Breasted Camel Coat',
      category: 'Outerwear',
      price: 520,
      originalPrice: null,
      rating: 4.9,
      reviews: 94,
      image: './Premium wool coat in camel brown.png',
      isNew: true,
      color: 'Camel Brown',
      size: 'Large',
      description: 'Tailored oversized silhouette in virgin melton wool with notched revere collar and silk lining.'
    },
    {
      id: 'prod-12',
      name: 'Classic Minimalist Trench',
      category: 'Outerwear',
      price: 295,
      originalPrice: 380,
      rating: 4.8,
      reviews: 153,
      image: './Trench Coat.png',
      isNew: false,
      color: 'Stone Grey',
      size: 'Medium',
      description: 'Water-repellent gabardine weave finished with storm flap, belted cuffs, and horn buckle closure.'
    },
    {
      id: 'prod-13',
      name: 'Architectural Wool Blazer',
      category: 'Outerwear',
      price: 390,
      originalPrice: null,
      rating: 4.9,
      reviews: 68,
      image: './card1.png',
      isNew: true,
      color: 'Charcoal Black',
      size: 'Medium',
      description: 'Sculptural single-breasted blazer with jetted pockets and unconstructed soft shoulder pads.'
    },
    {
      id: 'prod-14',
      name: 'Italian Tailored Car Coat',
      category: 'Outerwear',
      price: 460,
      originalPrice: 550,
      rating: 4.9,
      reviews: 51,
      image: './Premium wool coat in camel brown.png',
      isNew: false,
      color: 'Warm Taupe',
      size: 'Medium',
      description: 'Clean concealed placket overcoat crafted from heavy Italian wool fleece with welt pocket styling.'
    },
    {
      id: 'prod-15',
      name: 'Chunky Ribbed Wool Turtleneck',
      category: 'Apparel',
      price: 280,
      originalPrice: null,
      rating: 4.9,
      reviews: 88,
      image: './Sweater.png',
      isNew: true,
      color: 'Off-White',
      size: 'Medium',
      description: 'Heavy gauge fisherman knit rendered in undyed British wool with fold-over rollneck.'
    },
    {
      id: 'prod-16',
      name: 'Relaxed Oxford Cotton Shirt',
      category: 'Apparel',
      price: 115,
      originalPrice: 145,
      rating: 4.7,
      reviews: 134,
      image: './card4.png',
      isNew: false,
      color: 'Sky Blue',
      size: 'Large',
      description: 'Garment-washed long staple cotton poplin with mother-of-pearl buttons and curved hemline.'
    },
    {
      id: 'prod-17',
      name: 'Heavyweight Studio Crewneck',
      category: 'Apparel',
      price: 110,
      originalPrice: null,
      rating: 4.8,
      reviews: 195,
      image: './Organic cotton white tee.png',
      isNew: false,
      color: 'Washed Ash',
      size: 'Medium',
      description: '500 GSM loopback French terry sweatshirt featuring flatlock seam construction and ribbed cuffs.'
    },
    {
      id: 'prod-18',
      name: 'Fine Gauge Merino Cardigan',
      category: 'Apparel',
      price: 240,
      originalPrice: null,
      rating: 4.9,
      reviews: 72,
      image: './Sweater.png',
      isNew: true,
      color: 'Dark Navy',
      size: 'Medium',
      description: 'Superfine 19.5-micron Australian merino wool with tonal corozo buttons and saddle shoulders.'
    },
    {
      id: 'prod-19',
      name: 'Hand-Burnished Penny Loafers',
      category: 'Footwear',
      price: 260,
      originalPrice: null,
      rating: 4.8,
      reviews: 63,
      image: './Loafers.png',
      isNew: true,
      color: 'Cognac Brown',
      size: '43 EU',
      description: 'Hand-painted patina on premium French calfskin with leather sole channel stitching.'
    },
    {
      id: 'prod-20',
      name: 'Court Suede Low-Tops',
      category: 'Footwear',
      price: 215,
      originalPrice: 275,
      rating: 4.8,
      reviews: 92,
      image: './Sneakers.png',
      isNew: false,
      color: 'Sand Beige',
      size: '42 EU',
      description: 'Silky calfskin suede uppers paired with calf leather lining and supportive ergonomic footbeds.'
    },
    {
      id: 'prod-21',
      name: 'Scarlet Minimalist Runner',
      category: 'Footwear',
      price: 195,
      originalPrice: 240,
      rating: 4.9,
      reviews: 81,
      image: './Designer red sneakers.png',
      isNew: false,
      color: 'Ruby Crimson',
      size: '41 EU',
      description: 'Streamlined athletic silhouette combining technical textile with plush suede toe cap reinforcement.'
    },
    {
      id: 'prod-22',
      name: 'Bifold Calfskin Wallet',
      category: 'Accessories',
      price: 95,
      originalPrice: 140,
      rating: 4.8,
      reviews: 140,
      image: './wallet.png',
      isNew: false,
      color: 'Espresso Black',
      size: 'One Size',
      description: 'Slim pocket profile in full-grain vegetable-tanned leather with 8 card slots and cash sleeve.'
    },
    {
      id: 'prod-23',
      name: 'Structured Leather Weekender',
      category: 'Accessories',
      price: 890,
      originalPrice: null,
      rating: 5.0,
      reviews: 39,
      image: './Leather Bag.png',
      isNew: true,
      color: 'Midnight Onyx',
      size: '45L',
      description: 'Durable tumbled leather duffel with two-way Swiss zipper, luggage tag, and detachable strap.'
    },
    {
      id: 'prod-24',
      name: 'Sculpted Acetate Sunglasses',
      category: 'Accessories',
      price: 175,
      originalPrice: 210,
      rating: 4.8,
      reviews: 114,
      image: './card5.png',
      isNew: false,
      color: 'Tortoise Shell',
      size: 'One Size',
      description: 'Mazzucchelli bio-acetate frame fitted with 100% UV400 anti-reflective polarized lenses.'
    },
    {
      id: 'prod-25',
      name: 'Gilded Curb Chain Necklace',
      category: 'Accessories',
      price: 380,
      originalPrice: null,
      rating: 4.9,
      reviews: 58,
      image: './Jewelry.png',
      isNew: true,
      color: '18k Yellow Gold',
      size: '20 inch',
      description: 'Diamond-cut beveled curb links with micro-engraved atelier emblem and secure lobster clasp.'
    },
    {
      id: 'prod-26',
      name: 'Signature Atelier Fragrance',
      category: 'Accessories',
      price: 165,
      originalPrice: null,
      rating: 4.9,
      reviews: 87,
      image: './card7.png',
      isNew: true,
      color: '50ml EDP',
      size: '50 ml',
      description: 'Complex olfactory blend of cedarwood, Haitian vetiver, smoked bergamot, and white musk notes.'
    }
  ];

  // Default initial cart items if none in localStorage
  const DEFAULT_CART = [
    {
      id: 'prod-1',
      name: 'Structured Wool Coat',
      category: 'Outerwear',
      price: 320.00,
      quantity: 1,
      color: 'Camel',
      size: 'Medium',
      image: './Premium wool coat in camel brown.png'
    },
    {
      id: 'prod-8',
      name: 'Organic Cotton White Tee',
      category: 'Apparel',
      price: 45.00,
      quantity: 2,
      color: 'Optical White',
      size: 'Medium',
      image: './Organic cotton white tee.png'
    },
    {
      id: 'prod-10',
      name: 'Designer Red Sneakers',
      category: 'Footwear',
      price: 225.00,
      quantity: 1,
      color: 'Crimson Red',
      size: '42 EU',
      image: './Designer red sneakers.png'
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
