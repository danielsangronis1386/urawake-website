import PROJECTS from "./data/projects";
import CASE_STUDIES from "./data/casestudies";
import INVOICES from "./components/InvoicePage/invoices";
import TESTIMONIAL_INVITES from "./data/testimonialInvites";

const PROPOSAL_SLUGS = ["cajamarca"];

/**
 * Every URL this site serves. Drives both the prerender pass and sitemap
 * generation, so a new project or case study can never silently go missing
 * from either one.
 *
 * `indexable: false` routes are still prerendered (so they load fast and
 * return a real page) but are kept out of the sitemap and carry noindex.
 */
export function getRoutes() {
    const routes = [
        { path: "/", priority: "1.0", changefreq: "monthly", indexable: true },
        { path: "/why-us", priority: "0.8", changefreq: "monthly", indexable: true },
        { path: "/team", priority: "0.7", changefreq: "monthly", indexable: true },
    ];

    for (const cs of CASE_STUDIES) {
        routes.push({
            path: `/case-studies/${cs.slug}`,
            priority: "0.9",
            changefreq: "monthly",
            lastmod: cs.dateModified,
            indexable: true,
        });
    }

    // Project pages canonicalize to their case study, so they are prerendered
    // for direct visits but deliberately left out of the sitemap.
    for (const p of PROJECTS) {
        routes.push({ path: `/projects/${p.slug}`, indexable: false });
    }

    for (const slug of Object.keys(INVOICES)) {
        routes.push({ path: `/invoices/${slug}`, indexable: false });
    }

    for (const slug of PROPOSAL_SLUGS) {
        routes.push({ path: `/proposals/${slug}`, indexable: false });
    }

    for (const slug of Object.keys(TESTIMONIAL_INVITES)) {
        routes.push({ path: `/testimonial/${slug}`, indexable: false });
    }

    routes.push({ path: "/404", indexable: false });

    return routes;
}

export default getRoutes;
