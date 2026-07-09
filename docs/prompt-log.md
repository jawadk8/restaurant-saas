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
