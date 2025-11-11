# Spec-Driven Requirements

## Goal
Deliver a lightweight, client-only to-do list that demonstrates spec-to-implementation traceability for a single-page widget.

## Functional Requirements
1. Task creation — A visitor can type a description (up to 120 characters) and add it via the Add button or Enter key. Empty submissions must be rejected with inline messaging.
2. Task completion toggle — Each task renders with a checkbox that toggles its completed state and visually reflects the change.
3. Task removal — Each task exposes a remove control so the visitor can delete unwanted entries.
4. Persistence — The current task list is stored in `localStorage` under a stable key and automatically reloaded on page refresh.
5. Clear completed — A dedicated action removes all completed tasks in one click when any exist.

## UX & Accessibility Requirements
1. Empty-state guidance — When no tasks exist, an instructional empty-state message must appear; it hides as soon as tasks are present.
2. Remaining counter — The UI surfaces a live-updating count of incomplete tasks in the footer.
3. Keyboard-first form — The input receives focus styling, and the Add button is reachable via keyboard navigation; submitting the form does not refresh the page.
4. Screen-reader affordances — Labels exist for inputs, checkboxes reuse `<label>` text, and validation and task list updates announce via `aria-live` regions where applicable.

## Technical Constraints
1. Stack — Plain HTML, CSS, and browser JavaScript only; no build tooling.
2. Structure — Files live under `chatgpt/to-do-list/` with `index.html`, `styles.css`, `app.js`, and this `requirements.md` document.
3. Module scope — JavaScript should run in strict module scope and avoid global pollution beyond what the browser requires.
