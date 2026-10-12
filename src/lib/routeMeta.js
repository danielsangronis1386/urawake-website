import PROJECTS from "../data/projects";
import CASE_STUDIES from "../data/casestudies";
import { faqSchema } from "../data/faq";
import { SITE_URL, DEFAULT_TITLE, DEFAULT_DESCRIPTION, DEFAULT_IMAGE, breadcrumbSchema } from "./seo";

/**
 * The single source of truth for per-route head tags.
 *
 * Both the runtime (via usePageMeta in App) and the build-time prerender pass
 * read from here, so a page can never end up with one set of tags in the
 * served HTML and a different set after hydration.
 */
export function routeMeta(pathname) {
    const path = pathname.replace(/\/+$/, "") || "/";

    if (path === "/") {
        return {
            title: DEFAULT_TITLE,
            description: DEFAULT_DESCRIPTION,
            path: "/",
            image: DEFAULT_IMAGE,
            jsonLd: faqSchema(),
        };
    }

    if (path === "/why-us") {
        return {
            title: "Why Work With Us | URAWAKE Stackhouse — Custom Web Development, Los Angeles",
            description:
                "Custom-coded websites and CRMs for tourism, hospitality, and small business. Brand and development from one team in Los Angeles, and we stay on after launch.",
            path: "/why-us",
            jsonLd: breadcrumbSchema([
                { name: "Home", path: "/" },
                { name: "Why Us", path: "/why-us" },
            ]),
        };
    }

    if (path === "/team") {
        return {
            title: "Meet the Team | URAWAKE Stackhouse — Daniel Sangronis & Janyerlyn Morales",
            description:
                "The two people behind URAWAKE Stackhouse: Daniel Sangronis on development and Janyerlyn Morales on brand and design. Based in Los Angeles, California.",
            path: "/team",
            jsonLd: {
                "@context": "https://schema.org",
                "@graph": [
                    breadcrumbSchema([
                        { name: "Home", path: "/" },
                        { name: "Team", path: "/team" },
                    ]),
                    {
                        "@type": "AboutPage",
                        "@id": `${SITE_URL}/team#webpage`,
                        url: `${SITE_URL}/team`,
                        name: "Meet the Team | URAWAKE Stackhouse",
                        about: { "@id": `${SITE_URL}/#urawake-stackhouse` },
                    },
                ],
            },
        };
    }

    const csMatch = path.match(/^\/case-studies\/(.+)$/);
    if (csMatch) {
        const cs = CASE_STUDIES.find((c) => c.slug === csMatch[1]);
        if (!cs) return notFoundMeta();
        return {
            title: cs.metaTitle,
            description: cs.metaDescription,
            path: `/case-studies/${cs.slug}`,
            jsonLd: {
                "@context": "https://schema.org",
                "@graph": [
                    {
                        "@type": "CreativeWork",
                        "@id": `${SITE_URL}/case-studies/${cs.slug}#work`,
                        name: cs.title,
                        description: cs.metaDescription,
                        url: `${SITE_URL}/case-studies/${cs.slug}`,
                        author: { "@id": `${SITE_URL}/#daniel-sangronis` },
                        creator: { "@id": `${SITE_URL}/#urawake-stackhouse` },
                        keywords: cs.stack.join(", "),
                        dateCreated: cs.dateStarted,
                        datePublished: cs.datePublished,
                        dateModified: cs.dateModified,
                        ...(cs.dateCompleted
                            ? { temporalCoverage: `${cs.dateStarted}/${cs.dateCompleted}` }
                            : {}),
                        ...(cs.liveUrl ? { sameAs: cs.liveUrl } : {}),
                    },
                    breadcrumbSchema([
                        { name: "Home", path: "/" },
                        { name: "Case Studies", path: "/#projects" },
                        { name: cs.title, path: `/case-studies/${cs.slug}` },
                    ]),
                ],
            },
        };
    }

    const projMatch = path.match(/^\/projects\/(.+)$/);
    if (projMatch) {
        const p = PROJECTS.find((x) => x.slug === projMatch[1]);
        if (!p) return notFoundMeta();
        return {
            title: `${p.title} — ${p.subtitle} | URAWAKE Stackhouse`,
            description: p.description.slice(0, 155),
            // The case study is the canonical home for this work; the gallery
            // page exists for browsing, not for competing with it.
            path: p.caseStudySlug ? `/case-studies/${p.caseStudySlug}` : `/projects/${p.slug}`,
            jsonLd: breadcrumbSchema([
                { name: "Home", path: "/" },
                { name: "Projects", path: "/#projects" },
                { name: p.title, path: `/projects/${p.slug}` },
            ]),
        };
    }

    if (path.startsWith("/invoices/")) {
        return { title: "Invoice | URAWAKE Stackhouse", description: "", path, noindex: true };
    }

    if (path.startsWith("/proposals/")) {
        return { title: "Proposal | URAWAKE Stackhouse", description: "", path, noindex: true };
    }

    return notFoundMeta();
}

function notFoundMeta() {
    return {
        title: "404 — Page Not Found | URAWAKE Stackhouse",
        description: "That page doesn't exist.",
        path: "/404",
        noindex: true,
    };
}

export default routeMeta;
