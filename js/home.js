/**
 * Atelier - Home Page Interactions
 * Links category cards, wires hero CTA buttons, and connects "Buy Now" favorites to cart.
 */

document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('.section1 .frontbutton1')) return;

  initHomePage();
});

function initHomePage() {
  // Hero CTA buttons
  const shopNowBtn = document.querySelector('.front2button .button01');
  const lookbookBtn = document.querySelector('.front2button .button02');

  if (shopNowBtn) {
    shopNowBtn.style.cursor = 'pointer';
    shopNowBtn.addEventListener('click', () => {
      window.location.href = './AllProducts.html';
    });
  }

  if (lookbookBtn) {
    lookbookBtn.style.cursor = 'pointer';
    lookbookBtn.addEventListener('click', () => {
      const section3 = document.querySelector('.section3');
      if (section3) {
        section3.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Category cards navigation
  const categories = [
    { selector: '.card', cat: 'Apparel' },
    { selector: '.card1', cat: 'Footwear' },
    { selector: '.card2', cat: 'Accessories' },
    { selector: '.card3', cat: 'Beauty' }
  ];

  categories.forEach(item => {
    const el = document.querySelector(`.section2 ${item.selector}`);
    if (el) {
      el.style.cursor = 'pointer';
      el.setAttribute('title', `Explore ${item.cat}`);
      el.addEventListener('click', () => {
        window.location.href = `./AllProducts.html?category=${encodeURIComponent(item.cat)}`;
      });
    }
  });

  // Curated Favorites Buy Now buttons
  const favorites = [
    { cardSelector: '.card5', id: 'prod-1', name: 'Structured Wool Coat' },
    { cardSelector: '.card6', id: 'prod-7', name: 'Elysian Timepiece' },
    { cardSelector: '.card7', id: 'prod-8', name: 'Essential Pima Tee' },
    { cardSelector: '.card8', id: 'prod-9', name: 'Studio HD-20 Headphones' }
  ];

  favorites.forEach(fav => {
    const card = document.querySelector(fav.cardSelector);
    if (!card) return;

    const buyBtn = card.querySelector('button');
    const bagBtn = card.querySelector('.image');

    if (buyBtn) {
      buyBtn.style.cursor = 'pointer';
      buyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        AtelierStore.addToCart(fav.id, 1);
      });
    }

    if (bagBtn) {
      bagBtn.style.cursor = 'pointer';
      bagBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        AtelierStore.addToCart(fav.id, 1);
      });
    }
  });
}
