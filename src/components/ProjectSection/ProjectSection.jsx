import { useState, useCallback } from "react";
import "./ProjectSection.css";
import ProjectCard from "../ProjectCard";
import ProjectViewer from "../ProjectViewer";

import ea1 from "../../assets/eliots-adventure/eliots 1.png";
import ea2 from "../../assets/eliots-adventure/eliots 2.png";
import ea3 from "../../assets/eliots-adventure/eliots 3.png";
import tw1 from "../../assets/tourstodo-website/tours2do 1.png";
import tw2 from "../../assets/tourstodo-website/tours2do 2.png";
import tw3 from "../../assets/tourstodo-website/tours2do 3.png";
import crm1 from "../../assets/tourstodo-crm/img1.png";
import crm2 from "../../assets/tourstodo-crm/img2.png";
import crm3 from "../../assets/tourstodo-crm/img3.png";
import ecrm1 from "../../assets/eliots-adventure/eliotscrm1.png";
import ecrm2 from "../../assets/eliots-adventure/eliotscrm2.png";
import ecrm3 from "../../assets/eliots-adventure/eliotscrm3.png";

const PROJECTS = [
    {
        id: 0,
        title: "Eliot's Adventures",
        subtitle: "Puerto Rico Tour & Taxi Website + CRM",
        tagline: "15 years of the island, one booking away.",
        description: "Full website and custom CRM for a family-run Puerto Rico tour and taxi service. The public site features tour listings, travel guides, and online booking. The internal CRM manages bookings, customer records, and communications. Built to reflect 15 years of local expertise across the island.",
        liveUrl: "https://www.eliotsadventures.com/",
        images: [ea1, ea2, ea3],
        stack: ["React", "Vite", "Node.js", "Express", "PostgreSQL", "Prisma", "Stripe", "Gmail API", "Heroku"],
    },
    {
        id: 1,
        title: "ToursToDo PR",
        subtitle: "Tour Operator Website",
        tagline: "Discover Puerto Rico, tour by tour.",
        description: "Public-facing marketing website for ToursToDo Puerto Rico. Includes tour catalog with filters, island guide content, FAQ section, and Stripe-powered booking flow.",
        images: [tw1, tw2, tw3],
        stack: ["React", "Vite", "React Router v7", "CSS Modules", "Stripe", "Vercel"],
    },
    {
        id: 2,
        title: "ToursToDo CRM",
        subtitle: "Internal Operations Platform",
        tagline: "Operations at full speed, zero spreadsheets.",
        description: "Custom CRM built for the ToursToDo operations team. Manages leads, bookings, customer segments, email campaigns, and affiliate tracking. Includes Gmail sync and AI-powered lead qualification.",
        images: [crm1, crm2, crm3],
        stack: ["React", "Vite", "Recharts", "Node.js", "Express", "Prisma", "PostgreSQL", "Stripe", "SendGrid", "Heroku"],
    },
    {
        id: 3,
        title: "Eliot's CRM",
        subtitle: "Internal Booking & Customer Platform",
        tagline: "Every tour, every customer. One dashboard.",
        description: "Custom CRM built for the Eliot's Adventures operations team. Manages tour bookings, customer records, taxi requests, and communications. Includes Gmail integration and a real-time booking calendar.",
        images: [ecrm1, ecrm2, ecrm3],
        stack: ["React", "Vite", "Node.js", "Express", "PostgreSQL", "Prisma", "Gmail API", "Heroku"],
    },
];

// Scatter directions: for each selected index, define where each other card flies
const SCATTER = [
    [-1, 0, 1, -1, 0, 1].map((x, i) => ({
        tx: `${(i % 2 === 0 ? -1 : 1) * (110 + i * 15)}vw`,
        ty: `${(i % 3 === 0 ? -1 : 1) * (60 + i * 20)}px`,
        rot: `${(i % 2 === 0 ? -1 : 1) * (6 + i * 2)}deg`,
    })),
];

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
        // Wait for last card to finish: 5 * 60ms delay + 550ms animation
        setTimeout(() => setShowViewer(true), 900);
    }, []);

    const closeProject = useCallback(() => {
        setShowViewer(false);
        setClosing(true);
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
            return next;
        });
    }, []);

    const goNext = useCallback(() => {
        setSelected((prev) => {
            const next = (prev + 1) % PROJECTS.length;
            setViewerProject(PROJECTS[next]);
            return next;
        });
    }, []);

    const isScattered = selected !== null; // keep grid borderless during both open AND close

    return (
        <section className="project-section">
            <h2 className="project-section-title">PROJECTS</h2>
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
        </section>
    );
}

export default ProjectSection;
