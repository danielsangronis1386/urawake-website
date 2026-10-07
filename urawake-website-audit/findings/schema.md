# Structured Data & Sitemap Audit — urawake.dev

Site: https://urawake.dev/ (Vite + React, client-side rendered, `BrowserRouter`, no SSR/prerendering plugin in `vite.config.js`)

## Category Score: 58 / 100

Driven down by: unreliable client-side-only JSON-LD on 8 of the site's indexable routes, an ItemList that links off-site instead of to the site's own pages, a fragile date fallback, and a sitemap missing 4 of the ~11 real routes with all lastmod dates stale.

---

## 1. Schema Detection

### Server-rendered (in `index.html`, present in raw HTML — reliable)
1. `ProfilePage` + nested `Person` (mainEntity) — `@id: https://urawake.dev/#webpage` / `#daniel-sangronis`
2. `WebSite` — `@id: https://urawake.dev/#website`
3. `ProfessionalService` (+ `OfferCatalog` of 5 `Service` offers) — `@id: https://urawake.dev/#urawake-stackhouse`
4. `ItemList` "Portfolio Projects" — 6 `ListItem` → `CreativeWork` items (untyped `@id`s)

### Client-side injected (runtime only — NOT in raw HTML)
5. `CreativeWork` injected in `src/components/CaseStudyPage/CaseStudyPage.jsx:60-74` on every `/case-studies/:slug` page mount, removed on unmount. Also injects a `ProjectPage` schema block presumably in the sibling `ProjectPage` component (not in scope here, same pattern applies).

---

## 2. Validation Results

### Block 1 — ProfilePage/Person: PASS with note
- `@context`, `@type`, `@id`, `url`, `name` all present and valid.
- `Person.worksFor` correctly references `#urawake-stackhouse` by `@id` — good graph linking.
- `sameAs` uses absolute URLs. Good.
- Note: `ProfilePage` is a narrow, rarely-recognized type for rich results (Google has no dedicated feature for it). It's fine to keep for entity clarity but don't expect SERP treatment from it; treat as an AI/LLM entity-resolution aid rather than a rich-result play.

### Block 2 — WebSite: PASS
- Required properties present. `publisher` correctly references `#urawake-stackhouse`. No `SearchAction` (fine — site has no internal search, don't add a fake one).

### Block 3 — ProfessionalService: PASS with gaps
- Required (`name`, `address`) present. `priceRange`, `areaServed`, `founder` (linked via `@id`) all good.
- Missing recommended properties that matter for LocalBusiness/ProfessionalService rich results and Knowledge Panel eligibility:
  - `logo` / `image` — **flagged below as missing opportunity**
  - `telephone` (optional if genuinely no public number, otherwise add)
  - `openingHoursSpecification` (optional for a service business without a storefront — low priority)
  - `sameAs` at the org level (currently only on the Person) — recommend duplicating LinkedIn/GitHub here too, or a dedicated `Organization` (see §4).
- `hasOfferCatalog.itemListElement[].item` (`Service`) objects have no `@id`, `url`, or `provider` back-reference. Not required, but recommended for graph consistency and for the dedicated Service-page opportunity below.

### Block 4 — ItemList (Portfolio Projects): **FAIL — critical**
- `@type: ItemList` and `ListItem.position` are structurally valid.
- **Critical defect:** 4 of 6 items (`ToursToDo PR`, `ToursToDo CRM`, `ClientFlow`, `Fitness Tracker`, `RollingLog` — actually 5 of 6) use `"url": "https://github.com/danielsangronis1386"` — the *same generic GitHub profile URL* repeated across multiple distinct `CreativeWork` items. This is:
  - Semantically wrong (the URL doesn't identify that specific project).
  - A duplicate-URL pattern across list items, which undermines the ItemList's usefulness for identifying distinct entities and dilutes any AI/crawler confidence in the list.
  - A missed internal-linking opportunity: the site *has* real pages for these projects (`/projects/tourstodo-pr`, `/projects/tourstodo-crm`, and case studies at `/case-studies/tourstodo-website`, `/case-studies/tourstodopr`) that should be the canonical `url` values instead.
  - Two items (`ClientFlow`, `Fitness Tracker`, `RollingLog`) have **no corresponding route at all** in `projects.js`/`casestudies.js` — they may be legacy/placeholder entries no longer backed by real pages. Confirm whether these 3 projects still exist on the site; if not, remove them from the ItemList (dead entities in structured data actively hurt trust).
  - `dateCreated` values (e.g., `"2025-01-01"`) appear to be rough/synthetic placeholders (all first-of-month), not real founding dates — low severity, but avoid data that looks fabricated to a validator or an LLM doing fact-checking.
- **Fix:** point `url` at the site's own canonical page for each project (prefer the case-study URL when one exists, else the project URL), and either build/remove the 3 orphaned entries.

### Block 5 — CaseStudyPage CreativeWork (runtime-injected): **FAIL — critical (delivery) + FAIL (data)**
- **Delivery is unreliable for indexing.** This is a pure CSR React app (`vite.config.js` has no SSR/prerender plugin; `BrowserRouter` + `useEffect` DOM injection). Googlebot *can* execute JS in most cases and pick up late-injected `<script type="application/ld+json">`, but:
  - It requires a second (render) wave of Googlebot's indexing pipeline, which is slower and not guaranteed — Google's own docs describe this as best-effort, and other engines/crawlers (Bing, most AI/LLM crawlers, social-card scrapers) frequently do **not** execute JS at all.
  - Because the schema is appended to `document.head` after mount and removed on unmount, a crawler that fetches once and doesn't wait for full hydration+effect-flush can miss it entirely, or (in edge cases with fast route transitions) could theoretically observe a stale block from a previous route if the removal races with a new fetch — low risk in a single-page navigation, non-issue for server fetches, but worth noting as a code-quality smell.
  - **Recommendation:** treat this as unreliable for SEO purposes. Prerender these routes (e.g., `vite-plugin-ssr`, `vite-plugin-prerender-spa`, or Astro/Next migration for content routes) or at minimum move this schema into `index.html`-level static injection via a build-time step per route. Given the site already has 4-8 known case-study/project slugs, static prerendering per route is very achievable.
- **Data defect — `dateCreated` fallback:** `cs.duration.match(/(\w+ \d{4})/)?.[1] ?? "2026"` falls back to the literal string `"2026"` when the regex fails to find a `Month YYYY` pattern in `cs.duration`. Two problems:
  1. `"2026"` is not valid ISO 8601 (should be `"2026-01-01"` or omitted) — if it's ever emitted, it fails property-type validation for `dateCreated` (expects Date, not a bare 4-digit string).
  2. It's a **hardcoded current-ish year with no real connection to any actual date** — if `cs.duration` doesn't match the regex, the schema will assert a fabricated creation date. Recommend either omitting `dateCreated` entirely when the regex misses, or storing a proper ISO date field (`dateCreated: "2025-XX-XX"`) directly in `casestudies.js` per entry instead of parsing it out of a human-readable `duration` string.
- Otherwise structurally valid: `@context`, `@type`, `name`, `description`, `url` (absolute, correct), `author` (Person, though not linked via `@id` back to the homepage's canonical `#daniel-sangronis` — should use `{"@id": "https://urawake.dev/#daniel-sangronis"}` instead of restating a bare Person object, for graph consistency).

---

## 3. Sitemap Audit (`public/sitemap.xml`)

Real routes derived from `src/App.jsx`, `src/data/projects.js`, `src/data/casestudies.js`:

| Type | Slug/Path |
|---|---|
| static | `/`, `/team`, `/why-us` |
| projects | `eliots-adventures`, `tourstodo-pr`, `tourstodo-crm`, `eliots-crm` |
| case-studies | `eliots-adventures`, `eliots-crm`, `tourstodo-website`, `tourstodopr` |
| excluded (correctly, not public content) | `/proposals/:slug`, `/invoices/:slug` |

Current sitemap contains 7 URLs. Comparison:

**Present and correct (7):**
- `/`
- `/case-studies/eliots-adventures`
- `/projects/eliots-adventures`
- `/case-studies/tourstodopr` ✓ (slug matches `casestudies.js` exactly — this one is *not* wrong, despite looking inconsistent next to `tourstodo-crm`)
- `/case-studies/eliots-crm`
- `/projects/eliots-crm`
- `/projects/tourstodo-crm`

**Missing (4):**
- `/why-us` — no static route entry at all
- `/team` — no static route entry at all
- `/projects/tourstodo-pr` — project exists in `projects.js`, has no sitemap entry
- `/case-studies/tourstodo-website` — case study exists in `casestudies.js`, has no sitemap entry

**Wrong:** none of the present URLs use an incorrect slug — the earlier suspicion that `tourstodopr` (no hyphen) was a typo is false; it correctly matches the case-study data file's slug. The actual bug is incompleteness, not incorrect slugs.

**Stale `lastmod`:** every single `<url>` entry uses `2026-06-22`, 49 days old as of today (2026-08-10), including the homepage — Google treats a sitemap-wide identical, unchanging `lastmod` as a weak/low-trust signal (it looks auto-generated once and forgotten rather than reflecting real content changes). Recommend either wiring `lastmod` to actual content/build dates, or dropping the `lastmod` field entirely if it can't be kept accurate (a missing `lastmod` is treated more favorably by Google than a stale/inaccurate one).

---

## 4. Missing Schema Opportunities

1. **BreadcrumbList** — add to `/projects/:slug` and `/case-studies/:slug` pages (e.g. Home > Projects > Eliot's Adventures). Cheap to inject at build/route level, still one of the few rich-result types Google actively renders in SERPs for this kind of hierarchical content.
2. **Organization schema with `logo`** — currently only `ProfessionalService` exists with no `logo`/`image`. Google's Knowledge Panel / Organization logo rich result requires a top-level `Organization` (or subtype like `ProfessionalService`, which qualifies) with a `logo` property pointing to a min. 112x112px image on a URL matching the site domain. Recommend adding:
   ```json
   "logo": "https://urawake.dev/logo.png"
   ```
   to the existing `ProfessionalService` block (site already has `/logo.png` referenced in `index.html`).
3. **Service pages** — the 5 `Offer`/`Service` entries in `hasOfferCatalog` have no dedicated URLs/pages. If dedicated `/services/:slug` pages are ever built, emit a `Service` schema per page with `provider: {"@id": "https://urawake.dev/#urawake-stackhouse"}`. Not urgent without the pages existing.
4. **FAQPage on `/why-us`** — per current policy, Google retired FAQ rich results for all sites (May 7, 2026), so this yields **no SERP benefit**. Optional, low-priority addition purely for GEO/AI-citation purposes if `/why-us` already contains genuine Q&A-style content — do not treat as an SEO priority.
5. **Graph consistency** — the ItemList's `CreativeWork` items and the client-injected `CreativeWork` schema should share stable `@id`s (e.g. `https://urawake.dev/case-studies/eliots-adventures#creativework`) so Google/LLMs can merge them into one entity rather than treating the homepage list and the case-study page as two disconnected claims about the same project.

---

## 5. Generated JSON-LD — Recommended Fixes

### A. Corrected ItemList (fix off-site URLs, drop orphaned entries, add stable @ids)
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Portfolio Projects | URAWAKE Stackhouse",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "item": {
      "@type": "CreativeWork",
      "@id": "https://urawake.dev/case-studies/eliots-adventures#creativework",
      "name": "Eliot's Adventures",
      "url": "https://urawake.dev/case-studies/eliots-adventures",
      "dateCreated": "2025-01-01",
      "description": "Full website and CRM for a family-run Puerto Rico tour and taxi service with tour listings, travel guides, and online booking.",
      "programmingLanguage": ["React", "Node.js", "PostgreSQL", "Stripe", "Heroku"],
      "creator": { "@id": "https://urawake.dev/#daniel-sangronis" },
      "sameAs": "https://www.eliotsadventures.com/"
    }},
    { "@type": "ListItem", "position": 2, "item": {
      "@type": "CreativeWork",
      "@id": "https://urawake.dev/case-studies/tourstodopr#creativework",
      "name": "ToursToDo PR",
      "url": "https://urawake.dev/case-studies/tourstodopr",
      "dateCreated": "2025-06-01",
      "description": "Marketing website for ToursToDo Puerto Rico with tour catalog, island guide content, and Stripe-powered booking flow.",
      "programmingLanguage": ["React", "Vite", "Stripe", "Vercel"],
      "creator": { "@id": "https://urawake.dev/#daniel-sangronis" }
    }},
    { "@type": "ListItem", "position": 3, "item": {
      "@type": "CreativeWork",
      "@id": "https://urawake.dev/projects/tourstodo-crm#creativework",
      "name": "ToursToDo CRM",
      "url": "https://urawake.dev/projects/tourstodo-crm",
      "dateCreated": "2025-09-01",
      "description": "Custom CRM managing leads, bookings, customer segments, email campaigns, and affiliate tracking with AI-powered lead qualification.",
      "programmingLanguage": ["React", "Node.js", "PostgreSQL", "SendGrid", "Heroku"],
      "creator": { "@id": "https://urawake.dev/#daniel-sangronis" }
    }}
  ]
}
```
Note: `ClientFlow`, `Fitness Tracker`, and `RollingLog` are omitted above pending confirmation they have real pages — if they do, add them back pointed at those URLs; if they don't, they should not be in this list at all.

### B. Organization logo (add to existing ProfessionalService block)
```json
"logo": "https://urawake.dev/logo.png",
"image": "https://urawake.dev/og-image-v2.png"
```

### C. BreadcrumbList (per project/case-study page, example for Eliot's Adventures case study)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://urawake.dev/" },
    { "@type": "ListItem", "position": 2, "name": "Case Studies", "item": "https://urawake.dev/#projects" },
    { "@type": "ListItem", "position": 3, "name": "Eliot's Adventures", "item": "https://urawake.dev/case-studies/eliots-adventures" }
  ]
}
```

### D. Corrected sitemap.xml (adds missing routes, drop or refresh lastmod)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://urawake.dev/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>
  <url><loc>https://urawake.dev/why-us</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://urawake.dev/team</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>

  <url><loc>https://urawake.dev/case-studies/eliots-adventures</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://urawake.dev/projects/eliots-adventures</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>

  <url><loc>https://urawake.dev/case-studies/eliots-crm</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://urawake.dev/projects/eliots-crm</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>

  <url><loc>https://urawake.dev/case-studies/tourstodopr</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://urawake.dev/projects/tourstodo-pr</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>

  <url><loc>https://urawake.dev/case-studies/tourstodo-website</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://urawake.dev/projects/tourstodo-crm</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
</urlset>
```
(`lastmod` removed rather than kept stale; re-add per-URL once it's wired to real content/build timestamps.)

---

## 6. Severity-Ranked Summary

**Critical**
1. Client-side-only injected `CreativeWork` schema on case-study/project pages is unreliable for indexing — no prerendering exists (`CaseStudyPage.jsx:60-74`). Recommend prerendering these routes.
2. `ItemList` items point `url` at a generic GitHub profile page instead of the site's own project/case-study pages (5 of 6 items affected) — undermines entity distinctness and wastes internal-linking value.
3. Sitemap is missing 4 real routes: `/why-us`, `/team`, `/projects/tourstodo-pr`, `/case-studies/tourstodo-website`.

**High**
4. `dateCreated` fallback of literal `"2026"` in `CaseStudyPage.jsx:69` is not ISO 8601 and is a fabricated date with no basis — should omit or source a real date instead.
5. Sitemap `lastmod` stale (all `2026-06-22`, 49 days old) and identical across every URL — a low-trust signal to Google; either fix or remove.
6. ItemList contains 3 items (`ClientFlow`, `Fitness Tracker`, `RollingLog`) with no corresponding real route — confirm these projects still exist or remove them.

**Medium**
7. `ProfessionalService` block missing `logo`/`image` — blocks Organization logo rich result / Knowledge Panel eligibility.
8. Client-injected `CreativeWork.author` restates a bare `Person` object instead of referencing `{"@id": "https://urawake.dev/#daniel-sangronis"}` — breaks graph consistency with the homepage entity.
9. No `BreadcrumbList` on project/case-study pages — cheap addition, still an active Google rich-result type.

**Info / low priority**
10. Existing `ProfilePage` type has no dedicated Google rich-result treatment — fine to keep for entity clarity/AI citation, don't expect SERP impact.
11. No `FAQPage` on `/why-us` — Google retired FAQ rich results entirely (May 2026); optional for GEO/AI visibility only, not an SEO gap.
12. `OfferCatalog.itemListElement[].item` (`Service` entries) lack `@id`/`url` — low priority until dedicated service pages exist.
