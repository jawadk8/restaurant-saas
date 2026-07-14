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

## Bug #2: home.js 404 error — file never actually created

**Date found:** Day 3, during homepage redesign (Featured Dishes section)
**Where:** `index.html` → `js/home.js`
**Severity:** Medium (broke one section, rest of page still worked)

### Description

After adding a Featured Dishes section to the homepage that relied on a new
`js/home.js` file, the section stayed completely empty. Browser console showed:

`Failed to load resource: the server responded with a status of 404 (Not Found)`
`Refused to execute script from 'home.js' because its MIME type ('text/html')
is not executable`

### Root Cause

The `home.js` code was written and reviewed, but never actually saved as a
real file in the `js/` folder — only the `<script src="js/home.js">` tag was
added to `index.html`. Since the file didn't exist on disk, the local server
returned its default 404 HTML page instead of JavaScript, which the browser
correctly refused to execute as a script (hence the MIME type error).

### Fix

Confirmed the file was missing and created `js/home.js` with the intended
code. (Later, the Featured Dishes section itself was removed in a design
simplification, so this file was deleted again — but the debugging process
of reading console errors to trace a 404 back to a missing file was the
valuable part.)

### Lesson learned

A `<script src="...">` tag pointing to a file that doesn't exist yet fails
silently in the sense that the page still loads — only the Console reveals
the real error. Always check DevTools Console first when a new feature
"does nothing" instead of assuming the JS logic itself is wrong.

---
