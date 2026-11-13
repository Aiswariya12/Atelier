/**
 * Atelier - Products Catalog Functionalities
 * Handles live search, category filtering, price slider, sorting, grid/list view toggle,
 * wishlist toggle, pagination, and dynamic Add-to-Cart.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Only execute on AllProducts.html or pages with product catalog
  if (!document.querySelector('.rightsection') && !document.querySelector('.maindiv')) return;

  initProductCatalog();
});

function initProductCatalog() {
  const products = AtelierStore.PRODUCTS;
  let activeCategory = 'All';
  let activeSearch = '';
  let maxPrice = 1500;
  let minRating = 0;
  let currentSort = 'low-high';
  let isListView = false;
  let currentPage = 1;
  const itemsPerPage = 6;

  // Cache DOM elements
  const searchInput = document.querySelector('.search input');
  const categoryCheckboxes = document.querySelectorAll('.checkboxx input[type="checkbox"]');
  const priceSlider = document.getElementById('pricerange');
  const priceValueContainer = document.querySelector('.pricevalue');
  const sortSelect = document.querySelector('.sortbox select');
  const gridBtn = document.querySelector('.grid .box1');
  const listBtn = document.querySelector('.grid div:not(.box1)');
  const productCountDisplay = document.querySelector('.para2');
  const ratingSection = document.querySelector('.rating');
  const loadMoreBtn = document.querySelector('.piece');
  const pageButtons = document.querySelectorAll('.lastminbox .one, .lastminbox .one1');

  // Container for rendered products
  let productsContainer = document.getElementById('atelier-products-container') || document.querySelector('.maindiv');
  if (!productsContainer) {
    productsContainer = document.createElement('div');
    productsContainer.id = 'atelier-products-container';
    productsContainer.className = 'atelier-products-grid';
    const target = document.querySelector('.rightsection');
    if (target) target.insertBefore(productsContainer, document.querySelector('.lastbox'));
  }

  // Parse URL query params (e.g. ?search=sneakers or ?category=Footwear)
  const urlParams = new URLSearchParams(window.location.search);
  const paramSearch = urlParams.get('search');
  const paramCat = urlParams.get('category');

  if (paramSearch) {
    activeSearch = paramSearch;
    if (searchInput) searchInput.value = paramSearch;
  }

  if (paramCat) {
    activeCategory = paramCat;
    syncCategoryCheckboxes(paramCat);
  }

  // Setup Price Slider
  if (priceSlider) {
    priceSlider.min = '0';
    priceSlider.max = '1500';
    priceSlider.value = '1500';
    maxPrice = 1500;

    const updateSliderFill = () => {
      const percent = (priceSlider.value / priceSlider.max) * 100;
      priceSlider.style.background = `linear-gradient(to right, #2E3275 0%, #2E3275 ${percent}%, #E2E8F0 ${percent}%, #E2E8F0 100%)`;
    };
    updateSliderFill();

    // Price label indicator
    if (priceValueContainer) {
      priceValueContainer.innerHTML = `
        <span>$0</span>
        <span class="active-max-price">All Prices ($1,500+)</span>
      `;
    }

    priceSlider.addEventListener('input', (e) => {
      maxPrice = Number(e.target.value);
      updateSliderFill();
      const label = priceValueContainer ? priceValueContainer.querySelector('.active-max-price') : null;
      if (label) {
        label.textContent = maxPrice >= 1500 ? 'All Prices ($1,500+)' : `Up to $${maxPrice}`;
      }
      currentPage = 1;
      render();
    });
  }

  // Setup Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeSearch = e.target.value.trim().toLowerCase();
      currentPage = 1;
      render();
    });
  }

  // Setup Category Checkboxes
  if (categoryCheckboxes.length > 0) {
    categoryCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', (e) => {
        const labelText = e.target.closest('label').textContent.trim();

        if (labelText.includes('All')) {
          if (e.target.checked) {
            categoryCheckboxes.forEach(cb => {
              if (cb !== e.target) cb.checked = false;
            });
            activeCategory = 'All';
          }
        } else {
          // If specific category checked, uncheck 'All'
          categoryCheckboxes.forEach(cb => {
            const cbText = cb.closest('label').textContent.trim();
            if (cbText.includes('All')) cb.checked = false;
          });

          // Find checked categories
          const checked = [];
          categoryCheckboxes.forEach(cb => {
            if (cb.checked) {
              checked.push(cb.closest('label').textContent.trim());
            }
          });

          if (checked.length === 0) {
            // Re-check All
            syncCategoryCheckboxes('All');
            activeCategory = 'All';
          } else {
            activeCategory = checked[0]; // Filter by selected category
          }
        }
        currentPage = 1;
        render();
      });
    });
  }

  function syncCategoryCheckboxes(catName) {
    categoryCheckboxes.forEach(cb => {
      const text = cb.closest('label').textContent.trim();
      cb.checked = text.toLowerCase().includes(catName.toLowerCase());
    });
  }

  // Setup Rating filter
  const ratingCheckbox = document.getElementById('rating-checkbox');
  if (ratingCheckbox) {
    ratingCheckbox.addEventListener('change', (e) => {
      if (e.target.checked) {
        minRating = 4.8;
        if (ratingSection) ratingSection.classList.add('active-filter');
        AtelierStore.showToast('Filtering: 4.8 Stars and up', 'info');
      } else {
        minRating = 0;
        if (ratingSection) ratingSection.classList.remove('active-filter');
        AtelierStore.showToast('Showing all ratings', 'info');
      }
      currentPage = 1;
      render();
    });
  } else if (ratingSection) {
    ratingSection.style.cursor = 'pointer';
    ratingSection.addEventListener('click', () => {
      if (minRating === 0) {
        minRating = 4.8;
        ratingSection.classList.add('active-filter');
        AtelierStore.showToast('Filtering: 4.8 Stars and up', 'info');
      } else {
        minRating = 0;
        ratingSection.classList.remove('active-filter');
        AtelierStore.showToast('Showing all ratings', 'info');
      }
      currentPage = 1;
      render();
    });
  }

  // Setup Sort Dropdown
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      const val = e.target.value.toLowerCase();
      if (val.includes('low-high')) currentSort = 'low-high';
      else if (val.includes('high-low')) currentSort = 'high-low';
      else if (val.includes('pop')) currentSort = 'popularity';
      else if (val.includes('new')) currentSort = 'newest';
      render();
    });
  }

  // Setup Grid / List View Toggle
  if (gridBtn && listBtn) {
    gridBtn.style.cursor = 'pointer';
    listBtn.style.cursor = 'pointer';

    gridBtn.addEventListener('click', () => {
      isListView = false;
      gridBtn.classList.add('box1');
      listBtn.classList.remove('box1');
      listBtn.style.backgroundColor = 'transparent';
      gridBtn.style.backgroundColor = '#FFFFFF';
      if (productsContainer) {
        productsContainer.classList.remove('list-view');
      }
    });

    listBtn.addEventListener('click', () => {
      isListView = true;
      listBtn.classList.add('box1');
      gridBtn.classList.remove('box1');
      gridBtn.style.backgroundColor = 'transparent';
      listBtn.style.backgroundColor = '#FFFFFF';
      if (productsContainer) {
        productsContainer.classList.add('list-view');
      }
    });
  }

  // Load More Button
  if (loadMoreBtn) {
    loadMoreBtn.style.cursor = 'pointer';
    loadMoreBtn.addEventListener('click', () => {
      currentPage++;
      render(true);
    });
  }

  // Pagination page buttons
  pageButtons.forEach(btn => {
    btn.style.cursor = 'pointer';
    btn.addEventListener('click', () => {
      const pageText = btn.textContent.trim();
      if (!isNaN(pageText)) {
        currentPage = parseInt(pageText, 10);
        pageButtons.forEach(b => {
          b.className = 'one';
          b.style.color = '';
          b.style.backgroundColor = '#FFFFFF';
        });
        btn.className = 'one1';
        btn.style.backgroundColor = '#333697';
        btn.style.color = '#FFFFFF';
        render();
        window.scrollTo({ top: 300, behavior: 'smooth' });
      }
    });
  });

  // Main filter & sort calculation
  function getFilteredProducts() {
    let list = [...products];

    // Filter by Category
    if (activeCategory && activeCategory !== 'All' && !activeCategory.includes('All')) {
      const catLower = activeCategory.toLowerCase();
      if (catLower === 'new' || catLower.includes('arrival')) {
        list = list.filter(p => p.isNew === true);
      } else if (catLower === 'sale') {
        list = list.filter(p => p.originalPrice !== null && p.originalPrice > p.price);
      } else {
        list = list.filter(p => p.category.toLowerCase().includes(catLower));
      }
    }

    // Filter by Search
    if (activeSearch) {
      list = list.filter(p => 
        p.name.toLowerCase().includes(activeSearch) ||
        p.category.toLowerCase().includes(activeSearch) ||
        (p.description && p.description.toLowerCase().includes(activeSearch))
      );
    }

    // Filter by Price
    list = list.filter(p => p.price <= maxPrice);

    // Filter by Rating
    if (minRating > 0) {
      list = list.filter(p => p.rating >= minRating);
    }

    // Sorting
    switch (currentSort) {
      case 'low-high':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
        list.sort((a, b) => (b.rating * b.reviews) - (a.rating * a.reviews));
        break;
      case 'newest':
        list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return list;
  }

  // Render product cards
  function render(append = false) {
    if (!productsContainer) return;

    const filtered = getFilteredProducts();
    const totalCount = filtered.length;

    // Update count display
    if (productCountDisplay) {
      const displayed = Math.min(currentPage * itemsPerPage, totalCount);
      productCountDisplay.textContent = `Showing 1–${displayed} of ${totalCount} pieces`;
    }

    // Slice for pagination
    const itemsToShow = filtered.slice(0, currentPage * itemsPerPage);

    if (filtered.length === 0) {
      productsContainer.innerHTML = `
        <div class="no-products-found" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 40px; color: #697489; margin-bottom: 16px;"></i>
          <h3 style="font-size: 22px; margin-bottom: 8px;">No matching pieces found</h3>
          <p style="color: #697489; margin-bottom: 20px;">Try adjusting your search criteria, price range, or category filters.</p>
          <button id="reset-filters-btn" style="padding: 12px 24px; background: #333697; color: white; border: none; border-radius: 8px; font-weight: 700; cursor: pointer;">
            Reset All Filters
          </button>
        </div>
      `;

      const resetBtn = document.getElementById('reset-filters-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          activeCategory = 'All';
          activeSearch = '';
          maxPrice = 1500;
          minRating = 0;
          if (searchInput) searchInput.value = '';
          if (priceSlider) {
            priceSlider.value = '1500';
            const label = priceValueContainer ? priceValueContainer.querySelector('.active-max-price') : null;
            if (label) label.textContent = 'All Prices ($1,500+)';
          }
          syncCategoryCheckboxes('All');
          render();
        });
      }
      return;
    }

    // Build cards HTML
    let html = '';
    itemsToShow.forEach(prod => {
      const isLiked = AtelierStore.isInWishlist(prod.id);
      const isNewBadge = prod.isNew ? `<div class="product-badge new-badge">NEW</div>` : '';
      const originalPriceHtml = prod.originalPrice ? `<span class="original-price"><del>$${prod.originalPrice}</del></span>` : '';

      html += `
        <div class="atelier-product-card" data-id="${prod.id}">
          <div class="product-image-box" style="background-image: url('${prod.image}');">
            ${isNewBadge}
            <button class="product-wishlist-btn ${isLiked ? 'liked' : ''}" data-id="${prod.id}" title="${isLiked ? 'Remove from wishlist' : 'Add to wishlist'}" aria-label="Wishlist">
              <i class="fa-${isLiked ? 'solid' : 'regular'} fa-heart"></i>
            </button>
            <div class="product-card-overlay">
              <button class="add-to-cart-quick" data-id="${prod.id}">
                <i class="fa-solid fa-bag-shopping"></i> ADD TO CART
              </button>
            </div>
          </div>
          <div class="product-info-box">
            <div class="product-title-row">
              <span class="product-title">${prod.name}</span>
              <span class="product-price">$${prod.price}</span>
            </div>
            <div class="product-rating-row">
              <img src="./yellow star.png" alt="star" class="star-icon">
              <span class="rating-text">${prod.rating} (${prod.reviews})</span>
              ${originalPriceHtml}
            </div>
          </div>
        </div>
      `;
    });

    productsContainer.innerHTML = html;

    // Attach event listeners to Add to Cart and Wishlist
    productsContainer.querySelectorAll('.add-to-cart-quick').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pid = btn.getAttribute('data-id');
        AtelierStore.addToCart(pid, 1);
      });
    });

    productsContainer.querySelectorAll('.product-wishlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pid = btn.getAttribute('data-id');
        const nowLiked = AtelierStore.toggleWishlist(pid);
        btn.classList.toggle('liked', nowLiked);
        btn.innerHTML = `<i class="fa-${nowLiked ? 'solid' : 'regular'} fa-heart"></i>`;
      });
    });

    // Update Load More button state
    if (loadMoreBtn) {
      if (itemsToShow.length >= totalCount) {
        loadMoreBtn.textContent = 'ALL PIECES DISPLAYED';
        loadMoreBtn.style.opacity = '0.6';
        loadMoreBtn.style.pointerEvents = 'none';
      } else {
        loadMoreBtn.textContent = 'LOAD MORE PIECES';
        loadMoreBtn.style.opacity = '1';
        loadMoreBtn.style.pointerEvents = 'auto';
      }
    }
  }

  // Initial render
  render();
}
