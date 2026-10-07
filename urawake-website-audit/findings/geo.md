# GEO / AI Search Readiness Audit — urawake.dev

Date: 2026-08-10

## GEO Health Score: 34 / 100

| Dimension | Weight | Score (0-100) | Weighted |
|---|---|---|---|
| Citability | 25% | 20 | 5.0 |
| Structural Readability | 20% | 25 | 5.0 |
| Multi-Modal Content | 15% | 15 | 2.25 |
| Authority & Brand Signals | 20% | 45 | 9.0 |
| Technical Accessibility | 20% | 15 | 3.0 |
| **Total** | | | **~34** |

The score is dragged down almost entirely by one root cause: **the site is a pure client-side-rendered SPA with no prerendering/SSG**, so every route except `/` is functionally invisible to non-JS AI crawlers. The homepage content is decent; everything behind React Router is not there at all from a crawler's point of view.

---

## 1. Critical finding: CSR blindspot (Technical Accessibility)

`index.html` ships an empty `#root` (a boot splash image) and loads the app via `<script type="module" src="/src/main.jsx">`. GPTBot, ClaudeBot, PerplexityBot, and OAI-SearchBot **do not execute JavaScript** — they fetch raw HTML only. `vite.config.js` has no prerender/SSG plugin (`vite-plugin-prerender`, `vite-plugin-ssr`, Astro, etc. all absent), and `package.json`'s build script is a plain `vite build`.

What non-JS crawlers actually receive for **every URL on the site** (`/`, `/why-us`, `/team`, `/case-studies/*`, `/projects/*`) is the same static `index.html` shell:
- Full `<head>` (title, meta description, OG/Twitter tags, 5 JSON-LD blocks — good, see §4)
- One generic `<noscript>` block containing: an H1, one paragraph, a 5-item services list, a 6-item portfolio list (one-line descriptions only), and contact links

Because client-side routing means the server (or static host) returns this same `index.html` for `/why-us`, `/case-studies/eliots-adventures`, etc. (no per-route SSR), **AI crawlers cannot distinguish routes at all** — they only ever see the homepage `<noscript>` fallback, regardless of which URL they hit. This is worse than "thin content" — it's effectively **duplicate/generic content across every indexed URL**, which sitemap.xml lists 6 of.

Ironically, `src/data/casestudies.js` (read for this audit) shows the case-study content itself is exactly the kind of long-form, structured, quotable writing AI answer engines want (headed sections: "The client," "The problem," "What we built," "The results," "Key integrations"; concrete stats like "100+ bookings," "~20 hours/month automated," "130+ waivers digitized"). **None of it is reachable by a non-JS crawler.** The Eliot's Adventures case study text even states that *that* site is prerendered for SEO — urawake.dev itself is not, which is the core irony of this audit.

**Fix**: adopt SSG/prerendering for the portfolio site itself (e.g., migrate to Astro/Next static export, or add `vite-plugin-prerender` / `react-snap` to bake per-route static HTML at build time, mirroring what was already done for the Eliot's Adventures client site). Effort: Medium-High (1-3 days depending on approach), Impact: Highest of any single fix available.

---

## 2. robots.txt — Good

```
User-agent: *          Allow: /
User-agent: GPTBot      Allow: /
User-agent: ClaudeBot   Allow: /
User-agent: PerplexityBot Allow: /
User-agent: OAI-SearchBot Allow: /
Sitemap: https://urawake.dev/sitemap.xml
```

All four priority AI crawlers explicitly allowed. No `CCBot`/`anthropic-ai`/`cohere-ai` training-crawler rules present (optional, not a real gap). **No action needed** — though this permissive config only matters once there's actual per-route HTML for those crawlers to fetch (see §1).

---

## 3. llms.txt — Present but stale and incomplete

`public/llms.txt` exists, is well-formatted (H1 + H2 Q&A-style sections, a "Projects" list, "Contact"), and its content lines up reasonably well with the site's positioning. Problems:

- **Missing URLs entirely**: it lists no links to `/case-studies/*` or `/why-us`. Every project entry links out to the *live client site or GitHub* instead of to urawake.dev's own case-study pages — so an LLM reading llms.txt has no path back into the case-study content at all.
- **Stale/incomplete project list**: llms.txt lists 6 projects (Eliot's Adventures, ToursToDo PR, ToursToDo CRM, ClientFlow, Fitness Tracker, RollingLog) but `casestudies.js` actually has 4 real case-study entries with different slugs (`eliots-adventures`, `eliots-crm`, `tourstodo-website`, `tourstodopr`) and richer narrative content (metrics, multi-section case studies) that isn't reflected — llms.txt reads like an earlier/simpler content model than what's now live.
- No `/why-us` or `/team` page summarized despite both being live routes (`src/App.jsx` lines 83-84).
- No RSL 1.0 licensing block present (not present, not necessarily expected at this stage, but worth flagging as a future differentiator since RSL adoption is still low — low priority).
- No last-updated/date field, so freshness can't be verified by a crawler or by us; file reads as written earlier than the case-studies content model (dates in `casestudies.js` reference "Feb to Jun 2026" projects, "In progress" status).

**Fix**: rewrite llms.txt to (a) link directly to each `/case-studies/<slug>` URL, (b) add `/why-us` and `/team` sections, (c) pull in the actual case-study metrics (100+ bookings, ~20 hrs/month automated, 130+ waivers) as citable stats, (d) add a last-updated date. Effort: Low (1-2 hours). Impact: Medium — but capped until §1 is fixed, since llms.txt guides crawlers to URLs that currently return no unique content.

---

## 4. sitemap.xml — Incomplete and inconsistent

Contains 6 URLs: `/`, `/case-studies/eliots-adventures`, `/projects/eliots-adventures`, `/case-studies/tourstodopr`, `/case-studies/eliots-crm`, `/projects/eliots-crm`, `/projects/tourstodo-crm`.

Gaps found by cross-referencing `src/App.jsx` routes and `src/data/casestudies.js` slugs:
- **Missing `/case-studies/tourstodo-website`** entirely (the 4th case study, "Tours ToDo Website," is absent from the sitemap even though the route and content exist).
- **Missing `/why-us`** and **`/team`** — both live routes, both zero mentions in sitemap.xml.
- `/projects/tourstodo-crm` slug doesn't match any case-study slug in `casestudies.js` (closest is `tourstodopr`) — likely a stale/orphaned or mismatched entry pointing at a `ProjectPage` that may 404 or mismatch content.
- All `lastmod` dates are identical (`2026-06-22`) across every URL, which suggests the sitemap isn't being regenerated per-change and undercuts freshness signaling.

**Fix**: regenerate sitemap to include all 4 case studies plus `/why-us` and `/team`, verify `/projects/*` slugs match `casestudies.js`/`projects.js`, and update `lastmod` per actual content change. Effort: Low (30-60 min, ideally scripted into the build). Impact: Medium.

---

## 5. Citability (25% weight) — Score 20/100

Because §1 means none of this is reachable by non-JS crawlers today, this section scores the *content quality* of what exists in source, with the caveat that it's currently worth ~0 in practice.

- Case-study section bodies in `casestudies.js` run long — several paragraphs per section, often well above the 134-167 word "optimal passage" sweet spot for AI citation (e.g., "What we built" sections run 150-250+ words across 3-4 paragraphs). These read well for humans but are not broken into self-contained, independently-citable 134-167 word blocks with a direct answer in the first 40-60 words.
- Headings are declarative ("The client," "The problem," "What we built," "The results") rather than question-based. None match the pattern of a query an AI would be answering (e.g., "How did URAWAKE automate booking intake for a Puerto Rico tour operator?").
- Good: concrete, source-attributable stats exist and are reused consistently ("100+ bookings," "~20 hours/month automated," "130+ waivers digitized," "389 commits," "32 data models," "8 external integrations") — these are exactly the kind of citable facts AI Overviews/Perplexity like to quote, if crawlers could reach them.
- The homepage `<noscript>` content (the only thing reachable) is short, generic, and not question-structured — one paragraph, then list items with no elaboration.

**Fix**: once §1 is resolved, restructure each case-study section to open with a direct 1-2 sentence answer, keep passages closer to 134-167 words per extractable block, and convert 2-3 headings per case study to question form. Effort: Medium. Impact: High, but sequenced behind §1.

---

## 6. Structural Readability (20%) — Score 25/100

- JSON-LD is strong: `ProfilePage`, `Person`, `WebSite`, `ProfessionalService` (with `OfferCatalog`), and an `ItemList` of 6 `CreativeWork` portfolio entries are all present in `index.html`'s `<head>` — this is genuinely good entity/authority markup and is one of the few things scoring well.
- However, structured data only describes the homepage/organization — there is **no per-case-study structured data** (no `Article`/`CreativeWork` schema rendered on `/case-studies/*` routes, because those routes never render server-side at all — see §1).
- No FAQ schema, no HowTo schema despite case-study "What we built" sections being effectively how-it-was-built narratives.
- H1/H2 hierarchy inside `casestudies.js` is flat declarative labels, not scannable question-based subheads (noted in §5).

---

## 7. Multi-Modal Content (15%) — Score 15/100

- No indication of video (YouTube embeds/links), which is the single strongest brand-mention correlation signal (~0.737) for AI citation per the GEO scoring model — none found in `casestudies.js`, `index.html`, or llms.txt.
- No podcast/audio content.
- Images referenced (`logo.png`, `og-image-v2.png`, favicons) are branding/OG assets, not explanatory diagrams, screenshots of the actual products, or before/after visuals that would strengthen citability for a "show me the CRM" type query.

**Fix**: publish a short YouTube walkthrough of the Eliot's Adventures CRM or ToursToDo booking flow and link it from the relevant case study — highest-leverage single addition per the brand-correlation data. Effort: Medium (needs recording + editing). Impact: High.

---

## 8. Authority & Brand Signals (20%) — Score 45/100

- `sameAs` in the `Person` JSON-LD correctly links GitHub and LinkedIn — good entity consolidation.
- **No Wikipedia entity** — expected at this stage for an individual/early studio, not a near-term fix, but caps entity-authority score structurally.
- **No evidence of Reddit presence** in any project file (no subreddit links, no r/webdev-style social proof referenced) — Reddit presence is called out as "High" correlation and is currently a total gap.
- **No YouTube channel/videos** (see §7) — the strongest correlation signal in the entire framework is entirely absent.
- LinkedIn is present (`sameAs`) but not verified for activity/content depth from this audit — worth checking post-write whether the profile itself references URAWAKE Stackhouse and the named case-study clients, to reinforce entity consistency between urawake.dev and LinkedIn.
- Entity naming is **mostly consistent**: "Daniel Sangronis" and "URAWAKE Stackhouse" are used identically across `index.html` JSON-LD, `llms.txt`, and `casestudies.js` — no variant-name fragmentation found. This consistency is the main reason this dimension scores above the others.
- Domain Rating/backlinks weren't checked in this audit (no live crawl of external backlink data) — flagged as the weakest correlation signal (~0.266) anyway, so not a priority even if low.

**Fix priority**: create even a minimal YouTube presence (screen-recorded product walkthroughs) and seed a Reddit presence (e.g., a build-in-public post in a relevant subreddit linking to a case study) — both would move this from 45 toward 70+ given the correlation weights. Effort: Medium. Impact: High.

---

## Top 5 Highest-Impact Changes (severity-ranked)

1. **[Critical / High effort] Add SSG or prerendering for urawake.dev itself.** Right now every route beyond `/` is invisible to GPTBot/ClaudeBot/PerplexityBot; this single fix unlocks every other recommendation in this report. Effort: 1-3 days.
2. **[High / Low effort] Rewrite llms.txt** to link to actual `/case-studies/<slug>` URLs, add `/why-us` and `/team`, include current case-study metrics, and add a last-updated date. Effort: 1-2 hours.
3. **[High / Low effort] Fix sitemap.xml**: add the missing `tourstodo-website` case study, `/why-us`, `/team`; correct/verify `projects/tourstodo-crm` slug mismatch; refresh `lastmod` dates. Effort: 30-60 min.
4. **[Medium-High / Medium effort] Restructure case-study copy for citability**: open sections with a direct answer, trim to ~134-167 word extractable blocks, convert declarative headings to question form. Sequence after #1. Effort: 0.5-1 day.
5. **[High / Medium effort] Publish video content and seed a Reddit presence** to capture the two strongest brand-mention correlation signals (YouTube ~0.737, Reddit "High"), currently both at zero. Effort: 1-2 days for first video + posts.

---

## Platform-Specific Estimated Scores

| Platform | Est. Score (0-100) | Rationale |
|---|---|---|
| Google AI Overviews | 30 | Google can still crawl/render JS reasonably well via its indexer, so homepage + some rendered content may surface, but case-study depth is still gated by client routing and thin per-page metadata. |
| ChatGPT / OAI-SearchBot | 15 | GPTBot/OAI-SearchBot do not render JS; sees only the generic noscript block for all routes — lowest practical visibility. |
| Perplexity | 15 | PerplexityBot does not render JS; same constraint as ChatGPT. |
| Bing Copilot | 25 | Bingbot has partial JS rendering capability, similar caveat to Google but generally lags it; still constrained by lack of per-route content and thin structured data outside the homepage. |

*(Estimates are structural/heuristic based on known crawler JS-execution behavior and the technical findings above — not derived from live DataForSEO or ChatGPT-scraper calls, which were not available/run in this audit.)*
