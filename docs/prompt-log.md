# AI Prompt Log — Bella Cucina Restaurant SaaS

This log documents how Claude was used throughout the project: key decisions,
prompts, and how AI-generated code was reviewed/understood before use.

## Project Setup

- Asked for an explanation of what a "Restaurant SaaS" app involves and a
  proposed feature/page list before writing any code.
- Decided on: single-restaurant scope (not multi-tenant), mock/localStorage
  admin login (no real backend).
- Set up folder structure mirroring the Task Manager project pattern
  (data/ui/logic split), scaled up per feature (cart.js, menu.js, etc.)
  instead of one giant app.js.

## Build Process

- Built page-by-page: Home → Menu → Cart → Checkout → Order Confirmation →
  Reservations → Contact, testing and committing after each working milestone.
- Asked Claude to explain each new JS concept in plain English before moving
  on (event delegation, .reduce(), guard clauses, form validation via
  checkValidity()), rather than just accepting code without understanding it.
- Chose to name/theme the restaurant "Bella Cucina" (Italian).

## Key Decisions Made With AI Input

- Chose to keep checkout logic in a separate `checkout.js` file for
  consistency with other pages, rather than inline.
- Identified that `cart.html`'s inline script broke this consistency and
  asked Claude to refactor it into `cart.js`.
- That refactor introduced Bug #1 (see bug-log.md) — asked Claude to explain
  the error rather than just paste a fix, to understand the root cause
  (shared script running on pages without its target elements).

## Verification Practice

- After every code drop, pasted the code in, tested in-browser, and reported
  back screenshots/results before proceeding — no code accepted blindly.
- Asked for a summary of "which pages use separate JS files vs inline
  scripts" to audit consistency mid-project, leading to the cart.js cleanup.

## Notes

This log will be updated through Day 2 (admin side) and Day 3 (polish,
accessibility, final docs).

## Day 2: Admin Side

- Planned the admin build order with Claude: login → dashboard → manage menu →
  manage orders → manage reservations, each protected by a login guard.
- Chose custom mock credentials (username/password) rather than a generic
  placeholder, and asked Claude to explain how localStorage-based route
  protection works before building it.
- Decided to make admin's menu CRUD actually persist and reflect on the real
  customer-facing menu page, which required refactoring `data.js` to be
  localStorage-backed (seeded from a default array) instead of static.
- Chose order/reservation status stages (Pending → Preparing → Completed;
  Pending → Confirmed → Cancelled) based on what made sense for a real
  restaurant workflow, not just picking Claude's first suggestion.
- Asked Claude to explain why order IDs (strings like "ORD-4821") shouldn't
  be converted with Number(), unlike dish IDs — a subtle bug-prevention
  detail understood before it caused a problem.
- Requested a "View Items" feature for manage-orders after noticing the
  original table only showed customer name/total, not what was ordered —
  identified a usability gap myself rather than just accepting the first
  version.

## Day 3: Visual Redesign, Images, Accessibility, Polish

- Directed Claude to propose a design system (palette, fonts, signature
  element) before writing any CSS, and approved the "Trattoria" direction
  (basil green + tomato red + serif headings + dotted menu price line)
  rather than accepting a generic default look.
- Found real dish/story photos independently and had Claude update the code
  to reference local file paths instead of external placeholder services.
- Identified and reported a real bug (home.js 404 — file was described but
  never actually saved) by reading the browser console myself and pasting
  the exact error back to Claude, rather than guessing.
- Made scope decisions independently: declined a Featured Dishes homepage
  section in favor of simplicity, and declined full responsive/mobile
  support for admin pages as an intentional, documented trade-off (admin
  panels are commonly desktop-only in real products).
- Asked Claude to explain what a "skip to main content" link and
  aria-describedby actually do in plain terms before deciding whether to
  implement them — pushed back and asked "why" rather than adding
  accessibility code without understanding its purpose.
- Made an informed trade-off: since Lighthouse already scored 90+, chose to
  fix only the flagged meta description issue rather than implementing every
  possible accessibility enhancement, and can explain that reasoning in
  review.
- Replaced placeholder alert() popups with real Bootstrap toast
  notifications for "Added to cart" feedback, based on a UX pattern spotted
  on another live website.

## Notes

This log reflects an iterative process: features were proposed, tested in
browser, and only committed once verified working. Several points above
represent independent judgment calls (scope decisions, bug discovery,
questioning the need for a proposed change) rather than passive acceptance
of AI-generated suggestions — these are the moments most relevant to
demonstrating genuine understanding of the codebase.

## Final Documentation Pass

- Directed Claude to build the architecture diagram as an actual SVG file
  showing the customer/admin page split, their JS modules, and the shared
  localStorage data layer they both read/write to — reviewed the layout
  before accepting it as accurate to the real codebase.
- Requested a full README covering setup instructions, admin credentials,
  and — deliberately — a "Known Limitations" section rather than a README
  that only lists features. Caught and fixed a markdown formatting bug
  (escaped brackets breaking the Live Demo link) before finalizing.
- Asked for a refactoring report grounded in real changes made during the
  project (the app.js/ui.js cleanup, the cart.js consolidation, the data.js
  localStorage conversion, the menu-price-line pattern) rather than
  hypothetical or generic refactoring examples, including an honest section
  on refactors that were consciously left undone and why.
- Decided the required "Peer Review Report" deliverable could not be
  meaningfully generated without first reviewing actual cohort peer
  projects, and chose to defer it rather than have Claude produce
  placeholder feedback on work it had never seen.

## Final Notes

Across all three days, the recurring pattern was: propose a plan, review it
before accepting, test every change in-browser, and treat AI output as a
draft to verify rather than a final answer — including catching real bugs,
questioning proposed accessibility work until its purpose was clear, and
declining to fabricate a peer review report for projects never actually
reviewed. This log, together with bug-log.md, is intended to demonstrate
that understanding, not just usage, was the goal throughout.
