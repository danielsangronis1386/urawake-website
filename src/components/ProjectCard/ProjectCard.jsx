import "./ProjectCard.css";

function ProjectCard({ project, index, isOpen, scatterStyle, onClick }) {
    const { title, subtitle, tagline, images, slug } = project;

    const cardStyle = {
        transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease",
        ...scatterStyle,
    };

    const handleClick = (e) => {
        if (isOpen) return;
        e.preventDefault();
        onClick();
    };

    return (
        <a
            href={`/projects/${slug}`}
            className="project-card"
            style={cardStyle}
            onClick={handleClick}
            aria-label={`View project: ${title}`}
        >
            <div className="card-thumb">
                <img
                    src={images[0]}
                    alt={title}
                    className="card-thumb-img"
                    loading="lazy"
                    decoding="async"
                />
                <div className="card-thumb-overlay">
                    <span className="card-open-label">VIEW PROJECT</span>
                </div>
            </div>

            <div className="card-info">
                <h3 className="card-title">{title}</h3>
                <p className="card-subtitle">{subtitle}</p>
                <p className="card-description">{tagline}</p>
            </div>
        </a>
    );
}

export default ProjectCard;
