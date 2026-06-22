import { useState, useCallback } from "react";
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

    const openProject = useCallback((idx) => {
        setSelected(idx);
        setViewerProject(PROJECTS[idx]);
        window.history.pushState(null, "", `/projects/${PROJECTS[idx].slug}`);
        setTimeout(() => setShowViewer(true), 900);
    }, []);

    const closeProject = useCallback(() => {
        setShowViewer(false);
        setClosing(true);
        window.history.pushState(null, "", "/#projects");
        setTimeout(() => {
            setSelected(null);
            setViewerProject(null);
            setClosing(false);
        }, 650);
    }, []);

    const goPrev = useCallback(() => {
        setSelected((prev) => {
            const next = (prev - 1 + PROJECTS.length) % PROJECTS.length;
            setViewerProject(PROJECTS[next]);
            window.history.replaceState(null, "", `/projects/${PROJECTS[next].slug}`);
            return next;
        });
    }, []);

    const goNext = useCallback(() => {
        setSelected((prev) => {
            const next = (prev + 1) % PROJECTS.length;
            setViewerProject(PROJECTS[next]);
            window.history.replaceState(null, "", `/projects/${PROJECTS[next].slug}`);
            return next;
        });
    }, []);

    const isScattered = selected !== null; // keep grid borderless during both open AND close

    return (
        <section className="project-section" id="projects">
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
