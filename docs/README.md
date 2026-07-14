# Bella Cucina — Restaurant SaaS

A full-featured restaurant web application built as a 3-day bootcamp final project. Customers can browse the menu, place orders, and book tables; restaurant staff can log in to a separate admin panel to manage the menu, track orders, and handle reservations.

Built entirely with **vanilla HTML, CSS, and JavaScript** (no frameworks) and **Bootstrap 5**, with **localStorage** standing in for a backend database.

---

## Live Demo

[View Live Site](https://jawadk8.github.io/restaurant-saas/)

---

## Features

### Customer-Facing

- Browse a categorized menu (Pasta, Pizza, Desserts) with filtering
- Add items to a persistent cart (localStorage-backed)
- Adjust quantities or remove items from the cart
- Checkout with form validation and an order confirmation page
- Book a table with date/time validation (no past dates)
- Contact form
- Toast notifications for cart actions
- Custom 404 page

### Admin Panel (`/admin`)

- Mock login (username/password), route-protected — all admin pages redirect to login if not authenticated
- Dashboard with live stats (total orders, pending orders, active reservations, revenue)
- Full CRUD on menu items (add, edit, delete) — changes reflect instantly on the real customer-facing menu
- Order management: view items per order, update status (Pending → Preparing → Completed)
- Reservation management: update status (Pending → Confirmed → Cancelled)

---

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript (ES6+)
- Bootstrap 5.3 (via CDN)
- Google Fonts (Fraunces, Inter, IBM Plex Mono)
- Browser `localStorage` for all data persistence (no backend/server)

---

## Project Structure

```
restaurant-saas/
├── index.html, menu.html, cart.html, checkout.html,
│   order-confirmation.html, reservation.html, contact.html, 404.html
├── admin/
│   ├── login.html, dashboard.html, manage-menu.html,
│   │   manage-orders.html, manage-reservations.html
├── css/
│   └── style.css              — full custom design system
├── js/
│   ├── data.js                — menu data + localStorage seeding
│   ├── cart.js                — cart logic + toast notifications
│   ├── menu.js                — menu rendering + filtering
│   ├── checkout.js            — checkout + order creation
│   ├── reservation.js         — reservation booking
│   ├── contact.js             — contact form
│   ├── admin-auth.js          — mock login + route protection
│   ├── admin-dashboard.js     — dashboard stats
│   ├── admin-menu.js          — menu CRUD
│   ├── admin-orders.js        — order status management
│   └── admin-reservations.js  — reservation status management
├── assets/images/             — dish photos and site imagery
└── docs/
    ├── README.md
    ├── architecture-diagram.svg
    ├── bug-log.md
    ├── prompt-log.md
    ├── refactoring-report.md
    └── peer-review-report.md
```

---

## Running Locally

No build step or install required.

1. Clone the repo:
   ```bash
   git clone https://github.com/jawadk8/restaurant-saas.git
   ```
2. Open the folder in VS Code
3. Right-click `index.html` → **Open with Live Server** (or open the file directly in a browser)

### Admin Access

Navigate to `/admin/login.html`. Demo credentials:

- Username: `jawad`
- Password: `talha`

---

## Design Decisions & Known Limitations

- **No real backend:** All data (menu, cart, orders, reservations, admin session) lives in browser `localStorage`. This means data does **not** sync across devices or browsers — an order placed on a phone won't appear on a laptop's admin dashboard. A production version would need a real server and database.
- **Admin panel is desktop-focused:** Mobile responsiveness was prioritized for the customer-facing pages, which is where real users are more likely to browse on their phones. The admin panel was scoped as desktop-only, similar to many real-world admin tools.
- **Mock authentication:** Admin login checks a hardcoded username/password — there's no encryption, sessions, or real security, appropriate only for a localStorage-only demo.
- **Menu images:** Real dish photos, sourced independently and stored in `assets/images/`.

See `docs/bug-log.md` for real bugs encountered and fixed during development, and `docs/prompt-log.md` for how AI assistance was used throughout the build.

---

## Author

Jawad Faiz
