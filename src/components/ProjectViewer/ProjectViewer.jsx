import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProjectViewer.css";

function ProjectViewer({ project, current, total, onClose, onPrev, onNext }) {
    const [slideIdx, setSlideIdx] = useState(0);

    // Reset slide when project changes
    useEffect(() => {
        setSlideIdx(0);
    }, [project.id]);

    const { title, subtitle, description, images, stack, liveUrl, caseStudySlug } = project;

    const prevSlide = () => setSlideIdx((p) => (p - 1 + images.length) % images.length);
    const nextSlide = () => setSlideIdx((p) => (p + 1) % images.length);

    return (
        <div className="project-viewer viewer-visible">

            {/* Close */}
            <button className="viewer-close" onClick={onClose} aria-label="Close project">
                ✕
            </button>

            <div className="viewer-inner">

                {/* LEFT: image slider */}
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


                    {/* Thumbnail strip */}
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

                {/* RIGHT: project info */}
                <div className="viewer-right">
                    <div className="viewer-label">PROJECT</div>
                    <h2 className="viewer-title">{title}</h2>
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
                        <Link to={`/case-studies/${caseStudySlug}`} className="viewer-live-link viewer-case-study-link">
                            // The Work →
                        </Link>
                    )}

                    {/* Project navigation */}
                    <div className="viewer-nav">
                        <button className="viewer-nav-btn" onClick={onPrev} aria-label="Previous project">←</button>
                        <span className="viewer-nav-count">
                            {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                        </span>
                        <button className="viewer-nav-btn" onClick={onNext} aria-label="Next project">→</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ProjectViewer;
