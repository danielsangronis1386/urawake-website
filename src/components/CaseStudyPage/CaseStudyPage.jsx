import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CASE_STUDIES from "../../data/casestudies";
import "./CaseStudyPage.css";

function setMeta(attr, key, value) {
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
    el.setAttribute("content", value);
}

function renderBody(text) {
    return text.split("\n\n").map((para, i) => (
        <p key={i}>{para.replace(/\n/g, " ")}</p>
    ));
}

function splitTitle(title) {
    const words = title.split(" ");
    if (words.length === 1) return words;
    if (words.length === 2) return words;
    // 3+ words: try to split into ~2 chars per line visually
    return words;
}

function CaseStudyPage() {
    const { slug } = useParams();
    const cs = CASE_STUDIES.find((c) => c.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    useEffect(() => {
        if (!cs) return;

        const url = `https://urawake.dev/case-studies/${cs.slug}`;

        // Title + description
        document.title = cs.metaTitle;
        setMeta("name", "description", cs.metaDescription);

        // Canonical
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
        canonical.setAttribute("href", url);

        // OG tags
        setMeta("property", "og:title", cs.metaTitle);
        setMeta("property", "og:description", cs.metaDescription);
        setMeta("property", "og:url", url);

        // Twitter
        setMeta("name", "twitter:title", cs.metaTitle);
        setMeta("name", "twitter:description", cs.metaDescription);

        // CreativeWork schema
        const schema = {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": cs.title,
            "description": cs.metaDescription,
            "url": url,
            "author": { "@type": "Person", "name": "Daniel Sangronis", "url": "https://urawake.dev/" },
            "keywords": cs.stack.join(", "),
            "dateCreated": cs.duration.match(/(\w+ \d{4})/)?.[1] ?? "2026",
            ...(cs.liveUrl ? { "sameAs": cs.liveUrl } : {}),
        };
        let schemaEl = document.getElementById("cs-schema");
        if (!schemaEl) { schemaEl = document.createElement("script"); schemaEl.id = "cs-schema"; schemaEl.type = "application/ld+json"; document.head.appendChild(schemaEl); }
        schemaEl.textContent = JSON.stringify(schema);

        return () => {
            document.title = "Daniel Sangronis — Full Stack Web Developer | URAWAKE Stackhouse";
            setMeta("name", "description", "Full-stack web development by Daniel Sangronis. React, Node.js, Django, PostgreSQL — custom websites and digital tools for US small businesses in Los Angeles, CA.");
            let canonical = document.querySelector('link[rel="canonical"]');
            if (canonical) canonical.setAttribute("href", "https://urawake.dev/");
            setMeta("property", "og:title", "Daniel Sangronis — Full Stack Web Developer | URAWAKE Stackhouse");
            setMeta("property", "og:description", "Full-stack web development by Daniel Sangronis. React, Node.js, Django, PostgreSQL — custom websites and digital tools for US small businesses in Los Angeles, CA.");
            setMeta("property", "og:url", "https://urawake.dev/");
            setMeta("name", "twitter:title", "Daniel Sangronis — Full Stack Web Developer | URAWAKE Stackhouse");
            setMeta("name", "twitter:description", "Full-stack web development by Daniel Sangronis. React, Node.js, Django, PostgreSQL — custom websites and digital tools for US small businesses in Los Angeles, CA.");
            document.getElementById("cs-schema")?.remove();
        };
    }, [cs]);

    if (!cs) {
        return (
            <div className="cs-not-found">
                <p>Case study not found.</p>
                <Link to="/">← Back home</Link>
            </div>
        );
    }

    const titleWords = splitTitle(cs.title);

    return (
        <article className="cs-page">

            {/* HERO — two column: massive title left, info right */}
            <div className="cs-hero">
                <div className="cs-hero-left">
                    <Link to="/" className="cs-back mono">← Back</Link>
                    <h1 className="cs-title">
                        {titleWords.map((word, i) => (
                            <span key={i} className="cs-title-word">{word}</span>
                        ))}
                    </h1>
                </div>

                <div className="cs-hero-right">
                    <div className="cs-eyebrow mono">Case Study</div>
                    <p className="cs-industry mono">{cs.industry} · {cs.location}</p>
                    <p className="cs-subtitle">{cs.subtitle}</p>

                    <div className="cs-meta mono">
                        <span>{cs.duration}</span>
                        <br />
                        <span>{cs.stack.slice(0, 5).join(", ")}{cs.stack.length > 5 ? ` +${cs.stack.length - 5} more` : ""}</span>
                    </div>

                    {cs.liveUrl && (
                        <a href={cs.liveUrl} target="_blank" rel="noopener noreferrer" className="cs-live-link mono">
                            View live site →
                        </a>
                    )}
                </div>
            </div>

            {/* BODY */}
            <div className="cs-body">
                {cs.sections.map((section) => (
                    <section key={section.heading} className="cs-section">
                        <h2 className="cs-section-heading">{section.heading}</h2>
                        <div className="cs-section-body">
                            {renderBody(section.body)}
                        </div>
                    </section>
                ))}
            </div>

            <div className="cs-stack-full">
                <div className="cs-stack-label mono">Stack</div>
                <div className="cs-tags">
                    {cs.stack.map((tag) => (
                        <span key={tag} className="cs-tag mono">{tag}</span>
                    ))}
                </div>
            </div>

            <div className="cs-footer">
                <Link to="/#projects" className="cs-back-projects mono">← All projects</Link>
            </div>

        </article>
    );
}

export default CaseStudyPage;
