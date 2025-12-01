import { useState } from "react";
import "./ProjectCard.css";


function ProjectCard({ title, subtitle, description, images}) {
    const slides = [
       
       // Generamos los slides de imagenes usando el array de props 

       ...images.map((img, index) => ({
        type: "image",
        content: (
            <img
                src={img}
                alt={`slide ${index+1}`}
                className="project-image"
            />
          )
       })),
//text
        {
            type: "text",
            content: (
                <div className="slide-text">
                    <h4>About this project</h4>
                    <p>{description}</p>
                </div>
            )
        },

    ]

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

        <div className="project-slider-wrapper">
    

            {/* Slider navigation */}
            <div className="project-slides">
                <div className="Slide">{slides[current].content}</div>
            </div>

            <button className

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
        </div>
    );

}

export default ProjectCard;
