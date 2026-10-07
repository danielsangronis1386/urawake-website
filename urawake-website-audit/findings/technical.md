# Technical SEO Audit — urawake.dev

Date: 2026-08-10
Stack: Vite + React 19 SPA, react-router v7, Vercel hosting, client-side routing only (no prerendering/SSR/SSG).

## Score: 58/100

Pulled down primarily by crawlability/indexability failures inherent to the un-prerendered SPA (soft 404s, no unique per-route metadata reaching crawlers that don't execute JS) and a broken `www` subdomain. Security headers, robots.txt hygiene, and structured data on the homepage are strong.

---

## Critical

### 1. Every URL returns HTTP 200 with identical content — soft 404s at scale
Verified live:
```
GET https://urawake.dev/this-does-not-exist-12345  -> 200 (11,856-byte index.html)
GET https://urawake.dev/invoices/test-slug         -> 200
GET https://urawake.dev/proposals/test-slug        -> 200
```
`vercel.json` rewrites `/(.*)` to `/index.html` (SPA fallback), and `App.jsx`'s catch-all route (`<Route path="*" element={<Navigate to="/" replace />} />`) then client-side redirects to `/` — but that redirect only happens after JS executes. Any crawler or tool that reads the raw HTTP response (Googlebot's initial crawl pass, Bingbot, most non-Chromium bots, social scrapers, `curl`, link checkers) sees a 200 with full homepage content at a random URL. This is a textbook soft-404 pattern and will:
- Cause Search Console to flag "Indexed, though blocked by..." / soft-404 errors as bots discover garbage URLs (typos, scanners, old links).
- Dilute crawl budget and confuse canonicalization signals once enough junk URLs are discovered.
- Actively hand real client-side content to non-JS crawlers at wrong URLs (the invoices/proposals case below is worse for this reason).

**Fix**: For genuinely nonexistent routes, either (a) prerender a real `/404.html` page and configure Vercel to serve it with a `404` status via `vercel.json` `routes`/`redirects`/error page config instead of the blanket rewrite, or (b) adopt one of the prerendering approaches below so `*` resolves server-side and Vercel can return true 404s for unmatched slugs.

### 2. `/invoices/*` and `/proposals/*` are fully crawlable and indexable
These are presumably private/client-facing routes (invoices, proposals) not meant for public search visibility, yet:
- `robots.txt` has a blanket `Allow: /` with no `Disallow` for `/invoices/` or `/proposals/`.
- They are not in `sitemap.xml` (good), but that doesn't stop crawling/indexing — Google indexes URLs it discovers via links or guesses even without a sitemap entry.
- Because of the SPA fallback (#1), any invoice/proposal slug — even ones you never intended to expose or that don't exist — returns 200 with the homepage's indexable HTML (title, canonical `https://urawake.dev/`, full structured data). A leaked or guessed invoice URL is crawlable and will get indexed as a duplicate of the homepage, and worse, if a search engine renders JS it could index actual client billing content under a public URL.

**Fix**:
```
User-agent: *
Disallow: /invoices/
Disallow: /proposals/
```
This alone doesn't secure the data (client JS still fetches and renders it for anyone with the link) — pair with `noindex` via a rendered meta tag (needs prerendering, see below) and, ideally, actual access control (signed URLs/auth) since these look like billing documents.

---

## High

### 3. No prerendering: every route shares one `<title>`, one canonical, one meta description, one OG image
Confirmed via curl — `/`, `/projects/eliots-adventures`, `/case-studies/tourstodopr`, `/team`, `/why-us` etc. all serve byte-identical index.html (11,856 bytes, homepage `<title>URAWAKE Stackhouse | Full Stack Web Development</title>`, `<link rel="canonical" href="https://urawake.dev/">`). Consequences:
- Any crawler that doesn't execute JS (most non-Google bots, and Google's initial HTML pass before the render queue) sees the homepage's title/description/canonical for case-study and project pages. Rich results, social shares (before JS hydration), and any tool relying on raw HTML will misrepresent those pages.
- The self-referencing canonical of `/` embedded in every route is a duplicate-content/indexing signal problem: if Google ever indexes `/projects/eliots-adventures` from the rendered DOM but also sees a canonical pointing at `/` in the raw source depending on crawl timing, it can consolidate signals to the homepage instead of the subpage, or simply choose not to index subpages at all.
- The five URLs in `sitemap.xml` (`/case-studies/eliots-adventures`, `/projects/eliots-adventures`, `/case-studies/tourstodopr`, `/case-studies/eliots-crm`, `/projects/eliots-crm`, `/projects/tourstodo-crm`) are being submitted for indexing but each currently only differentiates itself from the homepage via client-rendered JS — a real risk of Search Console reporting "Duplicate, Google chose different canonical than user."

**Fix — pick one**:
- **`vite-react-ssg`**: purpose-built for react-router + Vite, generates static HTML per route at build time (best fit here since routing is already react-router v7).
- **`vite-plugin-prerender`**: simpler bolt-on, runs a headless Chrome pass over your defined routes post-build and writes per-route HTML files. Good for a small, known route list (this site's routes are enumerable: home, team, why-us, and the ~6 slugs already in the sitemap plus 2 more not yet listed).
- Given the route list is small and mostly static content (case studies/projects), static pre-render (SSG) is a better fit than full SSR — no need for Vercel serverless functions, keeps the current all-static Vercel deploy model, and each route gets its own real `<title>`, `<meta description>`, canonical, and OG tags baked into the HTML `<head>` before any JS runs.

### 4. `www.urawake.dev` is broken (TLS certificate mismatch, not a redirect)
```
curl -v https://www.urawake.dev/
* SSL: no alternative certificate subject name matches target host name 'www.urawake.dev'
subject: CN=urawake.dev  (no SAN for www.urawake.dev)
```
This isn't a canonicalization/redirect issue — it's a hard TLS failure. Any browser or crawler hitting `https://www.urawake.dev` gets a certificate error before any HTTP response is served (curl exit code 60). If any inbound links, old bookmarks, business cards, or DNS/WHOIS records point to `www.urawake.dev`, that traffic and any potential link equity is lost entirely, and a crawler attempting to verify a `www` variant will log a connection failure. This also affects `www` as a common typed variant users guess by habit.

**Fix**: In Vercel project settings, add `www.urawake.dev` as a domain with "Redirect to apex" — this provisions the certificate and yields a clean 301/308 to `https://urawake.dev/` instead of a TLS error. Apex-only is a fine end state, but the www host must not error.

---

## Medium

### 5. LCP/render-blocking risk from unoptimized font delivery
`src/index.css` loads Inter and Archivo Black as raw `.ttf`:
- `Inter-VariableFont_opsz,wght.ttf` — 874 KB
- `Inter-Italic-VariableFont_opsz,wght.ttf` — 904 KB
- `ArchivoBlack-Regular.ttf` — 89 KB

That's ~1.87 MB of font payload (only MonoBlaze ships as woff2/woff). TTF is 2-3x larger than woff2 for the same glyph coverage, and none of these three fonts are preloaded (`index.html` only preloads `/logo.png`). `font-display: swap` is set on all four `@font-face` rules, which avoids invisible-text blocking but will cause a visible flash/reflow (FOUT) as large heading text (Archivo Black is used for hero/display type) swaps in — a CLS contributor given no matching fallback-font metrics are declared (`size-adjust`/`ascent-override` not used).

**Fix**: Convert `Inter-VariableFont_opsz,wght.ttf` and `ArchivoBlack-Regular.ttf` to `.woff2` (variable-font woff2 conversion is standard, tools: `fonttools varLib.instancer` + `woff2_compress`, or subset with `glyphhanger`/`pyftsubset` to Latin-only). Add `<link rel="preload" as="font" type="font/woff2" crossorigin>` for the fonts used above-the-fold (hero headline + body). Consider self-hosting only the weights actually used rather than the full variable-font axis range.

### 6. Oversized unoptimized image assets in the build
`dist/assets/` (already built output, indicative of what ships):
- `cajamarcal logo-DGRrH4oj.png` — 917 KB
- `cajamarca logo 2-BNVVHjYI.png` — 284 KB
- Several project/case-study JPGs in the 250-520 KB range (`torstodcrm0`, `tours2do 2/3`, `eliots 1/2`, `Daniel Sangronis`, `janyerlyn morales`)
- `public/logo.png` (preloaded, `fetchpriority="high"`) is 48 KB PNG at 1081×392 — reasonable, but not WebP/AVIF.

None of these appear to be served as responsive/modern formats (no `<picture>`/`srcset`/AVIF-WebP evidence in the built assets list — all `.png`/`.jpg`). If any of these large images land on a route's initial viewport (project/case-study pages, team photos), they're LCP candidates well above the "Good" 2.5s budget on throttled mobile connections. `logo.png` being preloaded with `fetchpriority="high"` is good practice for the homepage LCP element; the same treatment isn't evident for the below-the-fold or subpage hero images.

**Fix**: Convert large PNGs/JPGs to WebP/AVIF via a Vite image-optimization plugin (`vite-plugin-image-optimizer` or `@squoosh/lib` in a build step), add explicit `width`/`height` on `<img>` tags to prevent CLS, and lazy-load below-the-fold images (`loading="lazy"`) while reserving `fetchpriority="high"` + eager loading only for genuine LCP images per route.

### 7. Single monolithic JS bundle (308 KB `index-*.js`), no route-based code splitting
`vite.config.js` uses the default Vite/React setup with no manual chunking, and `App.jsx` statically imports every route component (`ProjectPage`, `CaseStudyPage`, `ProposalPage`, `InvoicePage`, `WhyUsPage`) instead of `React.lazy()`. Every visitor — including a bot that only needs the homepage — downloads and parses all route code up front. This inflates Time to Interactive / INP-affecting main-thread work on first load and will only get worse as more case studies/proposals are added.

**Fix**: Wrap non-homepage routes in `React.lazy()` + `Suspense` so `/team`, `/why-us`, project/case-study/proposal/invoice pages split into separate chunks loaded on demand. Combine with the prerendering fix (#3) — prerendered HTML for a route can still hydrate a lazily-loaded chunk.

### 8. Cache-Control on `index.html` conflicts with the "identical shell" reality but is otherwise fine
`vercel.json` sets `index.html` to `no-store, no-cache, must-revalidate` (correct for an SPA shell so users always get the latest build), but combined with #1/#3 this means every "page" on the site — including ones that should be static/cacheable case-study content — is served through the always-revalidated shell. Once prerendering ships, static per-route HTML should get real `Cache-Control` (e.g., Vercel's default static asset caching or a short `s-maxage` with `stale-while-revalidate`) rather than inheriting the `no-store` shell policy from the current catch-all rewrite.

**Fix**: Not urgent standalone — resolve as part of implementing #3; make sure the header rules are scoped so prerendered route HTML isn't accidentally caught by the `/index.html`-only `no-store` rule (it currently only targets the literal `/index.html` path, so this is more a forward-looking note than an active bug).

---

## Low

### 9. Sitemap is missing 2 of the ~8 crawlable content routes
`sitemap.xml` lists 6 URLs (home + 5 project/case-study pages) but `App.jsx` implies additional live case studies referenced elsewhere in the repo (e.g., `tourstodo-crm` has a case-study page per recent commits — "tourstodo: link the live build and give the website its own case study" — but only `/projects/tourstodo-crm` is in the sitemap, no matching `/case-studies/tourstodo-crm` or `/case-studies/tourstodopr`-style entry is verified against current routes). `/team` and `/why-us` are not in the sitemap either; if they're meant to be indexed, add them (priority ~0.5-0.6).

**Fix**: Audit the sitemap generation against the actual current route/slug list each time a case study ships, or automate sitemap generation from the same data source that drives the route components to avoid drift.

### 10. Double-slash URL (`https://urawake.dev//`) redirects to `/` via 308 — confirm this is intentional Vercel default
Not a bug (Vercel's default normalization), just confirming no infinite-redirect or duplicate-content risk here: `curl -I "https://urawake.dev//"` returns `308` → `location: /`. No action needed, noted for completeness.

### 11. IndexNow not implemented
No evidence of an IndexNow key file or ping integration for Bing/Yandex/Naver. Given the site publishes new case studies periodically, wiring a post-deploy IndexNow ping (submit changed URLs on each Vercel deploy via a build hook) would get faster indexing on Bing/Yandex without material engineering cost. Low priority relative to the crawlability/prerendering issues above, but cheap to add once routes are prerendered and have stable, real per-URL content to announce.

---

## What's already solid (verified, no action needed)

- **Security headers**: `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Permissions-Policy`, `Referrer-Policy: strict-origin-when-cross-origin`, `Strict-Transport-Security` (HSTS with `preload` + `includeSubDomains`), and a real `Content-Security-Policy` (`default-src 'self'`, no wildcard script-src) are all present and correctly served on the apex domain. This is above-average for a small business site.
- **HTTP → HTTPS**: `http://urawake.dev/` returns a clean `308 Permanent Redirect` to `https://urawake.dev/`.
- **robots.txt**: syntactically valid, explicitly allows major AI crawlers (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot) in addition to `*`, and correctly references the sitemap. Gap is the missing `Disallow` rules noted in #2.
- **Structured Data**: Homepage carries well-formed `ProfilePage` + `Person`, `WebSite`, `ProfessionalService` (with `OfferCatalog`), and a portfolio `ItemList` — all valid JSON-LD with consistent `@id` cross-referencing. (Per-route structured data for case studies is a separate content/schema question, not scored here.)
- **`<noscript>` fallback**: A genuinely useful, keyword-relevant noscript block exists with real content, services list, portfolio summary, and contact links — a good-faith no-JS fallback, though it only covers the homepage (subpages have no equivalent).
- **Trailing-slash handling**: `/team` and `/team/` both return 200 with identical content (Vercel default normalization) — no duplicate-content splitting observed.
- **Caching for hashed assets**: `/assets/*` gets `Cache-Control: public, max-age=31536000, immutable`, correct for Vite's content-hashed filenames.
- **Preload of homepage LCP image**: `logo.png` is preloaded with `fetchpriority="high"`, appropriate given it's the boot-splash/hero image.

---

## Priority Summary

| # | Issue | Severity |
|---|---|---|
| 1 | Soft 404s: every nonexistent URL returns 200 with homepage content | Critical |
| 2 | `/invoices/*`, `/proposals/*` crawlable, not disallowed in robots.txt | Critical |
| 3 | No prerendering — duplicate title/canonical/meta across all routes | High |
| 4 | `www.urawake.dev` TLS certificate mismatch (hard failure, not redirect) | High |
| 5 | Fonts served as unoptimized TTF, not preloaded — LCP/CLS risk | Medium |
| 6 | Large unoptimized PNG/JPG images (up to 917 KB) — LCP risk | Medium |
| 7 | No route-based code splitting — 308 KB monolithic JS bundle | Medium |
| 8 | Cache-Control scoping to revisit once prerendering ships | Medium |
| 9 | Sitemap missing `/team`, `/why-us`, possibly newer case-study slugs | Low |
| 10 | Double-slash URL redirect behavior (confirmed fine, no action) | Low |
| 11 | IndexNow protocol not implemented | Low |

## Recommended sequencing
1. Fix `www` TLS/redirect in Vercel domain settings (#4) — trivial, immediate.
2. Add `Disallow: /invoices/` and `Disallow: /proposals/` to `robots.txt` (#2) — trivial, immediate.
3. Ship prerendering via `vite-react-ssg` (#3), which simultaneously fixes the soft-404 problem (#1) by letting Vercel return real 404s for unmatched routes and giving every route its own metadata/canonical.
4. Once prerendering is in place, revisit sitemap completeness (#9), Cache-Control scoping (#8), and add per-route `noindex` for `/invoices/*`/`/proposals/*` in the rendered `<head>`.
5. Performance pass: font conversion to woff2 + preload (#5), image optimization (#6), route-based code splitting (#7).
6. IndexNow integration (#11) as a low-cost follow-up once real per-route content ships.
