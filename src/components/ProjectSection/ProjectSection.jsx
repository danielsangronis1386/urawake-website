import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectSection.css";
import ProjectCard from "../ProjectCard";
import ProjectViewer from "../ProjectViewer";
import PROJECTS from "../../data/projects";

// Grid positions: 3 columns, 2 rows
// Each card flies in its natural outward direction from the grid center
const GRID_DIRECTIONS = [
    { tx: "-120vw", ty: "-120vh", rot: "-10deg" }, // 0: top-left     → ↖
    { tx:  "120vw", ty: "-120vh", rot:  "10deg" }, // 1: top-right    → ↗
    { tx: "-120vw", ty:  "120vh", rot:  "10deg" }, // 2: bottom-left  → ↙
    { tx:  "120vw", ty:  "120vh", rot: "-10deg" }, // 3: bottom-right → ↘
];

function getScatterStyle(cardIdx, selectedIdx) {
    if (selectedIdx === null) return {};

    const { tx, ty, rot } = GRID_DIRECTIONS[cardIdx];
    return {
        transform: `translate(${tx}, ${ty}) rotate(${rot})`,
        opacity: 0,
        pointerEvents: "none",
    };
}

function ProjectSection() {
    const [selected, setSelected] = useState(null);
    const [viewerProject, setViewerProject] = useState(null);
    const [showViewer, setShowViewer] = useState(false);
    const [closing, setClosing] = useState(false);
    const navigate = useNavigate();

    const openProject = useCallback((idx) => {
        setSelected(idx);
        setViewerProject(PROJECTS[idx]);
        navigate(`/projects/${PROJECTS[idx].slug}`, { replace: false });
        setTimeout(() => setShowViewer(true), 900);
    }, [navigate]);

    const closeProject = useCallback(() => {
        setShowViewer(false);
        setClosing(true);
        navigate("/#projects", { replace: false });
        setTimeout(() => {
            setSelected(null);
            setViewerProject(null);
            setClosing(false);
        }, 650);
    }, [navigate]);

    const goPrev = useCallback(() => {
        setSelected((prev) => {
            const next = (prev - 1 + PROJECTS.length) % PROJECTS.length;
            setViewerProject(PROJECTS[next]);
            navigate(`/projects/${PROJECTS[next].slug}`, { replace: true });
            return next;
        });
    }, [navigate]);

    const goNext = useCallback(() => {
        setSelected((prev) => {
            const next = (prev + 1) % PROJECTS.length;
            setViewerProject(PROJECTS[next]);
            navigate(`/projects/${PROJECTS[next].slug}`, { replace: true });
            return next;
        });
    }, [navigate]);

    const isScattered = selected !== null; // keep grid borderless during both open AND close

    return (
        <section className="project-section">
            <div className="section-label-vertical">PROJECTS</div>

            <div className="project-body">
            <p className="project-section-subtitle">Selected work from my portfolio</p>

            <div className="project-stage">
                <div className={`project-grid${isScattered ? " grid-scattered" : ""}`}>
                    {PROJECTS.map((project, idx) => {
                        const scatterStyle = closing
                            ? {}
                            : getScatterStyle(idx, selected);

                        return (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={idx}
                                isOpen={isScattered}
                                scatterStyle={scatterStyle}
                                onClick={() => openProject(idx)}
                            />
                        );
                    })}
                </div>

                {showViewer && viewerProject && (
                    <ProjectViewer
                        project={viewerProject}
                        current={selected}
                        total={PROJECTS.length}
                        onClose={closeProject}
                        onPrev={goPrev}
                        onNext={goNext}
                    />
                )}
            </div>
            </div>{/* end project-body */}
        </section>
    );
}

export default ProjectSection;
