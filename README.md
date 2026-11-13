# Atelier — Luxury E-Commerce Web Platform

> Curated excellence, delivered. A responsive luxury fashion and lifestyle digital shopping experience built with pure vanilla HTML5, CSS3, and modern modular JavaScript.

---

## 🌟 Live Features & Capabilities

- **Catalog & Discovery (`AllProducts.html`)**:
  - Live real-time search filtering.
  - Interactive multi-criteria category filters (Outerwear, Accessories, Footwear, Apparel).
  - Dynamic price range slider ($0 – $1,500) with live price counters.
  - Star rating filter (4.8★ & above).
  - Multi-option sorting (Featured, Price: Low-High, Price: High-Low, Highest Rated).
  - Grid View & List View responsive toggle.
  - Interactive wishlist heart toggle with persistent state.
  - Quick Add to Bag from product cards with real-time toast feedback.

- **Interactive Shopping Bag (`CartPage.html`)**:
  - Centralized cart state synced via `localStorage` across all pages.
  - Real-time quantity stepper (`+` and `−`) with custom circular controls.
  - Instant item removal with fade transition.
  - Dynamic subtotal, tax calculation (8.2%), and shipping logic.
  - Empty bag state with one-click return to store.

- **Seamless Checkout (`CheckoutPage.html`)**:
  - Order summary synced directly with cart items.
  - Interactive shipping address editor modal with auto-fill and live validation.
  - Credit card auto-formatting: 4-digit card grouping, auto MM/YY slash formatting, 3-digit CVV mask.
  - Dynamic payment methods (Credit Card accordion, Instant UPI QR Code, Digital Wallets).
  - Branded Order Confirmation modal with unique Order ID and delivery tracking timeline.

- **Authentication & Security (`LoginCard.html` & `RegisterPage.html`)**:
  - Modern borderless inputs inside sleek containers.
  - Password visibility toggle (eye icon).
  - Real-time password strength meter (Length, Uppercase, Numbers, Symbols).
  - Password match validation with interactive status cues.

- **Universal Navigation & Responsiveness (`responsive-common.css`)**:
  - Clean luxury typography (`Plus Jakarta Sans` & `Playfair Display`).
  - Slide-out mobile navigation drawer with hamburger toggle.
  - Global cart badge synced dynamically across all headers.
  - Animated toast notification system for user actions.
  - Dedicated luxury branded 404 page (`404.html`).

---

## 🚀 Quick Deployment Guide

This project is 100% static and requires no server-side build steps or database configuration. It can be deployed in under 2 minutes.

### Option 1: Deploy to Vercel (Recommended)
1. Install Vercel CLI (or push to GitHub and import into vercel.com):
   ```bash
   npm install -g vercel
   vercel
   ```
2. Follow the interactive prompts:
   - **Set up and deploy?** [Y]
   - **Which scope?** (Select your account)
   - **Link to existing project?** [N]
   - **Project name?** `atelier-luxury`
   - **Directory?** `./`
3. Your live production URL will be generated instantly (e.g., `https://atelier-luxury.vercel.app`).

### Option 2: Deploy to Netlify
#### Via Drag & Drop:
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop this entire project folder into the upload box.
3. Your site is live immediately!

#### Via Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=.
```

### Option 3: Deploy to GitHub Pages
1. Initialize a git repository and commit all files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Atelier Luxury E-Commerce"
   ```
2. Create a new repository on GitHub (e.g. `atelier`).
3. Push your repository:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/atelier.git
   git push -u origin main
   ```
4. On GitHub, go to **Settings** > **Pages** > **Branch: main** > **Save**.
5. Your store will be live at `https://<your-username>.github.io/atelier/`.

---

## 💻 Local Development

To run and preview the project locally:
```bash
# Using Node / npx
npx serve . -l 3000

# Or using VS Code Live Server
# Right click index.html -> "Open with Live Server" (port 5500)
```

---

## 📁 Project Architecture

```
Stitch/
├── index.html              # Homepage & Curated Essentials
├── AllProducts.html        # Product Catalog & Dynamic Filter Suite
├── CartPage.html           # Interactive Shopping Bag
├── CheckoutPage.html       # Checkout & Payment Experience
├── LoginCard.html          # Authentication / Sign In Card
├── RegisterPage.html       # New Member Registration
├── 404.html                # Branded Luxury 404 Page
│
├── style.css               # Homepage Specific Styles
├── AllProducts.css         # Catalog Specific Styles
├── CartPage.css            # Shopping Bag Specific Styles
├── CheckoutPage.css        # Checkout Specific Styles
├── LoginCard.css           # Login Card Specific Styles
├── RegisterPage.css        # Register Card Specific Styles
├── responsive-common.css   # Global Design System, Drawer, Modals, Resets
│
├── js/
│   ├── store.js            # Centralized State Management, Catalog & Storage
│   ├── main.js             # Mobile Drawer, Global Badges, Nav Highlighting
│   ├── products.js         # Search, Filter, Sort, View Toggle
│   ├── cart.js             # Bag Render, Quantity Stepper, Dynamic Summary
│   ├── checkout.js         # Address Modal, Card Formatting, Order Placement
│   ├── auth.js             # Password Eye, Strength Meter, Form Validation
│   └── home.js             # Hero Actions & Homepage Interactions
│
├── vercel.json             # Vercel Deployment Configuration & Headers
├── netlify.toml            # Netlify Deployment Configuration & Headers
├── package.json            # Node Configuration & Preview Scripts
├── robots.txt              # Search Engine Crawler Directives
├── sitemap.xml             # Search Engine Sitemap
└── .gitignore              # Git Ignore Rules
```

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
