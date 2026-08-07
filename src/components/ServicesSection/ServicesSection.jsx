import { useEffect, useRef } from "react";
import "./ServicesSection.css";

const SERVICES = [
    {
        name: "FULL STACK",
        description: "End-to-end web applications built for real business needs. Not templates. From database design to UI, built to scale with your operation.",
        techs: ["REACT /", "NODE.JS /", "DJANGO /", "POSTGRESQL /"],
    },
    {
        name: "API INTEGRATION",
        description: "Connect your site to the tools your business already runs on. Payments, email, bookings, and custom webhooks wired up and working from day one.",
        techs: ["STRIPE /", "GMAIL API /", "REST /", "WEBHOOKS /"],
    },
    {
        name: "CRM & TOOLS",
        description: "Custom internal platforms that replace spreadsheets. Leads, bookings, campaigns, and automation built specifically for how your team operates.",
        techs: ["LEADS /", "BOOKINGS /", "CAMPAIGNS /", "AUTOMATION /"],
    },
    {
        name: "BRAND TO WEB",
        description: "From brand identity to live interface. I take your visual language or build it from scratch and turn it into a site that moves, converts, and represents your business at full force.",
        techs: ["IDENTITY → WEB /", "RESPONSIVE /", "MOTION /", "CONVERSION /"],
    },
    {
        name: "DEPLOYMENT",
        description: "Production-ready launches with proper CI/CD pipelines. Your site goes live clean, stays up, and gets updated without friction.",
        techs: ["VERCEL /", "HEROKU /", "NETLIFY /", "CI/CD /"],
    },
];

function ServiceBlock({ service }) {
    return (
        <div className="service-block">
            <span className="wipe-wrap service-name">
                <span className="wipe-base" aria-hidden="true">{service.name}</span>
                <span className="wipe-fill scroll-fill">{service.name}</span>
            </span>

            {service.description && (
                <span className="wipe-wrap service-description-wipe">
                    <p className="wipe-base" aria-hidden="true">{service.description}</p>
                    <p className="wipe-fill scroll-fill">{service.description}</p>
                </span>
            )}

            <div className="service-techs">
                {service.techs.map((tech, ti) => (
                    <span key={ti} className="wipe-wrap service-tech">
                        <span className="wipe-base" aria-hidden="true">{tech}</span>
                        <span className="wipe-fill scroll-fill">{tech}</span>
                    </span>
                ))}
            </div>
        </div>
    );
}

function ServicesSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const fills = Array.from(section.querySelectorAll(".scroll-fill"));

        let ticking = false;
        function update() {
            const vh = window.innerHeight;
            fills.forEach((fill) => {
                const base = fill.previousElementSibling;
                if (!base) return;
                const rect = base.getBoundingClientRect();
                const center = rect.top + rect.height * 0.5;
                const start = vh * 0.92;
                const end = vh * 0.5;
                const progress = Math.min(1, Math.max(0, (start - center) / (start - end)));
                fill.style.clipPath = `inset(0 ${Math.round((1 - progress) * 100)}% 0 0)`;
            });
            ticking = false;
        }

        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(update);
                ticking = true;
            }
        }

        window.addEventListener("scroll", onScroll, { passive: true });
        update();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <section className="services-section" id="services" ref={sectionRef}>
            <div className="section-label-vertical">SERVICES</div>
            <div className="services-body">
                <p className="services-eyebrow mono">// What I build</p>
                <div className="services-list">
                    {SERVICES.map((service, si) => (
                        <ServiceBlock key={si} service={service} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ServicesSection;
