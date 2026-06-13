import { useState } from "react";
import "./ProjectCard.css";

function ProjectCard({ title, subtitle, description, images, stack = [], index = 0 }) {
    const slides = [
        ...images.map((img, index) => ({
            type: "image",
            content: (
                <img
                    src={img}
                    alt={`${title} screenshot ${index + 1}`}
                    className="project-image"
                />
            ),
        })),
        {
            type: "text",
            content: (
                <div className="slide-text">
                    <h4>// About this project</h4>
                    <p>{description}</p>
                </div>
            ),
        },
    ];

    const [current, setCurrent] = useState(0);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <div className={`project-card ${index % 2 === 0 ? "card-dark" : "card-light"}`}>

            <div className="project-text-header">
                <h3>{title}</h3>
                <p>{subtitle}</p>
            </div>

            {stack.length > 0 && (
                <div className="project-stack">
                    {stack.map(tag => (
                        <span key={tag} className="stack-tag">{tag}</span>
                    ))}
                </div>
            )}

            <div className="project-slider-wrapper">
                <div className="project-slides">
                    <div className="slide">
                        {slides[current].content}
                    </div>
                </div>

                <button className="arrow arrow-left" onClick={prevSlide} aria-label="Previous slide">←</button>
                <button className="arrow arrow-right" onClick={nextSlide} aria-label="Next slide">→</button>
            </div>

            <div className="slide-indicators" aria-hidden="true">
                {slides.map((_, i) => (
                    <div
                        key={i}
                        className={`slide-dot${i === current ? " active" : ""}`}
                        onClick={() => setCurrent(i)}
                    />
                ))}
            </div>

        </div>
    );
}

export default ProjectCard;
