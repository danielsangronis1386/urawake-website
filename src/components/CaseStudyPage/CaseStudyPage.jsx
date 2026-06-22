import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CASE_STUDIES from "../../data/casestudies";
import "./CaseStudyPage.css";

function renderBody(text) {
    return text.split("\n\n").map((para, i) => {
        const html = para
            .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
            .replace(/\n/g, "<br />");
        return <p key={i} dangerouslySetInnerHTML={{ __html: html }} />;
    });
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

    return (
        <article className="cs-page">
            <Link to="/" className="cs-back">← Back</Link>

            <header className="cs-header">
                <div className="cs-eyebrow mono">// Case Study · {cs.industry} · {cs.location}</div>
                <h1 className="cs-title">{cs.title}</h1>
                <p className="cs-subtitle">{cs.subtitle}</p>

                <div className="cs-meta mono">
                    <span>{cs.duration}</span>
                    <span className="cs-meta-sep">·</span>
                    <span>{cs.stack.slice(0, 5).join(", ")}{cs.stack.length > 5 ? ` +${cs.stack.length - 5} more` : ""}</span>
                    {cs.liveUrl && (
                        <>
                            <span className="cs-meta-sep">·</span>
                            <a href={cs.liveUrl} target="_blank" rel="noopener noreferrer" className="cs-live-link">
                                View live site →
                            </a>
                        </>
                    )}
                </div>
            </header>

            <div className="cs-metrics">
                {cs.metrics.map((m) => (
                    <div key={m.label} className="cs-metric">
                        <span className="cs-metric-value">{m.value}</span>
                        <span className="cs-metric-label mono">{m.label}</span>
                    </div>
                ))}
            </div>

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
                <div className="cs-stack-label mono">// Stack</div>
                <div className="cs-tags">
                    {cs.stack.map((tag) => (
                        <span key={tag} className="cs-tag mono">{tag}</span>
                    ))}
                </div>
            </div>

            <div className="cs-footer">
                <Link to="/#projects" className="cs-back-projects">← All projects</Link>
            </div>
        </article>
    );
}

export default CaseStudyPage;
