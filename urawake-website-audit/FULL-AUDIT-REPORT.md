# SEO Audit — URAWAKE Stackhouse (Re-Audit)

**URL:** https://urawake.dev/
**Date:** 2026-08-10
**Previous audit:** 2026-06-21 (score 61/100) — archived at `FULL-AUDIT-REPORT-2026-06-21.md`
**Business type:** Web development studio / freelance developer portfolio (Los Angeles, CA; tourism & hospitality SMB focus)
**Stack:** Vite 7 + React 19 SPA, react-router v7, deployed on Vercel

---

## SEO Health Score: 57 / 100

| Category | Score | Weight | Weighted | vs. June |
|---|---|---|---|---|
| Technical SEO | 58/100 | 22% | 12.8 | +3 |
| Content Quality | 61/100 | 23% | 14.0 | **+21** |
| On-Page SEO | 62/100 | 20% | 12.4 | −3 |
| Schema / Structured Data | 58/100 | 10% | 5.8 | **−30** |
| Performance (CWV) | 58/100 | 10% | 5.8 | −12 |
| AI Search Readiness | 34/100 | 10% | 3.4 | **−46** |
| Images | 55/100 | 5% | 2.8 | +5 |
| **TOTAL** | | | **57.0** | −4 |

### Why the score went *down* despite real progress

This is not a regression in the site. Two things changed:

1. **Scope grew.** June audited one page. The site now has ~11 real routes (4 case studies, 4 project pages, `/why-us`, `/team`, home). Every new route inherits the SPA's rendering problem, so the same defect now costs more.
2. **June scored the SPA problem too generously.** Schema was scored 88 and AI readiness 80 on the basis that the JSON-LD and llms.txt *exist*. They do — but they exist in a page that no non-JS crawler can read past the `<head>`. This audit scores what crawlers actually receive.

The genuine wins since June: custom domain shipped (`urawake.dev`), OG image converted to PNG, security headers completed, `<noscript>` fallback added, and four real case studies written. Content quality moved 40 → 61, the largest single improvement.

---

## Top 5 Critical Issues

1. **No prerendering — every route serves identical HTML.** Confirmed live: `/`, `/why-us`, `/case-studies/tourstodopr`, and any invented URL all return the exact same 11,856-byte response with the homepage `<title>` and `<link rel="canonical" href="https://urawake.dev/">`. All 7 sitemap URLs self-canonicalize to the homepage in raw HTML. This is the root cause behind roughly half of every other finding in this report.
2. **Soft 404s across the entire URL space.** `vercel.json`'s blanket rewrite plus the catch-all in `src/App.jsx:86` mean nonexistent paths return HTTP 200 with homepage content. Google has no way to learn a URL is invalid.
3. **`/invoices/*` and `/proposals/*` are crawlable.** These are client-facing documents. `public/robots.txt` has no `Disallow`, no route sets `noindex`, and each returns 200. Any guessed or leaked slug is indexable, and real client content renders once JS runs.
4. **`www.urawake.dev` is hard-broken.** Not an unredirected variant — a TLS SAN mismatch (cert is `CN=urawake.dev` with no `www` SAN). Anyone typing or linking `www.` gets a browser security error, not a redirect.
5. **`tourstodo-website` case study ships placeholder copy.** `src/data/casestudies.js:105-140` contains draft text with no real outcome numbers, live on an indexable route.

## Top 5 Quick Wins

1. Add `Disallow: /invoices/` and `Disallow: /proposals/` to `public/robots.txt` — 2 minutes, closes the client-document exposure. (Pair with a `noindex` meta on those routes, since robots.txt does not prevent indexing of linked URLs.)
2. Add `www.urawake.dev` in Vercel domain settings with "redirect to apex" — provisions the cert and fixes the 301 in one step. ~5 minutes.
3. Regenerate `public/sitemap.xml`: add `/why-us`, `/team`, `/projects/tourstodo-pr`, `/case-studies/tourstodo-website`; refresh the stale `lastmod` (currently 2026-06-22 on every URL). ~15 minutes.
4. Point the homepage `ItemList` schema at your own `/projects/*` and `/case-studies/*` URLs instead of the generic GitHub profile — 5 of 6 items currently link off-site. ~15 minutes.
5. Link case studies directly from the homepage project grid. They are currently reachable only after a click into a project viewer (`ProjectViewer.jsx:89`, `ProjectPage.jsx:116`) — near-orphan pages. ~30 minutes.

---

## Technical SEO — 58/100

Full detail: `findings/technical.md`

**Confirmed solid:** all security headers correct (CSP, HSTS with preload, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy — all the June gaps closed); HTTP→HTTPS 308 works; trailing-slash handling consistent; `/assets/*` immutable caching correct; robots.txt allows GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot and references the sitemap; a genuinely useful `<noscript>` fallback exists (homepage only).

**Critical — soft 404s on every URL.** `/invoices/test-slug`, `/proposals/test-slug`, and arbitrary nonexistent paths all return 200 with the identical homepage HTML. The `<Navigate to="/" replace />` catch-all only fires after JS executes.

**Critical — private routes crawlable.** See Top 5 above.

**High — no prerendering.** Every route shares one `<title>`, one canonical, one meta description, one set of OG tags in raw HTML. Expect "Duplicate, Google chose a different canonical" in Search Console for the subpages. Recommended fix: `vite-react-ssg`, which works with the existing react-router v7 setup, over `vite-plugin-prerender`.

**High — `www` TLS failure.** `curl -v` returns exit 60 (cert SAN mismatch), not a redirect.

**Medium:** fonts shipped as raw `.ttf` (Inter variable 874KB + 904KB, Archivo Black 89KB) and not preloaded — only `logo.png` is; images up to 917KB PNG with no WebP/AVIF in the build output; single 308KB JS bundle with no `React.lazy()` route splitting.

**Low:** no IndexNow integration for Bing/Yandex.

---

## Content Quality — 61/100 (was 40)

Full detail: `findings/content.md`

The four case studies are the real improvement — they carry concrete, quotable outcomes ("100+ bookings", "~20 hrs/month automated", "130+ waivers digitized") and a clean problem/solution/outcome heading structure.

**Critical — placeholder case study live.** `tourstodo-website` (`casestudies.js:105-140`).

**Critical — zero testimonials or third-party validation.** No client quotes, reviews, or attributed statements anywhere in the codebase. Trustworthiness carries ~30% of E-E-A-T weight and this is the single largest missing lever.

**High — `/projects/:slug` pages are thin** (~40-80 words) and largely duplicate their linked case studies. Either expand them or canonicalize them to the case study.

**High — `/why-us` (~200-250 words) and `/team` (~220 words) are thin** for pages carrying the commercial-intent and trust load, with no case-study links or proof points.

**Medium:** the founder bio leads with "started building in late 2025" — honest, but an Expertise headwind; reframe around output (389 commits, 32 data models, 8 integrations) rather than tenure. The target phrase (LA full-stack studio for tourism/hospitality SMBs) is well hit in `llms.txt` but nearly absent from `/why-us`.

**E-E-A-T breakdown:** Experience 60 · Expertise 55 · Authoritativeness 35 · Trustworthiness 55 → weighted 51/100.

---

## On-Page SEO — 62/100

**Per-route metadata coverage is uneven:**

| Route | Title | Description | Canonical | OG | JSON-LD |
|---|---|---|---|---|---|
| `/` | ✅ | ✅ | ✅ | ✅ | ✅ (4 blocks) |
| `/case-studies/:slug` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/projects/:slug` | ✅ | ❌ | ❌ | ❌ | ❌ |
| `/why-us` | ❌ | ❌ | ❌ | ❌ | ❌ |
| `/team` | ❌ | ❌ | ❌ | ❌ | ❌ |

`CaseStudyPage.jsx:33-88` is the model implementation — title, description, canonical, OG, Twitter, and CreativeWork JSON-LD, with proper cleanup on unmount. `ProjectPage.jsx:17` sets only `document.title`. `/why-us` and `/team` set nothing at all, so they inherit and keep the homepage canonical pointing at `/` — they are actively telling Google they are the homepage.

**Heading structure:** `/team` renders `AboutSection`, which has only `<h2>` elements and no `<h1>`. The homepage `<h1>` is `GlitchTitle`, which splits the text into per-letter `<span aria-hidden="true">` elements — the text remains in the DOM for crawlers, but the heading has no accessible name for screen readers. Worth a visually-hidden text node.

**Internal linking is the weak point.** The navbar links `/`, `/#anchors`, `/team`, `/why-us`. Nothing links to case studies except from inside a project view. Case studies are your best content and your least-linked pages.

---

## Schema / Structured Data — 58/100

Full detail: `findings/schema.md`

The markup itself is well-constructed — that is not the problem. Placement and accuracy are.

**Critical — CaseStudyPage JSON-LD is client-injected only** (`CaseStudyPage.jsx:60-74`). Unreliable for Google (delayed second-wave rendering), invisible to Bing, social scrapers, and AI crawlers.

**Critical — `ItemList` URLs point off-site.** 5 of 6 `CreativeWork` items in `index.html` set `url` to the same generic `https://github.com/danielsangronis1386` rather than your own pages.

**Critical — sitemap missing 4 live routes:** `/why-us`, `/team`, `/projects/tourstodo-pr`, `/case-studies/tourstodo-website`. (Note: `/case-studies/tourstodopr` without the hyphen is *correct* — it matches the slug in `casestudies.js`. The sitemap's defect is incompleteness, not wrong slugs.)

**High:** `dateCreated` falls back to the literal string `"2026"` (`CaseStudyPage.jsx:69`) — not valid ISO 8601, and a fabricated date. `lastmod` is 49 days stale and identical across all URLs. Three `ItemList` entries (ClientFlow, Fitness Tracker, RollingLog) have no corresponding route in `projects.js` or `casestudies.js`.

**Medium:** `ProfessionalService` has no `logo`/`image`, blocking Organization logo rich-result and Knowledge Panel eligibility; the injected `CreativeWork.author` restates a bare `Person` instead of `@id`-referencing `#daniel-sangronis`; no `BreadcrumbList` anywhere.

Corrected JSON-LD and a corrected `sitemap.xml` are written out in full in `findings/schema.md`.

---

## Performance (CWV) — 58/100

Full detail: `findings/performance.md`

Lighthouse mobile, simulated throttle (PSI API hit its rate limit; re-run for CrUX field data):

| Page | LCP | TBT | CLS | Perf |
|---|---|---|---|---|
| `/` | 5.1s ❌ | 0ms ✅ | 0.000 ✅ | 72 |
| `/case-studies/tourstodopr` | 5.0s ❌ | 0ms ✅ | 0.000 ✅ | 70 |

INP and CLS are excellent. LCP is the sole problem, and **the boot-splash is not helping it.** Lighthouse identifies the LCP element as `span.hero-typed` (the typewriter eyebrow) on home and a body paragraph on the case study — not `/logo.png`. Because React unmounts `#boot-splash` on hydrate, the preloaded logo is never an eligible LCP candidate once real content paints. 88% of LCP (4.3–4.4s) is Render Delay: JS download → parse → hydrate → typewriter animation completes. TTFB is only ~12% of the budget, so this is entirely client-render-gated, not a server problem.

The fix that actually moves LCP is making real hero text paint without waiting on hydration and the typewriter timers — which prerendering delivers alongside everything else.

---

## AI Search Readiness (GEO) — 34/100

Full detail: `findings/geo.md`

**Critical — AI crawlers see almost nothing.** GPTBot, ClaudeBot, and PerplexityBot do not execute JavaScript. Every route on the site returns the same generic `<noscript>` block: one H1, one paragraph, a services list, and one line per project. The entire case-study narrative — including the concrete metrics that would make you citable — is unreachable. `robots.txt` politely invites crawlers that then find an empty room.

There is an irony worth noting: the Eliot's Adventures case study copy itself advertises that *that* client site is prerendered.

**High — `llms.txt` is stale.** It links to client sites and GitHub rather than your own `/case-studies/*` pages, describes an outdated 6-project model instead of the 4 real case-study slugs, omits `/why-us` and `/team`, and carries no last-updated date.

**Medium:** case-study prose is paragraph-heavy rather than broken into self-contained 130–170 word direct-answer blocks; headings are declarative ("The problem", "What we built") rather than question-shaped. No YouTube or Reddit presence — the two highest-correlation off-site AI-citation signals.

**Bright spot:** entity naming is perfectly consistent across `index.html` JSON-LD, `llms.txt`, and `casestudies.js`, and `sameAs` links to LinkedIn and GitHub are present. That consistency is what holds the Authority sub-score at 45.

Heuristic platform estimates: Google AI Overviews ~30, Bing Copilot ~25, ChatGPT ~15, Perplexity ~15.

---

## Images — 55/100

OG image is now a correct 1200×630 PNG with dimensions, type, and alt declared — the June critical is resolved. Full favicon set present.

Remaining: build output contains PNGs up to 917KB with no WebP/AVIF variants; the untracked `src/assets/textures/` directory holds 11 PNGs totaling ~46.6MB — confirmed unused by grep and not currently bundled, but a live footgun if anyone imports one. Delete them or move them out of `src/`.

---

## The one fix that unblocks everything

Ten of the findings above — soft 404s, duplicate canonicals, per-route metadata, client-injected schema, AI crawler blindness, and the 5.1s LCP — collapse into a single root cause and a single fix: **prerender the routes at build time.**

`vite-react-ssg` fits the existing react-router v7 setup and requires no framework migration. It emits real HTML per route, which simultaneously gives every page its own title/canonical/OG, puts JSON-LD in the raw HTML, makes case-study prose visible to AI crawlers, lets Vercel return real 404s for unknown paths, and paints hero content before hydration.

Everything else in this report is worth doing. Nothing else in this report is worth doing *first*.
