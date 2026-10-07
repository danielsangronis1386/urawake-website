# Content Quality & E-E-A-T Audit — URAWAKE Stackhouse (https://urawake.dev/)

**Date:** 2026-08-10
**Method:** Source review (SPA — no rendered fetch), `src/data/casestudies.js`, `src/data/projects.js`, `src/components/WhyUsPage`, `src/components/AboutSection`, `src/components/CaseStudyPage`, `src/components/ProjectPage`, `public/llms.txt`, `index.html` `<noscript>` block.
**Previous score (2026-06-21 FULL-AUDIT-REPORT.md):** 40/100, "zero content pages."

## Content Quality Score: 61 / 100

Material improvement since the last audit — the 4 case studies are the single biggest driver. Score is capped by: one case study still being placeholder/draft copy, zero testimonials/third-party validation anywhere on the site, thin duplicate content on `/projects/:slug`, and the fact none of this is server-rendered (raw HTML crawl still sees nothing — that's a Technical finding, but it directly caps how much of this good content actually gets indexed/cited).

---

## Severity-Ranked Findings

### CRITICAL

**1. One of four case studies is unfinished placeholder copy, shipped live**
- `src/data/casestudies.js` lines 105-140, slug `tourstodo-website`. The source comment literally says: *"DRAFT: placeholder copy... Every claim here is drawn from the build itself; no outcome numbers, because none have been measured yet. Daniel to rewrite with the real story and results."*
- Body word count: **149 words across 3 sections** (vs. 411-541 for the other three). No "results" section at all — the page structurally implies results but never delivers them.
- This is exactly the kind of low-effort, low-specificity content the Sept 2025 QRG flags. It sits on an indexable URL (`/case-studies/tourstodo-website`) and is linked from `/projects/tourstodo-pr`, so it's fully exposed to raters and crawlers, not just internal draft state.
- **Fix:** either finish it with real specifics (even qualitative — "what changed for the traveler," screenshots, a client quote) or unpublish the route until it's ready. Shipping a page you already know is a placeholder is a self-inflicted E-E-A-T wound.

**2. Zero testimonials, reviews, or third-party validation anywhere on the site**
- Searched all components and data files: no client quotes, star ratings, review embeds, or named client attributions ("According to [Client Name]..."). Case studies describe what URAWAKE built and the metrics achieved, but never quote the client in their own words.
- Trustworthiness is 30% of E-E-A-T weight and this is the single largest lever missing. AI answer engines (ChatGPT, Perplexity, Gemini) strongly prefer citing content with attributable, quotable third-party statements over vendor-authored claims about itself.
- **Fix:** Add at least one direct quote per case study from the actual client (Eliot's Adventures, ToursToDo PR), attributed by name/role. Even 2-3 sentences with a name and title is a major E-E-A-T and AI-citation upgrade over none.

### HIGH

**3. `/projects/:slug` pages substantially duplicate the case study content — thin/duplicate content risk**
- `ProjectPage.jsx` renders a single `description` field (1 paragraph, ~40-50 words) per project plus stack tags and a link to the fuller case study. This is not duplicate in the sense of copy-pasted text (good), but it is **thin**: a title, one-sentence tagline, one paragraph, and a tag list — well under any topical-coverage floor, existing mainly as a gallery/lightbox wrapper around images.
- Two of the four projects (`tourstodo-pr`, `eliots-crm`) have **no `liveUrl`** at all — meaning the page is just a description + case study link, ~60-80 words of unique text total.
- Because every `/projects/:slug` page links to `/case-studies/:slug` covering the same subject in far more depth, Google may see these as near-duplicate/low-value satellite pages competing with the case study for the same query intent, diluting rather than reinforcing topical authority.
- **Fix:** Either (a) collapse `/projects/:slug` into the case study route with `rel=canonical` pointing to the case study, since the project viewer is really a lightbox for the gallery, not a distinct content asset, or (b) give each project page unique value the case study doesn't have (e.g., a longer tech walkthrough, architecture diagram, code snippet) to justify a separate indexable URL.

**4. WhyUsPage and AboutSection (Team) are well below topical-coverage floors for their page type**
- `/why-us`: 4 reason blocks, each ~40-60 words = **roughly 200-250 words total** body copy. For a page whose job is to be a primary trust/differentiation asset for prospective clients, this is thin relative to the 800-word service-page floor (this functions more like a service/positioning page than a homepage).
- `/team` (`AboutSection`): Daniel's bio is ~150 words across 3 paragraphs; Janyerlyn's is ~70 words. Combined **~220 words**. No case-study links, no credentials/certifications, no years-of-experience framing beyond "started building in late 2025" (see Finding 6).
- Neither page is a wall-of-text problem — the terse, high-signal copy fits the site's design language — but from a pure topical-coverage standpoint there's room to add substance (e.g., WhyUs could fold in 1-2 concrete proof points per reason, linking to the relevant case study) without hurting the design.
- **Fix:** Add one concrete, linkable proof point (case study reference, specific number, or client quote) to each of the 4 WhyUs reasons. This also directly improves AI-citation readiness (see Finding 7).

### MEDIUM

**5. AI citation readiness is decent but inconsistent across content types**
**What works well:**
- `llms.txt` is clean, well-structured Q&A with clear entity definitions (who, what, where, contact) — genuinely good AI-crawler feed.
- Case study sections use clear H2 headings ("The client," "The problem," "What we built," "The results") — this heading pattern is highly extractable/quotable by LLMs (a consistent problem→solution→outcome structure is exactly what answer engines like to lift).
- Case studies contain specific, quotable numbers: "100+ bookings," "~20 hours/month automated," "130+ waivers digitized," "389 commits," "32 data models and 8 external integrations." These are the kind of concrete facts AI Overviews and chat answers cite verbatim.

**What's missing:**
- No FAQ content anywhere on the site (WhyUs, Team, case studies) — FAQ-formatted content is one of the highest-yield formats for AI citation and currently absent outside the ToursToDo project's own island-guide FAQ (which isn't part of this codebase).
- No structured data (JSON-LD) on `/why-us`, `/team`, or `/projects/:slug` — only `CaseStudyPage.jsx` injects `CreativeWork` schema dynamically via `useEffect`. Since schema is set client-side after mount, it's invisible to any crawler that doesn't execute JS (compounds the Technical SPA issue already flagged).
- The repeated 4-section case study structure (client/problem/built/results) is good for consistency but risks reading formulaic across all four studies if a rater or LLM sees them side by side — mitigated somewhat by genuinely different details per client, but worth watching as more case studies are added.

**6. Weak experience/expertise signals: "started building in late 2025" undercuts authority**
- `AboutSection.jsx` bio states: *"I started building in late 2025 and have spent the last year turning that into real client work."* `llms.txt` repeats: *"He started building in late 2025."*
- Per the current date context (2026-08-10) this reads as under one year of experience, stated plainly and prominently. This is honest and consistent (good trust signal — no inflation), but it's also a real Expertise-factor headwind for a "full-stack dev studio" positioning against competitors with longer track records.
- **Fix (framing, not fabrication):** Lean harder into depth-of-output rather than tenure — the case studies already do this well (389 commits, 32 data models, 8 integrations, 100+ bookings). Consider adding a "why a newer studio can still be trusted" angle to WhyUs (e.g., direct founder access, no agency overhead, both cofounders hands-on) rather than letting tenure sit as the lead framing in the bio.

**7. Keyword targeting for "LA full-stack dev studio for tourism/hospitality SMBs" is present but concentrated in only 2-3 places**
- `llms.txt` and `AboutSection` bio both hit the target positioning cleanly: "Los Angeles," "small businesses and startups," "tourism and hospitality," "full-stack." Good, natural (not stuffed) phrasing.
- However, `WhyUsPage` — the page most likely to target competitive commercial-intent queries — never mentions "Los Angeles" or "full-stack" at all, and only reason #4 touches tourism/hospitality. Case study `industry`/`location` fields ("Tourism & Hospitality," "Puerto Rico") are strong for the case studies themselves but the client base is Puerto Rico-based, which slightly muddies a pure "LA studio" narrative — worth being aware of if targeting LA-based hospitality prospects specifically, since none of the four proof points are LA businesses.
- **Fix:** Add a one-line geo/industry anchor to the WhyUs header or reason #4 (e.g., "Based in Los Angeles. Built for tour operators and hospitality brands anywhere.") to reinforce the target query pattern on the page most likely to convert commercial-intent traffic.

### LOW

**8. No dates of publication/update on case studies or WhyUs/Team content**
- Case studies have a project `duration` field (e.g., "4 months (Feb to Jun 2026)") but no explicit "published" or "last updated" date rendered on the page or in schema beyond the auto-derived `dateCreated` in `CaseStudyPage.jsx` (regex-parsed from `duration`, which is fragile — e.g., `tourstodopr`'s duration is "In progress, CRM in production" with no month/year, so `dateCreated` falls back to a hardcoded `"2026"`).
- Freshness signals matter for both classic SEO and AI-citation recency weighting.
- **Fix:** Add explicit `datePublished`/`dateModified` fields to each case study object rather than deriving them from free-text `duration`.

---

## E-E-A-T Breakdown

| Factor | Weight | Score | Notes |
|---|---|---|---|
| Experience | 20% | 60/100 | Case studies show genuine first-hand build detail (specific integrations, architecture decisions, numbers) — strong signal. Undercut by explicit "started building in late 2025" framing and one placeholder case study with no real outcome data. |
| Expertise | 25% | 55/100 | Technical specificity in case studies (stack, integrations, data model counts) reads credible and non-generic. No certifications, no external technical writing/blog, no code samples shown publicly beyond GitHub link. Founder bio is thin on demonstrated expertise beyond "I build things." |
| Authoritativeness | 25% | 35/100 | No third-party citations, no press mentions, no backlinks apparent, no testimonials, no case study co-signed/verified by the client. GitHub and LinkedIn links exist but aren't proof of authority on their own. This is the weakest E-E-A-T factor. |
| Trustworthiness | 30% | 55/100 | Contact info present (email, `<noscript>` fallback, llms.txt). No privacy policy, no terms page found in repo. No testimonials/reviews (a major trust gap for a services business). Duration/dates inconsistent (one case study has no real timeline). Honest framing (no inflated claims, "In progress" labeled as such) is a genuine trust positive. |

**Weighted E-E-A-T:** (60×.20)+(55×.25)+(35×.25)+(55×.30) = 12+13.75+8.75+16.5 = **51/100**

## AI Citation Readiness Score: 58 / 100

- Strong: consistent H2 problem/solution/outcome structure in case studies, specific quotable metrics, clean `llms.txt`.
- Weak: schema injected client-side only (invisible to non-JS crawlers), no FAQ content, no testimonials/quotable third-party statements, one case study lacking any outcome data to cite, WhyUs/Team pages too sparse to be a reliable citation source for positioning questions.

---

## Recommendations, Priority Order

1. Finish or unpublish the `tourstodo-website` case study — currently the clearest low-quality-content risk on the site.
2. Add at least one named client testimonial/quote to each real case study (Eliot's Adventures, ToursToDo PR/CRM).
3. Decide the fate of `/projects/:slug` vs `/case-studies/:slug` — canonicalize or differentiate to remove thin/near-duplicate content risk.
4. Add explicit `datePublished`/`dateModified` to case study data instead of deriving dates from free-text `duration`.
5. Add a short FAQ block (WhyUs or a dedicated FAQ page) — highest-leverage, lowest-effort AI-citation improvement available.
6. Reinforce "Los Angeles" + "tourism/hospitality" positioning on `/why-us`, the page currently missing both anchors.
7. Move case study schema injection to build time or a prerender step so it's visible to non-JS crawlers (cross-reference Technical SEO findings on SPA rendering).
