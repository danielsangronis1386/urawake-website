import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PROJECTS from "../../data/projects";
import "./ProjectPage.css";

function ProjectPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [slideIdx, setSlideIdx] = useState(0);

    const projectIdx = PROJECTS.findIndex((p) => p.slug === slug);
    const project = PROJECTS[projectIdx];

    useEffect(() => {
        if (project) {
            document.title = `${project.title} — Daniel Sangronis`;
        } else {
            document.title = "Project Not Found — Daniel Sangronis";
        }
        return () => { document.title = "Daniel Sangronis"; };
    }, [project]);

    useEffect(() => {
        setSlideIdx(0);
    }, [slug]);

    if (!project) {
        return (
            <div className="project-page-not-found">
                <p>Project not found.</p>
                <Link to="/#projects">← Back to projects</Link>
            </div>
        );
    }

    const { title, subtitle, description, images, stack, liveUrl, caseStudySlug } = project;

    const prevSlide = () => setSlideIdx((p) => (p - 1 + images.length) % images.length);
    const nextSlide = () => setSlideIdx((p) => (p + 1) % images.length);

    const goPrev = () => {
        const prev = (projectIdx - 1 + PROJECTS.length) % PROJECTS.length;
        navigate(`/projects/${PROJECTS[prev].slug}`);
    };
    const goNext = () => {
        const next = (projectIdx + 1) % PROJECTS.length;
        navigate(`/projects/${PROJECTS[next].slug}`);
    };

    return (
        <div className="project-page">
            <Link to="/#projects" className="project-page-back">← Back</Link>

            <div className="viewer-inner">
                {/* LEFT — image slider */}
                <div className="viewer-left">
                    <div className="viewer-slider">
                        <img
                            key={slideIdx}
                            src={images[slideIdx]}
                            alt={`${title} screenshot ${slideIdx + 1}`}
                            className="viewer-img"
                        />
                        {images.length > 1 && (
                            <>
                                <button className="viewer-arrow viewer-arrow-left" onClick={prevSlide} aria-label="Previous image">←</button>
                                <button className="viewer-arrow viewer-arrow-right" onClick={nextSlide} aria-label="Next image">→</button>
                            </>
                        )}
                    </div>

                    <div className="viewer-thumbs">
                        {images.map((img, i) => (
                            <div
                                key={i}
                                className={`viewer-thumb${i === slideIdx ? " thumb-active" : ""}`}
                                onClick={() => setSlideIdx(i)}
                            >
                                <img src={img} alt={`thumb ${i + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT — project info */}
                <div className="viewer-right">
                    <div className="viewer-label">PROJECT</div>
                    <h1 className="viewer-title">{title}</h1>
                    <p className="viewer-subtitle">{subtitle}</p>

                    <div className="viewer-divider" />

                    <div className="viewer-about-label">ABOUT</div>
                    <p className="viewer-description">{description}</p>

                    <div className="viewer-stack">
                        {stack.map((tag) => (
                            <span key={tag} className="viewer-tag">{tag}</span>
                        ))}
                    </div>

                    {liveUrl && (
                        <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="viewer-live-link"
                        >
                            // View live site →
                        </a>
                    )}

                    {caseStudySlug && (
                        <Link to={`/case-studies/${caseStudySlug}`} className="viewer-live-link" style={{ display: "block", marginTop: "0.5rem" }}>
                            // Read case study →
                        </Link>
                    )}

                    <div className="viewer-nav">
                        <button className="viewer-nav-btn" onClick={goPrev} aria-label="Previous project">←</button>
                        <span className="viewer-nav-count">
                            {String(projectIdx + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
                        </span>
                        <button className="viewer-nav-btn" onClick={goNext} aria-label="Next project">→</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectPage;
