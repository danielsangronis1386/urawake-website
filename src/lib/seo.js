import { useEffect } from "react";

export const SITE_URL = "https://urawake.dev";
export const DEFAULT_IMAGE = `${SITE_URL}/og-image-v2.png`;

export const DEFAULT_TITLE = "URAWAKE Stackhouse | Full Stack Web Development";
export const DEFAULT_DESCRIPTION =
    "Full-stack web development based in Los Angeles, CA. React, Node.js, Django, PostgreSQL. Custom websites and digital tools for US small businesses.";

function upsertMeta(attr, key, value) {
    const selector = `meta[${attr}="${key}"]`;
    let el = document.head.querySelector(selector);
    if (!value) {
        el?.remove();
        return;
    }
    if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute("content", value);
}

function upsertCanonical(href) {
    let el = document.head.querySelector('link[rel="canonical"]');
    if (!el) {
        el = document.createElement("link");
        el.rel = "canonical";
        document.head.appendChild(el);
    }
    el.setAttribute("href", href);
}

function upsertJsonLd(id, data) {
    let el = document.getElementById(id);
    if (!data) {
        el?.remove();
        return;
    }
    if (!el) {
        el = document.createElement("script");
        el.id = id;
        el.type = "application/ld+json";
        document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
}

/**
 * Applies per-route SEO metadata and restores the homepage defaults on unmount.
 *
 * The site is prerendered at build time, so these tags already exist in the
 * served HTML for every static route. This keeps them correct during
 * client-side navigation.
 */
export function usePageMeta({
    title = DEFAULT_TITLE,
    description = DEFAULT_DESCRIPTION,
    path = "/",
    image = DEFAULT_IMAGE,
    noindex = false,
    jsonLd = null,
    jsonLdId = "route-schema",
} = {}) {
    const canonical = `${SITE_URL}${path}`;
    const serializedJsonLd = jsonLd ? JSON.stringify(jsonLd) : null;

    useEffect(() => {
        document.title = title;
        upsertMeta("name", "description", description);
        upsertCanonical(canonical);

        upsertMeta("property", "og:title", title);
        upsertMeta("property", "og:description", description);
        upsertMeta("property", "og:url", canonical);
        upsertMeta("property", "og:image", image);

        upsertMeta("name", "twitter:title", title);
        upsertMeta("name", "twitter:description", description);
        upsertMeta("name", "twitter:image", image);

        upsertMeta("name", "robots", noindex ? "noindex, nofollow" : null);
        upsertJsonLd(jsonLdId, serializedJsonLd ? JSON.parse(serializedJsonLd) : null);

        return () => {
            document.title = DEFAULT_TITLE;
            upsertMeta("name", "description", DEFAULT_DESCRIPTION);
            upsertCanonical(`${SITE_URL}/`);
            upsertMeta("property", "og:title", DEFAULT_TITLE);
            upsertMeta("property", "og:description", DEFAULT_DESCRIPTION);
            upsertMeta("property", "og:url", `${SITE_URL}/`);
            upsertMeta("property", "og:image", DEFAULT_IMAGE);
            upsertMeta("name", "twitter:title", DEFAULT_TITLE);
            upsertMeta("name", "twitter:description", DEFAULT_DESCRIPTION);
            upsertMeta("name", "twitter:image", DEFAULT_IMAGE);
            upsertMeta("name", "robots", null);
            upsertJsonLd(jsonLdId, null);
        };
    }, [title, description, canonical, image, noindex, serializedJsonLd, jsonLdId]);
}

export function breadcrumbSchema(trail) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((crumb, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: crumb.name,
            item: `${SITE_URL}${crumb.path}`,
        })),
    };
}
