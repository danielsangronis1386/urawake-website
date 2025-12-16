import { useState } from "react";
import "./ProjectCard.css";

function ProjectCard({ title, subtitle, description, images = [] }) {
    // Construct slides: Images first, Text last
    const imageSlides = images.map((img, index) => ({
        type: "image",
        content: <div className="image-placeholder">{`IMAGE ${index + 1}`}</div>, // using placeholder since actual images aren't hooked up yet
        id: `img-${index}`
    }));

    const textSlide = {
        type: "text",
        content: (
            <div className="slide-text">
                <h4>About this project</h4>
                <p>{description}</p>
            </div>
        ),
        id: "desc-slide"
    };

    const slides = [...imageSlides, textSlide];
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="project-card">
            {/* Project title + subtitle */}
            <div className="project-text-header">
                <h3>{title}</h3>
                <p>{subtitle}</p>
            </div>

            {/* Custom Slider */}
            <div className="slider-container">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`slide ${index === current ? "active" : ""}`}
                    >
                        {slide.content}
                    </div>
                ))}

                {/* Navigation Arrows (Overlay) */}
                <div className="slider-nav">
                    <div className="nav-arrow left" onClick={prevSlide}>
                        <span>&larr;</span>
                    </div>
                    <div className="nav-arrow right" onClick={nextSlide}>
                        <span>&rarr;</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;
