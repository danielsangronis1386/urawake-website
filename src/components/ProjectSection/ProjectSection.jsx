import { useState, useCallback } from "react";
import "./ProjectSection.css";
import ProjectCard from "../ProjectCard";
import ProjectViewer from "../ProjectViewer";

import ea1 from "../../assets/eliots-adventure/img1.jpg";
import ea2 from "../../assets/eliots-adventure/img2.jpg";
import ea3 from "../../assets/eliots-adventure/img3.jpg";
import tw1 from "../../assets/tourstodo-website/img1.jpg";
import tw2 from "../../assets/tourstodo-website/img2.jpg";
import tw3 from "../../assets/tourstodo-website/img3.jpg";
import crm1 from "../../assets/tourstodo-crm/img1.png";
import crm2 from "../../assets/tourstodo-crm/img2.png";
import crm3 from "../../assets/tourstodo-crm/img3.png";
import img1 from "../../assets/clientflow/img1.png";
import img2 from "../../assets/clientflow/img2.png";
import img3 from "../../assets/clientflow/img3.png";
import ft1 from "../../assets/fitnesstracker/img1.jpg";
import ft2 from "../../assets/fitnesstracker/img2.jpg";
import ft3 from "../../assets/fitnesstracker/img3.webp";
import rl1 from "../../assets/rollinglog/img1.webp";
import rl2 from "../../assets/rollinglog/img2.webp";
import rl3 from "../../assets/rollinglog/img3.webp";

const PROJECTS = [
    {
        id: 0,
        title: "Eliot's Adventures",
        subtitle: "Puerto Rico Tour & Taxi Website",
        tagline: "15 years of the island, one booking away.",
        description: "Full website for a family-run Puerto Rico tour and taxi service. Features tour listings, travel guides, and online booking — built to reflect 15 years of local expertise across the island.",
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
        description: "Custom CRM built for the ToursToDo operations team. Manages leads, bookings, customer segments, email campaigns, and affiliate tracking — with Gmail sync and AI-powered lead qualification.",
        images: [crm1, crm2, crm3],
        stack: ["React", "Vite", "Recharts", "Node.js", "Express", "Prisma", "PostgreSQL", "Stripe", "SendGrid", "Heroku"],
    },
    {
        id: 3,
        title: "ClientFlow",
        subtitle: "Client Management Dashboard",
        tagline: "Your freelance business, finally organized.",
        description: "Lightweight CRM and project tracker for freelancers. Manage clients, track project status, log billable hours, and generate invoices — all in one place.",
        images: [img1, img2, img3],
        stack: ["React", "Vite", "Node.js", "Express", "PostgreSQL", "Prisma"],
    },
    {
        id: 4,
        title: "Fitness Tracker",
        subtitle: "Workout Logging App",
        tagline: "Every rep logged. Every record broken.",
        description: "Mobile-first fitness app for tracking daily workouts, sets, reps, and personal records. Includes progress charts and a custom exercise library.",
        images: [ft1, ft2, ft3],
        stack: ["React", "Vite", "Recharts", "Node.js", "Express", "PostgreSQL"],
    },
    {
        id: 5,
        title: "RollingLog",
        subtitle: "Travel Journal Platform",
        tagline: "Map your journey. Keep it forever.",
        description: "A travel journaling platform where users document trips with geotagged entries, photos, and route maps. Built for both personal logging and public sharing.",
        images: [rl1, rl2, rl3],
        stack: ["React", "Vite", "Mapbox GL", "Node.js", "Express", "PostgreSQL", "Cloudinary"],
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

// All cards scatter — selected goes straight up/back, others fly sideways
const OFFSETS = [
    { tx: "0",      ty: "-120px", rot:  "0deg"  }, // selected: up
    { tx: "-120vw", ty: "-80px",  rot: "-8deg"  },
    { tx:  "130vw", ty: "-50px",  rot:  "6deg"  },
    { tx:  "-90vw", ty:  "100px", rot: "-11deg" },
    { tx:  "110vw", ty:   "70px", rot:   "9deg" },
    { tx: "-140vw", ty:  "-30px", rot:  "-5deg" },
    { tx:  "100vw", ty:  "120px", rot:   "7deg" },
];

function getScatterStyle(cardIdx, selectedIdx) {
    if (selectedIdx === null) return {};

    if (cardIdx === selectedIdx) {
        return {
            transform: "translateY(-80px) scale(0.92)",
            opacity: 0,
            pointerEvents: "none",
        };
    }

    const diff = ((cardIdx - selectedIdx) % OFFSETS.length + OFFSETS.length) % OFFSETS.length;
    const { tx, ty, rot } = OFFSETS[diff] ?? OFFSETS[1];

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
