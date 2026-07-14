# Refactoring Report — Bella Cucina Restaurant SaaS

This report documents real refactoring decisions made during development: what was changed, why, and what was learned. Each entry reflects an actual working version of the code that was later improved — not a hypothetical exercise.

---

## 1. Removed unused `app.js` and `ui.js`

**What changed:** The original planned folder structure (mirroring an earlier Task Manager project) included `app.js` and `ui.js` as shared entry-point files. As the project grew, logic was instead split into more specific per-feature files (`cart.js`, `menu.js`, `checkout.js`, etc.). By the end of Day 2, `app.js` and `ui.js` were still present in the repo but completely empty and unused.

**Why:** Empty, unreferenced files add confusion for anyone reading the project structure — they imply functionality that doesn't exist. Once it was clear the per-feature file split was the actual pattern in use, keeping these files served no purpose.

**Action taken:** Deleted both files with `git rm`, with a commit message explaining why.

**Lesson:** An initial plan (task-manager-style `app.js`/`ui.js` split) doesn't always fit a larger project. It's better to delete unused scaffolding once a better pattern emerges than to leave it as dead weight "just in case."

---

## 2. Consolidated `cart.html`'s inline script into `cart.js`

**What changed:** Early in the project, most pages followed a "separate `.js` file per page" pattern, but `cart.html` had its click-handling logic written as an inline `<script>` block directly in the HTML file instead.

**Why:** This was inconsistent with every other page in the project, which made the codebase harder to reason about and explain in review — a reviewer would reasonably ask "why is this one page different?"

**Action taken:** Moved the inline script's logic into `cart.js`, guarded by a check for the `cartBody` element's existence (since `cart.js` is loaded on multiple pages, not just `cart.html`).

**Complication:** This refactor introduced a real bug — seedescribed in detail in `bug-log.md`, Bug #1. Because `cart.js` now runs on every page that loads it, the code needed a guard clause (`if (!cartBody) return;`) to avoid crashing on pages where cart-specific DOM elements don't exist.

**Lesson:** Consolidating code for consistency is good practice, but shared files that run across multiple pages need defensive checks for their target elements — you can't assume every page has every element the script expects.

---

## 3. Converted `data.js` from static data to localStorage-backed data

**What changed:** `menuItems` originally lived only as a hardcoded array in `data.js`. When the admin "Manage Menu" CRUD feature was built, this needed to change — otherwise, admin edits (add/edit/delete dishes) would have no way to persist or reflect on the real customer-facing menu.

**Why:** A hardcoded array can't be modified at runtime in a way that survives a page refresh. The fix was to treat the hardcoded array as seed data only, load the real working copy from `localStorage`, and have every part of the app (customer menu, cart, admin) read from and write to that same source of truth.

**Action taken:** Renamed the original array to `defaultMenuItems`, added logic to seed `localStorage` from it on first visit only, and introduced a `saveMenuItems()` helper that every mutation (add/edit/delete) calls afterward.

**Lesson:** Deciding where a single source of truth for a piece of data should live (hardcoded vs. localStorage vs., in a real app, a database) is a real architectural decision — not just an implementation detail. Making this change _after_ the fact was more work than planning for it upfront would have been, which is a useful thing to recognize for future projects.

---

## 4. Extracted the menu price-line into a reusable pattern

**What changed:** During the visual redesign, the dish name + price display was changed from a plain `<h5>` title and separate `<p>` price into a single `.menu-price-line` component (name, dotted line, price) with matching CSS.

**Why:** This started as a one-off styling choice for `menu.js`'s card template, but was then reused identically in `home.js` (before that section was later removed) — the repetition made it clear this deserved to be a named, documented CSS pattern rather than ad hoc inline styling repeated in multiple JS template strings.

**Action taken:** Gave the pattern a clear CSS class name (`.menu-price-line`) with sub-elements (`.dish-name`, `.dots`, `.dish-price`), documented with a comment explaining its purpose, so any future dish-card-building code can reuse it consistently.

**Lesson:** A styling decision made once for a single page can become a real reusable pattern once it's needed a second time — worth naming and documenting at that point rather than copy-pasting styles.

---

## Known Remaining Refactor Opportunities (not addressed, by scope decision)

- **Admin `manage-orders.js`'s `viewOrderItems()`** still uses a plain `alert()` popup instead of the toast/modal pattern used elsewhere in the redesign — left as-is since admin polish was explicitly deprioritized in favor of customer-facing UX.
- **Repeated `document.getElementById("menuContainer")` call** exists in both `renderMenu()` and its caller in `menu.js` — minor redundancy, functionally harmless, flagged here rather than "fixed" to avoid unnecessary churn this close to submission.
- **`<main>` landmark and `aria-describedby` accessibility improvements** were only applied to `index.html` as a proof of concept; the same pattern was consciously not rolled out to all 13 pages, since the Lighthouse accessibility score (89–98 range) was already considered acceptable for this project's scope.
