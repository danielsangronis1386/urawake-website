import { useState } from "react";
import "./ProjectCard.css";


function ProjectCard({ title, subtitle, description}) {
    const slides = [
        {
            type: "text",
            content: (
                <div className="slide-text">
                    <h4>About this project</h4>
                    <p>{description}</p>
                </div>
            )
        },
        { type: "image", content: <div className="image-placeholder">SLIDE1</div>},
        { type: "image", content: <div className="image-placeholder">SLIDE2</div>},
        { type: "image", content: <div className="image-placeholder">SLIDE3</div>}
    ];

    const [current, setCurrent] = useState(0);
    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    }
    
    return (
        <div className="project-card">

            {/*Project title + subtitle*/}
            <div className="project-text-header">
                <h3>{title}</h3>
                <p>{subtitle}</p>
            </div>
    

            {/* Slider navigation */}
            <div className="project-slider-nav">
                <button className="arrow" onClick={prevSlide}>←</button>

                <div className="dots">
                    {slides.map((_, i) => (
                        <span
                        key={i}
                        className={`dot ${i === current ? "active" : ""}`}
                        ></span>
                    ))}
                    
                </div>

                <button className="arrow" onClick={nextSlide}>→</button>

                 </div>

                {/* Slide area (only show 1)*/}
                <div className="project-slides">
                    <div className="slide">
                        {slides[current].content}
                   
                </div>
            </div>
        </div>
    );

}

export default ProjectCard;
