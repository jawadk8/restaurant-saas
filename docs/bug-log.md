# Bug Log — Bella Cucina Restaurant SaaS

## Bug #1: Null reference error after refactoring cart.js

**Date found:** Day 1, during refactor to consolidate inline scripts
**Where:** `js/cart.js`
**Severity:** High (broke every non-cart page)

### Description

After moving `cart.html`'s inline `<script>` into `cart.js` for consistency,
loading any other page that includes `cart.js` (e.g. `menu.html`) threw:

`Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')`

### Root Cause

`cart.js` is loaded on multiple pages (menu, checkout, cart), but the moved
code tried to attach a click listener directly to `document.getElementById("cartBody")`
without checking if it existed first. `#cartBody` only exists in `cart.html`,
so on every other page `getElementById` returned `null`, and calling
`.addEventListener` on `null` crashed the script — which also silently broke
unrelated functionality on that page (like Add to Cart on the menu), since a
thrown error stops the rest of the script from running.

### Fix

Added a guard clause before the page-specific logic:

```javascript
const cartBody = document.getElementById("cartBody");
if (!cartBody) return;
```

This makes the code safely skip cart-page-only logic when it's not present,
instead of crashing.

### Lesson learned

Shared JS files that run on multiple pages need to defensively check that
their target DOM elements exist before acting on them — you can't assume
every page has every element.

---

## Bug #2: (placeholder — add as found)

---
