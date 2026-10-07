# Action Plan — urawake.dev

Generated 2026-08-10 from `FULL-AUDIT-REPORT.md`. Ordered by impact-per-hour, not by severity label.

---

## Phase 1 — This week (critical, ~1 hour total)

| # | Task | Files | Est. |
|---|---|---|---|
| 1 | Add `Disallow: /invoices/` and `Disallow: /proposals/` | `public/robots.txt` | 2 min |
| 2 | Add `<meta name="robots" content="noindex,nofollow">` on invoice/proposal routes (robots.txt alone does not prevent indexing of linked URLs) | `InvoicePage.jsx`, `ProposalPage.jsx` | 20 min |
| 3 | Add `www.urawake.dev` in Vercel domains → "Redirect to apex". Fixes the TLS SAN failure and the 301 together | Vercel dashboard | 5 min |
| 4 | Finish or unpublish the `tourstodo-website` case study — it is live placeholder copy | `src/data/casestudies.js:105-140` | 30 min |

## Phase 2 — Weeks 2–3 (the unblocking fix)

| # | Task | Files | Est. |
|---|---|---|---|
| 5 | **Add `vite-react-ssg` prerendering for all static routes.** Resolves soft 404s, per-route canonicals/titles/OG, client-injected schema, AI-crawler blindness, and the 5.1s LCP in one change | `vite.config.js`, `src/main.jsx`, `src/App.jsx` | 4–6 hr |
| 6 | Configure Vercel to return a real 404 for unmatched paths once prerendered HTML exists | `vercel.json` | 30 min |
| 7 | Add title + description + canonical + OG to `/why-us`, `/team`, and `/projects/:slug` — copy the pattern from `CaseStudyPage.jsx:33-88` | `WhyUsPage.jsx`, `AboutSection.jsx`, `ProjectPage.jsx` | 1 hr |
| 8 | Regenerate `sitemap.xml`: add `/why-us`, `/team`, `/projects/tourstodo-pr`, `/case-studies/tourstodo-website`; per-URL real `lastmod` | `public/sitemap.xml` | 20 min |
| 9 | Fix `ItemList` schema URLs to point at own pages; drop the 3 orphaned entries (ClientFlow, Fitness Tracker, RollingLog) or build their pages; add `logo` to `ProfessionalService` | `index.html` | 30 min |
| 10 | Replace the `"2026"` `dateCreated` fallback with real ISO dates in the case-study data | `casestudies.js`, `CaseStudyPage.jsx:69` | 30 min |

## Phase 3 — Month 2 (content & authority)

| # | Task | Est. |
|---|---|---|
| 11 | Collect and publish 2–3 client testimonials with names and companies — the single biggest E-E-A-T gap | 1 wk (mostly waiting) |
| 12 | Link case studies directly from the homepage project grid — they are currently near-orphans | 1 hr |
| 13 | Expand `/why-us` to 700–900 words carrying the commercial-intent keywords; expand `/team` with proof points and case-study links | 3 hr |
| 14 | Resolve `/projects/:slug` vs `/case-studies/:slug` duplication — either expand the project pages or canonical them to the case study | 2 hr |
| 15 | Rewrite `llms.txt`: own-site case-study URLs, the 4 real slugs, `/why-us` and `/team`, a last-updated date | 45 min |
| 16 | Restructure case-study prose into self-contained 130–170 word answer blocks under question-shaped H2s | 3 hr |
| 17 | Add `BreadcrumbList` schema to project and case-study pages | 45 min |

## Phase 4 — Ongoing

| # | Task |
|---|---|
| 18 | Performance pass: route-level `React.lazy()` splitting, subset fonts to WOFF2 + preload, WebP/AVIF for the >900KB PNGs |
| 19 | Delete or relocate `src/assets/textures/` (11 PNGs, ~46.6MB, unused) |
| 20 | Give the homepage `<h1>` an accessible name — every letter in `GlitchTitle` is `aria-hidden` — and add an `<h1>` to `/team` |
| 21 | Re-run PageSpeed for CrUX field data once prerendering ships (this run was lab-only; PSI hit its rate limit) |
| 22 | Submit the corrected sitemap in Search Console; watch for "Duplicate, Google chose a different canonical" to clear |
| 23 | Add IndexNow for Bing/Copilot |
| 24 | Off-site AI-citation signals: YouTube and Reddit presence |
