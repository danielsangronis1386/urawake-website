import ea1 from "../assets/eliots-adventure/eliots 1.png";
import ea2 from "../assets/eliots-adventure/eliots 2.png";
import ea3 from "../assets/eliots-adventure/eliots 3.png";
import tw1 from "../assets/tourstodo-website/tours2do 1.png";
import tw2 from "../assets/tourstodo-website/tours2do 2.png";
import tw3 from "../assets/tourstodo-website/tours2do 3.png";
import crm1 from "../assets/tourstodo-crm/img1.png";
import crm2 from "../assets/tourstodo-crm/img2.png";
import crm3 from "../assets/tourstodo-crm/img3.png";
import ecrm1 from "../assets/eliots-adventure/eliotscrm1.png";
import ecrm2 from "../assets/eliots-adventure/eliotscrm2.png";
import ecrm3 from "../assets/eliots-adventure/eliotscrm3.png";

const PROJECTS = [
    {
        id: 0,
        slug: "eliots-adventures",
        title: "Eliot's Adventures",
        subtitle: "Puerto Rico Tour & Taxi Website + CRM",
        tagline: "15 years of the island, one booking away.",
        description: "Full website and custom CRM for a family-run Puerto Rico tour and taxi service. The public site features tour listings, travel guides, and online booking. The internal CRM manages bookings, customer records, and communications. Built to reflect 15 years of local expertise across the island.",
        liveUrl: "https://www.eliotsadventures.com/",
        caseStudySlug: "eliots-adventures",
        images: [ea1, ea2, ea3],
        stack: ["React", "Vite", "Node.js", "Express", "PostgreSQL", "Prisma", "Stripe", "Gmail API", "Heroku"],
    },
    {
        id: 1,
        slug: "tourstodo-pr",
        title: "ToursToDo PR",
        subtitle: "Tour Operator Website",
        tagline: "Discover Puerto Rico, tour by tour.",
        description: "Public-facing marketing website for ToursToDo Puerto Rico. Includes tour catalog with filters, island guide content, FAQ section, and Stripe-powered booking flow.",
        images: [tw1, tw2, tw3],
        stack: ["React", "Vite", "React Router v7", "CSS Modules", "Stripe", "Vercel"],
    },
    {
        id: 2,
        slug: "tourstodo-crm",
        title: "ToursToDo CRM",
        subtitle: "Internal Operations Platform",
        tagline: "Operations at full speed, zero spreadsheets.",
        description: "Custom CRM built for the ToursToDo operations team. Manages leads, bookings, customer segments, email campaigns, and affiliate tracking. Includes Gmail sync and AI-powered lead qualification.",
        images: [crm1, crm2, crm3],
        stack: ["React", "Vite", "Recharts", "Node.js", "Express", "Prisma", "PostgreSQL", "Stripe", "SendGrid", "Heroku"],
        caseStudySlug: "tourstodopr",
    },
    {
        id: 3,
        slug: "eliots-crm",
        title: "Eliot's CRM",
        subtitle: "Internal Booking & Customer Platform",
        tagline: "Every tour, every customer. One dashboard.",
        description: "Custom CRM built for the Eliot's Adventures operations team. Manages tour bookings, customer records, taxi requests, and communications. Includes Gmail integration and a real-time booking calendar.",
        images: [ecrm1, ecrm2, ecrm3],
        stack: ["React", "Vite", "Node.js", "Express", "PostgreSQL", "Prisma", "Gmail API", "Heroku"],
        caseStudySlug: "eliots-crm",
    },
];

export default PROJECTS;
