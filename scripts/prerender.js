/**
 * Build-time prerender.
 *
 * Renders every known route to a real HTML file so that crawlers, social
 * scrapers, and AI bots — none of which reliably run JavaScript — receive the
 * page's actual content, its own <title>/canonical/OG tags, and its JSON-LD in
 * the first response. React hydrates over the top of it on the client.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server bundle).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");

const { render, getRoutes, routeMeta } = await import(ssrEntry);

const template = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");

function escapeAttr(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

/**
 * Rewrites the head tags that index.html hardcodes for the homepage so each
 * prerendered page ships its own. Anything not listed here (favicons, fonts,
 * the site-level JSON-LD) is shared and left alone.
 */
function applyHead(html, meta) {
    const canonical = `https://urawake.dev${meta.path === "/" ? "/" : meta.path}`;
    const image = meta.image || "https://urawake.dev/og-image-v2.png";

    let out = html
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(meta.title)}</title>`)
        .replace(
            /<meta name="description" content="[^"]*" \/>/,
            `<meta name="description" content="${escapeAttr(meta.description || "")}" />`
        )
        .replace(
            /<link rel="canonical" href="[^"]*" \/>/,
            `<link rel="canonical" href="${escapeAttr(canonical)}" />`
        )
        .replace(
            /<meta property="og:url" content="[^"]*" \/>/,
            `<meta property="og:url" content="${escapeAttr(canonical)}" />`
        )
        .replace(
            /<meta property="og:title" content="[^"]*" \/>/,
            `<meta property="og:title" content="${escapeAttr(meta.title)}" />`
        )
        .replace(
            /<meta property="og:description" content="[^"]*" \/>/,
            `<meta property="og:description" content="${escapeAttr(meta.description || "")}" />`
        )
        .replace(
            /<meta property="og:image" content="[^"]*" \/>/,
            `<meta property="og:image" content="${escapeAttr(image)}" />`
        )
        .replace(
            /<meta name="twitter:title" content="[^"]*" \/>/,
            `<meta name="twitter:title" content="${escapeAttr(meta.title)}" />`
        )
        .replace(
            /<meta name="twitter:description" content="[^"]*" \/>/,
            `<meta name="twitter:description" content="${escapeAttr(meta.description || "")}" />`
        )
        .replace(
            /<meta name="twitter:image" content="[^"]*" \/>/,
            `<meta name="twitter:image" content="${escapeAttr(image)}" />`
        );

    const extraHead = [];
    if (meta.noindex) {
        extraHead.push('<meta name="robots" content="noindex, nofollow" />');
    }
    if (meta.jsonLd) {
        extraHead.push(
            `<script type="application/ld+json" id="route-schema">${JSON.stringify(
                meta.jsonLd
            )}</script>`
        );
    }

    if (extraHead.length) {
        out = out.replace("</head>", `    ${extraHead.join("\n    ")}\n  </head>`);
    }

    return out;
}

/**
 * Swaps the contents of <div id="root"> for the rendered app.
 *
 * Counts div depth rather than pattern-matching the closing tag: the boot
 * splash nests inside root, and Vite moves the module script into <head> at
 * build time, so there is no reliable anchor to match against.
 */
function replaceRootDiv(html, appHtml) {
    const openTag = '<div id="root">';
    const start = html.indexOf(openTag);
    if (start === -1) throw new Error('prerender: <div id="root"> not found in template');

    let depth = 1;
    let i = start + openTag.length;
    const tag = /<(\/?)div\b/g;
    tag.lastIndex = i;

    let m;
    while ((m = tag.exec(html))) {
        depth += m[1] === "/" ? -1 : 1;
        if (depth === 0) {
            const end = html.indexOf(">", m.index) + 1;
            return (
                html.slice(0, start) +
                `<div id="root" data-prerendered="true">${appHtml}</div>` +
                html.slice(end)
            );
        }
    }
    throw new Error('prerender: unbalanced <div id="root">');
}

/**
 * The noscript block was a stand-in for content crawlers couldn't reach. Every
 * page now ships its real markup, so keeping it would duplicate the homepage
 * copy onto all 15 routes.
 */
function stripNoscriptFallback(html) {
    return html.replace(/\n?\s*<noscript>[\s\S]*?<\/noscript>/, "");
}

const routes = getRoutes();
let written = 0;

for (const route of routes) {
    const url = route.path;
    let appHtml;
    try {
        appHtml = render(url);
    } catch (err) {
        console.error(`\n  prerender failed for ${url}:\n`, err);
        process.exitCode = 1;
        continue;
    }

    const meta = routeMeta(url);
    let html = applyHead(template, meta);

    // Swap the boot splash for the real rendered markup. The flag tells
    // main.jsx to hydrate rather than repaint from scratch.
    html = stripNoscriptFallback(replaceRootDiv(html, appHtml));

    const outPath =
        url === "/"
            ? path.join(distDir, "index.html")
            : url === "/404"
                ? path.join(distDir, "404.html")
                : path.join(distDir, url.slice(1), "index.html");

    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html);
    written++;
    console.log(`  prerendered ${url}`);
}

// ── SITEMAP ──
// Generated from the same route list, so it can never fall out of sync.
const today = new Date().toISOString().slice(0, 10);
const indexable = routes.filter((r) => r.indexable);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable
        .map(
            (r) => `  <url>
    <loc>https://urawake.dev${r.path === "/" ? "/" : r.path}</loc>
    <lastmod>${r.lastmod || today}</lastmod>
    <changefreq>${r.changefreq || "monthly"}</changefreq>
    <priority>${r.priority || "0.5"}</priority>
  </url>`
        )
        .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap);

console.log(`\n  ${written} routes prerendered, ${indexable.length} URLs in sitemap.xml\n`);
