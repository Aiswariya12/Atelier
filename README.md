# Atelier — Minimalist Luxury Fashion & Accessories

[![Live Demo](https://img.shields.io/badge/Live_Demo-atelier--mu--gilt.vercel.app-2E3275?style=for-the-badge&logo=vercel&logoColor=white)](https://atelier-mu-gilt.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Vanilla JS](https://img.shields.io/badge/Vanilla_JS-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Responsive](https://img.shields.io/badge/Responsive-Mobile_Friendly-059669?style=for-the-badge)](https://atelier-mu-gilt.vercel.app/)

> **Live Store:** [https://atelier-mu-gilt.vercel.app/](https://atelier-mu-gilt.vercel.app/)

---

## 📖 About The Project

**Atelier** is a front-end luxury fashion e-commerce web application built from the ground up using **pure vanilla HTML5, CSS3, and JavaScript**. 

The goal was to build a fast, elegant, and completely responsive shopping experience without relying on bulky front-end frameworks or external libraries. Every interaction—from dynamic category filtering and real-time search, to quantity steppers in the shopping bag and credit card auto-formatting at checkout—is written in clean, modular vanilla JavaScript.

---

## ✨ Features You Can Try

### 🛍️ 1. Product Catalog & Smart Filters (`AllProducts.html`)
- **24 Unique Fashion Pieces**: Zero duplicate items. Each product has unique photography, descriptions, colorways, and realistic pricing across **Outerwear**, **Apparel**, **Footwear**, and **Accessories**.
- **Instant Search**: Type any keyword in the search bar to filter products in real-time.
- **Custom Price Slider**: Drag the interactive price range slider ($0 – $1,500) featuring a smooth two-tone track fill that follows your thumb.
- **Rating Filter**: Check the **4.8★ & Up** filter (with gold vector stars) to view top-rated pieces.
- **Grid vs. List View**: Toggle between a visual product card grid and a detailed editorial list layout.
- **Quick Add & Wishlist**: Click the heart icon to save favorites or hit "Add to Cart" directly from any product card with instant toast notification feedback.

### 🛒 2. Dynamic Shopping Bag (`CartPage.html`)
- **State Persistence**: Your cart is saved in `localStorage`, meaning items remain in your bag even when you close or refresh the tab.
- **Quantity Controls**: Adjust item amounts with custom circular `+` and `−` steppers.
- **Live Summary**: Real-time recalculation of subtotal, sales tax (8.2%), and free shipping.
- **Empty State**: If you remove all items, an interactive empty-cart message appears with a direct button back to the collection.

### 💳 3. Smooth Checkout Experience (`CheckoutPage.html`)
- **Cart Sync**: Order totals and item counts automatically mirror your shopping bag.
- **Interactive Address Editor**: Click "Change" on shipping details to open an address modal with validation and instant updates.
- **Smart Card Inputs**:
  - Automatically formats credit card numbers into clean 4-digit groups (`4532 •••• •••• 1234`).
  - Auto-inserts the slash (`/`) when typing card expiry month and year (`MM/YY`).
  - Formats 3-digit CVV codes.
- **Order Placement**: Placing an order triggers a branded confirmation modal displaying your unique generated Order ID and estimated delivery timeline.

### 🔐 4. Authentication Cards (`LoginCard.html` & `RegisterPage.html`)
- **Seamless Modern Form Design**: Completely borderless inputs nested inside clean rounded containers.
- **Password Eye Toggle**: Easily show or hide password characters with one click.
- **Dynamic Password Strength Meter**: Evaluates length, uppercase letters, numbers, and symbols in real-time with color-coded visual indicator bars.
- **Password Match Check**: Validates that password and confirm password fields match before allowing submission.

### 📱 5. Responsive Design & Global UI (`responsive-common.css`)
- **Slide-out Mobile Navigation**: Custom hamburger drawer menu for phones and tablets.
- **Live Cart Badge**: Navbar shopping bag counter updates instantly across all open pages when items are added or removed.
- **Animated Toast Alerts**: Clean notifications pop up at the bottom corner for cart updates, wishlist actions, and newsletter subscriptions.
- **Branded 404 Page (`404.html`)**: Helpful error page that guides visitors back to the store.

---

## 🛠️ Built With

- **HTML5**: Semantic markup, accessible labels, clean metadata.
- **CSS3**: Modern layouts with CSS Grid & Flexbox, CSS custom properties (variables), subtle transitions, and media queries.
- **Vanilla JavaScript (ES6+)**: Custom state management, modular script architecture, event delegation, and `localStorage` persistence.
- **Google Fonts**: *Plus Jakarta Sans* (clean modern body) & *Playfair Display* (editorial luxury headers).
- **Font Awesome 6**: Crisp, scalable vector icons used across buttons, inputs, steppers, and ratings.

---

## 📂 Project Structure

```
Atelier/
├── index.html              # Homepage with Hero, Categories & Seasonal Edit
├── AllProducts.html        # Product Catalog with Search & Filter Suite
├── CartPage.html           # Shopping Bag with Quantity Stepper & Order Summary
├── CheckoutPage.html       # Checkout Flow with Card Formatting & Modals
├── LoginCard.html          # Clean Member Sign In Form
├── RegisterPage.html       # Account Registration with Password Strength Meter
├── 404.html                # Branded 404 Not Found Page
│
├── style.css               # Homepage Specific Styles
├── AllProducts.css         # Catalog Specific Styles
├── CartPage.css            # Shopping Bag Specific Styles
├── CheckoutPage.css        # Checkout Specific Styles
├── LoginCard.css           # Login Card Specific Styles
├── RegisterPage.css        # Register Card Specific Styles
├── responsive-common.css   # Global Design System, Drawer, Badges, Modals
│
├── js/
│   ├── store.js            # Central State Management, Catalog & Storage
│   ├── main.js             # Mobile Drawer, Cart Badge Sync, Nav Highlighting
│   ├── products.js         # Search, Filter, Sort, View Toggle, Pagination
│   ├── cart.js             # Cart Render, Stepper Actions, Dynamic Summary
│   ├── checkout.js         # Address Modal, Card Formatting, Order Placement
│   ├── auth.js             # Password Visibility, Strength Meter, Validation
│   └── home.js             # Hero Actions & Homepage Interactions
│
├── images/                 # 24 High-Resolution Curated Fashion Product Images
├── vercel.json             # Vercel Production Deployment Settings & Headers
├── netlify.toml            # Netlify Deployment Configuration
├── sitemap.xml             # Search Engine Sitemap
├── robots.txt              # Search Engine Crawler Directives
└── package.json            # Project Metadata & Local Preview Scripts
```

---

## 🚀 Running Locally

No complicated setup or build tools required. You can run this project locally in two steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Aiswariya12/Atelier.git
   cd Atelier
   ```

2. **Open the project:**
   - Double-click `index.html` to open directly in any web browser.
   - Or, if you use VS Code, right-click `index.html` and choose **Open with Live Server**.
   - Or, using Node / npx:
     ```bash
     npx serve . -l 3000
     ```

---

## 🌐 Live Deployment

This repository is connected directly to **Vercel** with automatic continuous deployment on every push to `main`:

👉 **[https://atelier-mu-gilt.vercel.app/](https://atelier-mu-gilt.vercel.app/)**

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — feel free to use it for learning, portfolios, or reference.
