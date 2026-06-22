import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CASE_STUDIES from "../../data/casestudies";
import "./CaseStudyPage.css";

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
        if (cs) {
            document.title = cs.metaTitle;
            let meta = document.querySelector('meta[name="description"]');
            if (meta) meta.setAttribute("content", cs.metaDescription);
        }
        return () => {
            document.title = "Daniel Sangronis — Full Stack Web Developer | URAWAKE Stackhouse";
            let meta = document.querySelector('meta[name="description"]');
            if (meta) meta.setAttribute("content", "Full-stack web development by Daniel Sangronis. React, Node.js, Django, PostgreSQL — custom websites and digital tools for US small businesses.");
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

            {/* METRICS */}
            <div className="cs-metrics">
                {cs.metrics.map((m) => (
                    <div key={m.label} className="cs-metric">
                        <span className="cs-metric-value">{m.value}</span>
                        <span className="cs-metric-label mono">{m.label}</span>
                    </div>
                ))}
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
