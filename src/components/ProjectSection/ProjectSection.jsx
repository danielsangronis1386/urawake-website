import "./ProjectSection.css";
import ProjectCard from "../ProjectCard";

// ELIOTS ADVENTURE
import ea1 from "../../assets/eliots-adventure/img1.png";
import ea2 from "../../assets/eliots-adventure/img2.png";
import ea3 from "../../assets/eliots-adventure/img3.png";
// TOURSTODO WEBSITE
import tw1 from "../../assets/tourstodo-website/img1.png";
import tw2 from "../../assets/tourstodo-website/img2.png";
import tw3 from "../../assets/tourstodo-website/img3.png";
// TOURSTODO CRM
import crm1 from "../../assets/tourstodo-crm/img1.png";
import crm2 from "../../assets/tourstodo-crm/img2.png";
import crm3 from "../../assets/tourstodo-crm/img3.png";
// CLIENTFLOW IMAGES
import img1 from "../../assets/clientflow/img1.png";
import img2 from "../../assets/clientflow/img2.png";
import img3 from "../../assets/clientflow/img3.png";
// FITNESS TRACKER IMAGES
import ft1 from "../../assets/fitnesstracker/img1.png";
import ft2 from "../../assets/fitnesstracker/img2.png";
import ft3 from "../../assets/fitnesstracker/img3.webp";
// ROLLINGLOG IMAGES
import rl1 from "../../assets/rollinglog/img1.webp";
import rl2 from "../../assets/rollinglog/img2.webp";
import rl3 from "../../assets/rollinglog/img3.webp";

function ProjectSection() {
    return (
        <section className="project-section">

            <h2 className="project-section-title">PROJECTS</h2>
            <p className="project-section-subtitle">Selected work from my portfolio</p>

            {/* PROJECT 1 — Eliot's Adventures */}
            <ProjectCard
                index={0}
                title="Eliot's Adventures"
                subtitle="Puerto Rico Tour & Taxi Website"
                description="Full website for a family-run Puerto Rico tour and taxi service. Features tour listings, travel guides, and online booking — built to reflect 15 years of local expertise across the island."
                images={[ea1, ea2, ea3]}
                stack={["React", "Vite", "Node.js", "Express", "PostgreSQL", "Prisma", "Stripe", "Gmail API", "Heroku"]}
            />

            {/* PROJECT 2 — ToursToDo PR Website */}
            <ProjectCard
                index={1}
                title="ToursToDo PR"
                subtitle="Tour Operator Website"
                description="Public-facing marketing website for ToursToDo Puerto Rico. Includes tour catalog with filters, island guide content, FAQ section, and Stripe-powered booking flow."
                images={[tw1, tw2, tw3]}
                stack={["React", "Vite", "React Router v7", "CSS Modules", "Stripe", "Vercel"]}
            />

            {/* PROJECT 3 — ToursToDo CRM */}
            <ProjectCard
                index={2}
                title="ToursToDo CRM"
                subtitle="Internal Operations Platform"
                description="Custom CRM built for the ToursToDo operations team. Manages leads, bookings, customer segments, email campaigns, and affiliate tracking — with Gmail sync and AI-powered lead qualification."
                images={[crm1, crm2, crm3]}
                stack={["React", "Vite", "Recharts", "Node.js", "Express", "Prisma", "PostgreSQL", "Stripe", "SendGrid", "Heroku"]}
            />

            {/* PROJECT 4–6 hidden for now */}

        </section>
    );
}

export default ProjectSection;
