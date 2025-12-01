import { useState } from "react";
import "./ProjectCard.css";

function ProjectCard({ title, subtitle, description, images }) {
    const slides = [
        // slides de imagen
        ...images.map((img, index) => ({
            type: "image",
            content: (
                <img
                    src={img}
                    alt={`slide ${index + 1}`}
                    className="project-image"
                />
            ),
        })),

        // slide final con texto
        {
            type: "text",
            content: (
                <div className="slide-text">
                    <h4>About this project</h4>
                    <p>{description}</p>
                </div>
            ),
        },
    ];

    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="project-card">

            {/* HEADER */}
            <div className="project-text-header">
                <h3>{title}</h3>
                <p>{subtitle}</p>
            </div>

            {/* WRAPPER */}
            <div className="project-slider-wrapper">

                {/* SLIDE ACTUAL */}
                <div className="project-slides">
                    <div className="slide">
                        {slides[current].content}
                    </div>
                </div>

                {/* FLECHAS */}
                <button className="arrow arrow-left" onClick={prevSlide}>←</button>
                <button className="arrow arrow-right" onClick={nextSlide}>→</button>

               

            </div>
        </div>
    );
}

export default ProjectCard;
