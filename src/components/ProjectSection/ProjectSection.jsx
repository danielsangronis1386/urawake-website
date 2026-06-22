import { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ProjectSection.css";
import ProjectCard from "../ProjectCard";
import ProjectViewer from "../ProjectViewer";
import PROJECTS from "../../data/projects";

// Desktop: cards fly outward diagonally
const GRID_DIRECTIONS = [
    { tx: "-120vw", ty: "-120vh", rot: "-10deg" },
    { tx:  "120vw", ty: "-120vh", rot:  "10deg" },
    { tx: "-120vw", ty:  "120vh", rot:  "10deg" },
    { tx:  "120vw", ty:  "120vh", rot: "-10deg" },
];

// Mobile: cards fly up or down (no horizontal)
const GRID_DIRECTIONS_MOBILE = [
    { tx: "0", ty: "-130vh", rot: "0deg" },
    { tx: "0", ty: "-130vh", rot: "0deg" },
    { tx: "0", ty:  "130vh", rot: "0deg" },
    { tx: "0", ty:  "130vh", rot: "0deg" },
];

function getScatterStyle(cardIdx, selectedIdx) {
    if (selectedIdx === null) return {};

    const isMobile = window.innerWidth <= 768;
    const dirs = isMobile ? GRID_DIRECTIONS_MOBILE : GRID_DIRECTIONS;
    const { tx, ty, rot } = dirs[cardIdx] || dirs[0];
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
    const location = useLocation();

    useEffect(() => {
        const slug = location.state?.openProject;
        if (!slug) return;
        const idx = PROJECTS.findIndex((p) => p.caseStudySlug === slug);
        if (idx === -1) return;
        // scroll to projects section then open viewer
        const el = document.getElementById("projects");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => {
            setSelected(idx);
            setViewerProject(PROJECTS[idx]);
            window.history.replaceState(null, "", `/projects/${PROJECTS[idx].slug}`);
            setTimeout(() => setShowViewer(true), 900);
        }, 400);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
