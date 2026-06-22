# SEO Audit — URAWAKE Stackhouse
**URL:** https://urawake-website.vercel.app/
**Date:** 2026-06-21
**Business Type:** Freelance Developer Portfolio / Agency
**Auditor:** Claude SEO

---

## SEO Health Score: 61 / 100

| Category | Score | Weight | Weighted |
|----------|-------|--------|---------|
| Technical SEO | 55/100 | 22% | 12.1 |
| Content Quality | 40/100 | 23% | 9.2 |
| On-Page SEO | 65/100 | 20% | 13.0 |
| Schema / Structured Data | 88/100 | 10% | 8.8 |
| Performance (CWV) | 70/100 | 10% | 7.0 |
| AI Search Readiness | 80/100 | 10% | 8.0 |
| Images | 50/100 | 5% | 2.5 |
| **TOTAL** | | | **60.6 → 61** |

---

## Executive Summary

URAWAKE Stackhouse is a single-page React app deployed on a Vercel subdomain. The schema
implementation is genuinely strong (ProfilePage, Person, ProfessionalService, ItemList with
6 projects), and AI crawler access is well configured. However, two structural blockers
prevent this site from ranking: (1) **no custom domain** — zero domain authority accumulates
on a `.vercel.app` subdomain, and (2) **fully JS-rendered content** — Google's initial HTML
fetch returns nothing crawlable. These two issues alone cap the ceiling of any other SEO work.

### Top 5 Critical Issues
1. No custom domain — hosting on `urawake-website.vercel.app`
2. SPA with no server-side rendering — all content invisible to first HTML crawl
3. OG image is SVG format — broken social sharing on Twitter/Facebook/LinkedIn
4. Zero content pages — no blog, no case studies, no indexable text beyond the homepage
5. Meta description is 165 chars — truncated in SERPs (limit: 160)

### Top 5 Quick Wins
1. Fix OG image to PNG/JPG (1200×630) — 30 min, fixes all social sharing immediately
2. Trim meta description to ≤160 chars — 5 min
3. Register a custom domain (e.g. `urawakestackhouse.com`) — sets the SEO foundation
4. Add `<noscript>` fallback content so crawlers get something without JS
5. Submit URL to Google Search Console and request indexing

---

## Technical SEO — 55/100

### What Works
- ✅ robots.txt allows all crawlers including AI bots (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot)
- ✅ Sitemap.xml exists and is referenced in robots.txt
- ✅ Canonical URL set correctly
- ✅ `lang="en"` on `<html>`
- ✅ HTTPS with HSTS (`max-age=63072000; includeSubDomains; preload`)
- ✅ X-Frame-Options: DENY
- ✅ X-Content-Type-Options: nosniff
- ✅ CSP header present
- ✅ Fast TTFB: 0.135s

### Findings

**CRITICAL — No Custom Domain**
- Observation: Site lives on `urawake-website.vercel.app`. No custom domain detected.
- Why it matters: Google treats `.vercel.app` as a shared subdomain. Domain Authority (DA), backlinks, and crawl budget don't transfer if you ever move. You can't rank competitively without owning your domain.
- Fix: Register `urawakestackhouse.com` or `urawake.studio` or similar. Point it to Vercel. Update canonical, OG tags, sitemap, schema `@id` URLs.
- How to know it worked: GSC shows the custom domain indexed; no more `.vercel.app` in search results.

**CRITICAL — SPA With No SSR/SSG**
- Observation: Raw HTML response contains only a `<div id="root"></div>`. All content — H1, section text, project descriptions — is rendered client-side by React.
- Why it matters: Google's crawler fetches the raw HTML first. On the initial crawl, it sees an empty page. While Googlebot does execute JS in a second pass, this delays indexing by days or weeks per crawl cycle. Bing and most other crawlers don't execute JS at all.
- Fix options (in order of impact):
  1. **Pre-rendering**: Add `vite-plugin-ssg` or `@prerenderer/plugin-vite` to generate static HTML at build time
  2. **Noscript fallback**: Add a `<noscript>` tag in `index.html` with core text content (name, services, contact)
  3. **Migrate to Next.js or Astro** for full SSR/SSG (bigger lift, highest SEO ceiling)
- How to know it worked: `curl https://yourdomain.com/` returns visible text content in raw HTML.

**HIGH — Missing Referrer-Policy and Permissions-Policy Headers**
- Current headers: CSP ✓, HSTS ✓, X-Frame ✓, X-Content-Type ✓
- Missing: `Referrer-Policy`, `Permissions-Policy`
- Fix: Add to `vercel.json` headers config.

**MEDIUM — Sitemap Only Has 1 URL**
- The sitemap is technically correct for a SPA. But if section anchors or future pages are added, update accordingly.
- `lastmod: 2026-06-16` — update after each significant content change.

---

## Content Quality — 40/100

### What Works
- ✅ llms.txt exists with clear, well-structured Q&A content
- ✅ Bio text clearly states specialty, location, and target client
- ✅ Portfolio projects listed with descriptions and tech stacks

### Findings

**CRITICAL — Zero Indexable Content in Raw HTML**
- Observation: The body of the raw HTML response is `<div id="root"></div>`. No headings, paragraphs, or text visible to crawlers that don't run JS.
- First-principle: Google can only rank content it has confirmed it can read. If content is only JS-rendered, it exists in a crawl probability state — sometimes indexed, often delayed, sometimes never.
- Fix: Pre-render or add noscript fallback (see Technical section).

**HIGH — No Blog or Long-Form Content**
- Observation: The site has zero content pages beyond the single-page portfolio.
- Why it matters: The queries that bring clients — "full stack developer Los Angeles", "React developer for small business", "tourism website development", "custom CRM developer" — are answered by content (blog posts, case studies, guides), not portfolios.
- Fix: Add 4–6 case study pages (one per major project) with 800–1200 words covering the problem, solution, tech stack, and outcome. Each page = a new indexable URL.
- Leading indicator: GSC impressions for long-tail queries go from 0 to any number > 0 within 60 days of publishing.

**HIGH — No Individual Project Pages**
- Observation: All 6 projects are on the same URL (hash-based or scroll sections). Each project has no dedicated URL.
- Fix: Create `/projects/eliots-adventures`, `/projects/clientflow`, etc. Each gets its own title, meta, schema, and content.

**MEDIUM — E-E-A-T Signals Minimal**
- No testimonials, no client logos, no published dates on projects, no press mentions.
- Fix: Add one or two client quotes. Add "Built for [Client Name]" with a link to the live site. Schema already has `dateCreated` — make sure it matches visible content.

---

## On-Page SEO — 65/100

### What Works
- ✅ Title tag: "Daniel Sangronis — Full Stack Web Developer | URAWAKE Stackhouse" (68 chars) — well-structured
- ✅ Meta description present
- ✅ Canonical set

### Findings

**HIGH — No H1 in Raw HTML**
- Observation: Zero `<h1>` tags found in raw HTML. The "URAWAKE" glitch title is a JS-rendered `<h1>` inside the React component.
- Fix: Even with the SPA, add a static `<h1>` to the raw `index.html` inside a `<noscript>` block, or pre-render. Google's JS-rendered H1 carries less weight than an H1 in raw HTML.

**MEDIUM — Meta Description 165 Characters (Over Limit)**
- Current: "Full-stack web development by Daniel Sangronis. React, Node.js, Django, PostgreSQL. Custom websites and digital tools for small businesses across the United States."
- 165 chars → truncated in SERPs at ~160.
- Fix: "Full-stack web development by Daniel Sangronis. React, Node.js, Django, PostgreSQL — custom websites and digital tools for US small businesses." (143 chars)

**MEDIUM — OG Title vs Page Title Mismatch**
- Page title: "Daniel Sangronis — Full Stack Web Developer | URAWAKE Stackhouse"
- OG title: "URAWAKE Stackhouse — Full-Stack Web Developer"
- While not a ranking factor, consistency matters for brand signal.

**LOW — No Twitter/X Card Creator Attribution**
- Add `<meta name="twitter:creator" content="@yourhandle">` if you have a Twitter/X account.

---

## Schema / Structured Data — 88/100

### What Works
- ✅ ProfilePage schema with @id
- ✅ Person schema with sameAs (LinkedIn, GitHub)
- ✅ WebSite schema
- ✅ ProfessionalService schema with areaServed, priceRange, hasOfferCatalog
- ✅ ItemList of 6 CreativeWork portfolio projects with dateCreated, description, programmingLanguage
- ✅ Nested @id cross-references between entities (Person → ProfessionalService → WebSite)

### Findings

**MEDIUM — ProfessionalService Missing telephone and address**
- Google uses phone and address for local signals even for remote businesses.
- If you're comfortable listing an LA address or phone, add it. At minimum, add `"address": {"@type": "PostalAddress", "addressLocality": "Los Angeles", "addressRegion": "CA", "addressCountry": "US"}`.

**MEDIUM — CreativeWork Missing url for 5 of 6 Projects**
- Only `Eliot's Adventures` has a `"url"` field. The other 5 projects have no URL.
- Fix: Add URLs where available (even if GitHub links). Increases entity richness for AI search.

**LOW — No BreadcrumbList**
- Not critical for a SPA, but if you add project pages, add breadcrumb schema.

**LOW — No Review/AggregateRating Schema**
- If any clients would leave a testimonial, a `Review` on the ProfessionalService unlocks star ratings in some SERP contexts.

---

## Performance — 70/100

### What Works
- ✅ TTFB: 0.135s — excellent (Vercel CDN edge delivery)
- ✅ Static assets served from CDN with cache-control
- ✅ Fonts from Google Fonts CDN

### Findings
PageSpeed Insights API returned no metric data (likely due to API rate limit without key). Estimated scores based on site architecture:

**MEDIUM — SPA JavaScript Bundle Load**
- React SPA with 120-scanline glitch animation, multiple sections, and animations likely produces a large JS bundle.
- Fix: Check bundle size with `vite build --mode production` output. Aim for <200KB gzipped JS.
- Lazy-load sections below the fold. The glitch animation (120 scanlines × 7 letters = 840 DOM nodes) may block LCP.

**MEDIUM — Glitch Animation Performance**
- The GlitchTitle component creates 840+ span elements (120 scanlines × 7 letters) plus 2 channel layers each. This is a significant DOM size for the hero section.
- Consider reducing SCANLINES to 40-60 or using CSS animations instead of JS-driven per-frame updates.

**LOW — OG Image Is SVG**
- `og:image: https://urawake-website.vercel.app/og-image.svg`
- Facebook, Twitter/X, LinkedIn, and WhatsApp do not render SVG as OG images. Your link previews will show no image or a broken image on every social share.
- Fix: Generate a 1200×630 PNG from the SVG. Update all OG/Twitter image meta tags.
- How to know it worked: Use [Facebook Debugger](https://developers.facebook.com/tools/debug/) and Twitter Card Validator on your URL — both should show the image preview.

---

## AI Search Readiness — 80/100

### What Works
- ✅ `llms.txt` exists with clear FAQ-style Q&A
- ✅ robots.txt explicitly allows GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot
- ✅ ProfessionalService schema with structured service descriptions
- ✅ Person schema with sameAs links to LinkedIn and GitHub (entity resolution)
- ✅ `areaServed: "United States"` clearly scopes the service geography

### Findings

**MEDIUM — llms.txt Incomplete for Project Context**
- The projects section in `llms.txt` starts ("### Eliot's Adventures") but the file is truncated — no project descriptions or links appear after the heading.
- Fix: Complete the projects section in llms.txt with URL, description, and tech stack for each project.

**MEDIUM — No Blog Content for AI Citation**
- AI Overviews and ChatGPT cite specific passages from published content. Without any articles, case studies, or guides, there's no passage to cite.
- The `llms.txt` helps for direct brand mentions but doesn't replace indexable page content for AI-generated answers about "web developers in LA" or "React developer for hospitality businesses."

**LOW — No Speakable Schema**
- For voice/AI-summary contexts, `Speakable` schema marks up which page content is most suitable for summarization. Optional but increasingly useful.

---

## Images — 50/100

**CRITICAL — OG Image in SVG Format**
- Social platforms (Facebook, Twitter/X, LinkedIn, WhatsApp, iMessage) do not display SVG images in link previews.
- Every time someone shares `urawake-website.vercel.app`, the preview card shows no image.
- Fix: Export `og-image.png` (1200×630, PNG, <1MB) and update meta tags.

**INFO — No Images in HTML**
- The site uses CSS/text-only design (brutalist aesthetic). No `<img>` tags visible in raw HTML.
- This means no image alt text issues — but also no visual content for Google Image Search.

---

## Action Plan

### Phase 1 — Critical Fixes (This Week)

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 1 | Register custom domain + point to Vercel | 2h | Critical |
| 2 | Fix OG image: export PNG 1200×630 | 30min | High |
| 3 | Trim meta description to ≤160 chars | 5min | Medium |
| 4 | Add `<noscript>` fallback with name, services, contact | 1h | High |
| 5 | Complete llms.txt project descriptions | 30min | Medium |

### Phase 2 — High Impact (Weeks 2–3)

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 6 | Add Referrer-Policy + Permissions-Policy headers in vercel.json | 30min | Medium |
| 7 | Add `"address"` to ProfessionalService schema | 15min | Medium |
| 8 | Add `"url"` field to 5 missing CreativeWork items in schema | 20min | Low |
| 9 | Set up Google Search Console + submit sitemap | 1h | High |
| 10 | Add Google Analytics or Plausible for traffic baseline | 1h | Medium |

### Phase 3 — Content & Authority (Month 2)

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 11 | Write 2 case study pages (Eliot's Adventures + ToursToDo CRM) | 3–4h each | High |
| 12 | Add `telephone` to ProfessionalService schema | 10min | Low |
| 13 | Add client testimonial + Review schema | 1h | Medium |
| 14 | Investigate SSG/pre-rendering (vite-ssg or Astro migration) | varies | Critical long-term |

### Phase 4 — Monitoring (Ongoing)

| # | Action | Effort |
|---|--------|--------|
| 15 | Monitor GSC for indexation + impressions weekly | 15min/week |
| 16 | Run `/seo drift baseline` to capture this state for future comparison | 5min |
| 17 | Update sitemap lastmod after each content publish | automated |

---

## Key Insight

The schema and meta setup on this site is better than 90% of freelance portfolios — that work is done. The gap is purely structural: **no custom domain + no crawlable HTML = Google can't confirm the site exists**. Fix those two things first. Everything else is optimization on top of a working foundation.

The second biggest leverage point: **case studies beat portfolios for SEO**. A project gallery is not content — it's a UI. A 1000-word case study for Eliot's Adventures is an indexable page that answers "how to build a booking system for Puerto Rico tours" and can rank for it.
