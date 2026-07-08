# Speak — Admin Dashboard Prototype

A clickable **React + Tailwind** prototype that extends the existing Speak B2B admin dashboard (for **Acme Corp**) with three new product surfaces: **Proof & Renewal**, **Cohorts & Nudges**, and **Engagement**. The design matches the existing Speak design system exactly (white sidebar, `#F7F8FA` canvas, soft-shadow `rounded-2xl` cards, blue `#2563EB` accents, Inter typeface).

---

## Quick start

```bash
npm install
npm run dev      # → http://localhost:5173/
```

Other scripts:

```bash
npm run build    # production build → dist/
npm run preview  # preview the production build
```

Deep link: each screen is reachable directly by its nav id, e.g. `http://localhost:5173/#cohorts` or `http://localhost:5173/#engagement`.

---

## Tech stack

| Concern        | Choice                                             |
| -------------- | -------------------------------------------------- |
| Framework      | React 18                                           |
| Build tool     | Vite 5                                             |
| Styling        | Tailwind CSS v4 (via `@tailwindcss/vite`, no config file) |
| Icons          | `lucide-react`                                      |
| Font           | Inter (loaded from Google Fonts in `index.html`)   |
| State          | Local React state only — **no router, no backend** |

No external dependencies beyond Tailwind and lucide-react. Runs standalone.

---

## File structure

```
speak_demo/
├── index.html          # HTML shell + Inter font <link>
├── package.json        # deps + scripts
├── vite.config.js      # React + Tailwind v4 plugins
├── README.md           # this file
└── src/
    ├── main.jsx        # React entry point
    ├── index.css       # Tailwind import, font stack, scrollbar styling
    └── App.jsx         # ENTIRE app: shell, both screens, primitives, toasts
```

Everything lives in **`src/App.jsx`** (single-file component) — sidebar, top bar, both screens, shared UI primitives, and the toast system.

---

## Design system (matched from the existing dashboard)

- **Sidebar** — white, 220px, logo (animated bars + wordmark) top-left with a collapse icon, nav items with `rounded-lg` hover states, active item in blue with a left-accent bar. An "Acme Corp · Enterprise · 100 seats" card pinned to the bottom.
- **Main area** — `#F7F8FA` background, white `rounded-2xl` cards with a soft layered shadow and faint ring, generous padding.
- **Top bar** — large bold page title + gray subtitle on the left; notification bell + "English" language pill on the right.
- **Metric styling** — large bold numbers, color-coded health (green ≥80 / amber 50–79 / red <50), thin progress bars.
- **Avatars** — circular initials with a deterministic color palette (no image assets required).
- **Typography** — Inter, muted gray (`#6B7280`) for secondary text.

---

## Navigation

The sidebar switches screens via client-side state (`useState`), no routing library. Existing items show a graceful placeholder pointing to the two built surfaces.

| Nav item                | Status         |
| ----------------------- | -------------- |
| Overview                | Placeholder    |
| Learners                | Placeholder    |
| Seats                   | Placeholder    |
| Reports                 | Placeholder    |
| **Proof & Renewal**     | ✅ Built (New)  |
| **Cohorts & Nudges**    | ✅ Built (New)  |
| **Engagement**          | ✅ Built (New)  |
| Organization settings   | Placeholder    |

---

## Screen 1 — Proof & Renewal

> *"Everything you need for your next renewal conversation."*
> A one-click, renewal-ready view of the value Speak has delivered — replacing the slide deck a CS rep builds by hand.

- **Renewal packet banner** with a prominent **Export Renewal Packet** button (implies one-click PDF generation; fires a toast).
- **Enterprise Readiness Scorecard** — 5 clickable metric tiles, each 0–100, color-coded, with a one-line explainer:
  - **Activation** (87) — % of seats that started a lesson
  - **Completion** (74) — % of learners on-track for their assigned level
  - **Progress Evidence** (82) — documented skill-level gains (e.g. CEFR B1 → B2)
  - **Renewal Support** (91) — usage trend vs. last renewal cycle
  - **GTM Load** (46) — manual CS touches this quarter; *lower is better*, colored on inverted health and framed as time saved
- **Proof of Learning** — 4 learner outcome cards (avatar, role, before/after CEFR badge, hours studied, and a specific unlocked skill like *"Can now lead a full sales call in Spanish"*).
- **Engagement trend** — an SVG area chart spanning the last two renewal cycles, with a dashed "Last renewal" marker and a "+30% vs. last cycle" callout.
- **Time saved for your team** — self-serve tooling vs. manual CS work (9.2 CS hours saved, 1-click packet).

---

## Screen 2 — Cohorts & Nudges

> *"Configure how your teams launch, learn, and stay engaged — no CS ticket required."*
> Self-serve the setup work a CS rep used to do by hand — the "reusable product primitives" thesis. The spreadsheet + Slack message becomes a product surface.

- **Left panel** — list of cohorts, each with seat count, assigned course track, and an activation bar. Includes search + **New Cohort** button.
  - Sales Team — EMEA (24 seats, 92%)
  - New Hires Q3 (31 seats, 68%)
  - Exec Spanish Track (8 seats, 100%)
  - Support — LATAM (17 seats, 54%)
- **Right panel** — selected-cohort header + 3 tabs:
  - **Access** — toggle-based auto-enrollment rules (e.g. *"Auto-add new hires with title contains 'Sales'"*, EMEA org-unit auto-enroll, manager approval, seat reclamation) + "Add access rule".
  - **Assessments** — checkpoint list with pass-rate bars (baseline placement → certification "Lead a sales call").
  - **Nudges** — an `If [inactive 5 days] then [send lesson reminder]` rule builder plus a **stackable library of evidence-based nudge templates**, each with a channel + evidence tag and a live activate toggle:
    - Inactive 5 days → send lesson reminder *(Reactivation)*
    - Streak about to break (inactive 20h) → streak-save nudge *(Habit protection)*
    - Module completed → schedule Day 1 / 3 / 7 spaced-review quiz *(Spaced repetition)*
    - Weekly → at-risk digest to the cohort manager *(Manager visibility)*
    - Milestone reached → celebrate + suggest next track *(Motivation)*

---

## Screen 3 — Engagement

> *"Keep Acme Corp's learners active — intervene early, build habits, reinforce retention."*
> An engagement layer grounded in L&D research (early intervention, habit formation, spaced repetition).

- **Engagement health strip** — 4 color-coded 0–100 tiles (same style as the Readiness Scorecard): Daily Active % (64), Streak Retention (78), Nudge Response Rate (71), and At-Risk Learners (18, *inverted health — lower is better*), each with a one-line explainer.
- **At-risk learners table** — learners inactive 3+ days with avatar, role, last-active, current streak (🔥 count), a color-coded reason chip (e.g. *"stalled mid-module"*, *"missed 2 nudges"*), and a one-click **Send nudge** action (fires a toast). Plus a **Nudge all** bulk action.
- **Streaks & microlearning** — a top-streaks leaderboard (deterministic avatars, 🔥 counts) framing streaks as a protected daily habit, plus a **5-min daily habit** adoption stat (72% adoption, 6.4 min avg session).
- **Spaced-review schedule** — a visual of auto-generated review quizzes firing at **Day 1 / Day 3 / Day 7** after module completion, each with a completion bar — reinforcing retention, not just activity.

---

## Interactions

- Sidebar nav switches screens (client-side state).
- Score tiles, proof cards, cohort rows, and assessments are hoverable/clickable and fire toasts (bottom-right, auto-dismiss after ~3.2s).
- Access rules and nudge templates have working toggles that hold live state.
- All data is realistic mock data (Acme Corp, ~12 learners, CEFR-based language-learning metrics). No backend logic.

---

## Notes

- Tailwind v4 is config-less by default, so there is no `tailwind.config.js` — utilities are imported via `@import "tailwindcss";` in `src/index.css`.
- The Inter font loads from Google Fonts over the network; everything else runs offline.
```
