# Performance / Core Web Vitals Audit — urawake.dev

Date: 2026-08-10
Method: Lighthouse CLI (mobile, simulated throttling, headless Chrome) against the live production URLs.
PageSpeed Insights API was rate-limited (240 QPM cap hit) at audit time; Lighthouse lab data was used as the primary source. No CrUX field data available in this run (should be re-checked once quota resets — CrUX is the authoritative 75th-percentile source).

## Category Score: 58/100 (Needs Improvement)

Lighthouse Performance score: 72/100 (home), 70/100 (case study). Score is dragged down almost entirely by LCP; INP/TBT and CLS are excellent. The 58 reflects the fact that LCP fails "Good" outright and the root cause (client-render-gated content) is architectural, not a quick fix.

---

## Results — https://urawake.dev/ (home)

| Metric | Value (lab) | Threshold | Status |
|---|---|---|---|
| LCP | **5.1 s** | ≤2.5s good | **FAIL (Poor)** |
| TBT (INP proxy) | 0 ms | ≤200ms | PASS |
| CLS | 0.000 | ≤0.1 | PASS |
| TTFB | ~30-627ms (varies by run; root doc: 33.7ms server, ~626ms incl. TLS/redirect) | ≤200ms ideal | Borderline, not the bottleneck |
| FCP | 3.9 s | — | Slow |
| Speed Index | 3.9 s | — | Slow |
| Total page weight | 2,254 KiB | — | High for a portfolio home page |

LCP element identified by Lighthouse: **`span.hero-typed`** — the "// BUILD CONSCIOUS. CODE AWAKE." typed-text animation inside `.hero-eyebrow`, NOT the boot-splash `<img src="/logo.png">`.

LCP phase breakdown:
- TTFB: 12% (626ms)
- Load Delay: 0%
- Load Time: 0%
- **Render Delay: 88% (4,425ms)**

## Results — https://urawake.dev/case-studies/tourstodopr

| Metric | Value (lab) | Threshold | Status |
|---|---|---|---|
| LCP | **5.0 s** | ≤2.5s good | **FAIL (Poor)** |
| TBT | 0 ms | ≤200ms | PASS |
| CLS | 0.000 | ≤0.1 | PASS |
| TTFB | 622ms (root doc) | — | Borderline |
| FCP | 4.1 s | — | Slow |
| Speed Index | 5.1 s | — | Slow |
| Total page weight | 815 KiB | — | Reasonable |

LCP element: a body-copy paragraph ("From zero infrastructure and manual Gmail replies to a fully custom CRM with au…"). Render Delay: 87% (4,350ms) — same pattern as home.

---

## Does the boot-splash approach help or hurt LCP?

**It does not help LCP, and in its current form it is functionally invisible to the metric.** The boot-splash `<img>` painted directly in `index.html` with `fetchpriority="high"` preload does exactly what it's supposed to do — it paints something on screen almost immediately, which is good for perceived performance and prevents a blank white/black screen. But:

1. **The Largest Contentful Paint candidate on both pages is text content rendered by React after hydration** (`hero-typed` span on home, a case-study paragraph on the case study page), not the logo image. Chrome's LCP algorithm re-evaluates the largest visible element as the page continues to paint, and once React mounts and replaces `#boot-splash`, the splash image is removed from the DOM and stops being a valid LCP candidate. Because the real content is larger/positioned later than the splash logo, **LCP is measured against the post-hydration content, not the splash**.
2. That post-hydration content cannot paint until: TTFB completes → the ~304KB JS bundle (95KB gzipped) downloads and parses → React mounts → (on home) a typed-text animation effect fires. This produces an **88% Render Delay** share of LCP — the dominant cost.
3. Because the splash `<img>` is unmounted rather than left in place, it provides no LCP credit at all today. It only helps First Paint / FCP-adjacent perceived loading, not the metric Google scores.

**Net effect: boot-splash hurts nothing in isolation, but it is currently the wrong LCP strategy — it's solving a different problem (blank screen) while the actual LCP-eligible element is gated entirely behind JS execution.** The `fetchpriority="high"` preload on `/logo.png` is well-intentioned but is prioritizing bandwidth for an element that Google will never credit as LCP once it's removed from the DOM.

### Fix options, in order of expected impact
1. **Make the hero heading/eyebrow content server-renderable or present in the initial HTML**, so the real LCP element (the text) paints without waiting on JS. If full SSR isn't feasible on Vercel for this SPA, consider pre-rendering the shell copy (headline + eyebrow, non-animated) into `index.html`/inside `#boot-splash` so it's already the largest visible content, then let JS take over for animation. This alone should cut Render Delay dramatically since text has zero decode cost, unlike waiting on JS bundle parse+hydrate+typed-animation-timer.
2. **Remove or shorten the typed-text animation delay before first paint of that text**, or don't gate initial visible text behind a JS `setTimeout`/typewriter effect — render the full string immediately and animate a decorative overlay instead. Typewriter effects that build up a string character-by-character can repeatedly reset the "largest contentful" candidate and add pure wall-clock delay before the final content is present.
3. **Reduce main-bundle blocking cost before hydration**: 304KB JS (95.5KB gzip) is not huge, but on 4G-simulated Slow-4G/mid-tier-mobile throttling used by Lighthouse mobile, download+parse+execute of that bundle is a meaningful chunk of the 4.3s Render Delay window. Code-split route-level bundles (case-study pages, project galleries) so the home/critical path bundle is smaller.
4. **If the splash image is meant to double as a paint target, keep it in the DOM** (e.g., fade it out via CSS instead of unmounting/removing it) so it remains eligible longer — but this is a secondary fix; #1 is what actually moves the LCP number since text will almost certainly still end up larger once laid out.

---

## Image weight audit (`public/`)

| File | Size | Notes |
|---|---|---|
| `og-image-v2.png` | 104 KB | OG/social only, not render-blocking for CWV. Fine as-is (not fetched by page load). |
| `logo.png` | 48 KB | Preloaded with `fetchpriority=high`, used as boot-splash. PNG at this size for a logo suggests it could be re-encoded as WebP/AVIF or trimmed — but per the LCP analysis above, this is secondary; the real fix is what element carries LCP, not this file's byte count. |
| `footer-grunge.webp` | 136 KB | Already WebP. Confirm it's `loading="lazy"` since it's below-the-fold (footer) — not an LCP or above-the-fold concern either way. |
| `footer-texture.webp` | 74 KB | Same as above, below-the-fold, low priority. |

None of these four files are on the critical LCP path for either page tested (LCP elements are text, not images), so **compressing them further will not move Core Web Vitals**. They're fine to optimize for general byte-weight/data-savings reasons, but should not be prioritized ahead of the render-delay fix above.

### `src/assets/textures/*.png` (untracked, not in git)
Found 11 files, **~46.6 MB total** (`GrungeTexture-01` through `-11`, individually 1.7–5.9 MB each). Verified via `grep -r "GrungeTexture" src/` that **none of these are imported anywhere in the source**, and confirmed `dist/` does not contain them (only `footer-grunge.webp`/`footer-texture.webp` ship). They are dead/staging assets sitting in the working tree, currently untracked in git (`git status` shows them as `??`).

**Action needed:** these should either be deleted from the working tree or moved outside the repo/`public`/`src` entirely. They present zero runtime performance risk today (Vite won't bundle unimported files), but:
- If anyone imports one directly in the future (e.g., `import x from './textures/GrungeTexture-01.png'`), Vite will inline/bundle a multi-MB asset into the build, which would tank LCP/page weight instantly.
- They bloat the repo and risk accidental `git add .` inclusion later.
Recommend deleting them or moving to a design-assets folder outside the deployed app if they're only reference/source material for producing the optimized WebP textures already in `public/`.

---

## Bundle sizes (from local `dist/`)

- Main JS bundle: `index-wWAmtTZ3.js` — 304 KB raw / **95.5 KB gzipped**. Reasonable for a single-bundle SPA but should be code-split by route (case studies, project detail pages) to shrink the critical path for first paint.
- Main CSS: `index-Cm6-RPWN.css` — 68 KB (render-blocking; Lighthouse flagged ~150ms wasted here — low priority next to LCP fix).
- Fonts: `Inter-VariableFont` (856 KB) + `Inter-Italic-VariableFont` (884 KB) + `ArchivoBlack-Regular` (88 KB) + `MonoBlaze` (28 KB) — self-hosted variable fonts are large; if only a subset of weights/styles is used, subsetting could reduce these substantially, though they weren't flagged as blocking LCP directly in this run (no FOIT/FOUT or layout shift observed — CLS is 0.000 on both pages).
- Case-study images (`torstodcrm*.jpg`, `tours2do *.jpg`, `eliots*.jpg`, etc.) range 120–508 KB each, all below-the-fold/gallery content, not LCP-critical for the tested pages.
- Total `dist/` size: 7.8 MB (includes all routes' assets; per-page transferred weight is much lower — 2.25 MB home, 815 KB case study, per Lighthouse network totals).

---

## Prioritized recommendations

1. **(Highest impact)** Get the real LCP element — hero eyebrow/heading text and case-study body copy — visible without waiting on full JS hydration + animation timers. This is the only fix that will move LCP out of the "Poor" bucket; everything else is secondary while an 88% Render Delay dominates.
2. **(High impact)** Kill or defer the typewriter animation's effect on initial text paint; render the final string immediately, animate visually with CSS/opacity if the typing effect is wanted, don't gate content behind a JS timer loop before first paint.
3. **(Medium impact)** Route-level code splitting to shrink the JS the browser must parse/execute before hydration on the critical page.
4. **(Low impact, hygiene)** Delete or relocate the untracked `src/assets/textures/*.png` (46.6 MB) — not a current CWV risk since unused, but a latent one and repo bloat.
5. **(Low impact)** Re-encode `logo.png` as WebP/AVIF and re-run once #1/#2 land, since the splash image's role in LCP may change if it's kept in the DOM longer.
6. **(Verify only)** CLS and INP/TBT are already excellent (0.000 / 0ms) on both pages — no action needed there. Re-run PSI/CrUX once API quota resets to confirm field data agrees with these lab results, since lab TTFB (30ms server-side) and field TTFB can diverge.

## Data sources
- Lighthouse JSON reports: `/private/tmp/claude-501/-Users-alejandrosangronis-code-ga-projects-my-portafolio/697c0036-9c8b-4b9b-8766-07be0cb2e18b/scratchpad/lh_home.json`, `.../lh_case.json`
- `index.html`: `/Users/alejandrosangronis/code/ga/projects/my-portafolio/index.html`
- Build output: `/Users/alejandrosangronis/code/ga/projects/my-portafolio/dist/`
- Untracked textures: `/Users/alejandrosangronis/code/ga/projects/my-portafolio/src/assets/textures/`
- PageSpeed Insights API call failed with `PSI rate limit exceeded (240 QPM / 25,000 QPD)` — re-run `python3 /Users/alejandrosangronis/.claude/skills/seo/scripts/pagespeed_check.py <url> --json` later for field data / CrUX confirmation.
