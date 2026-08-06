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

function ServiceBlock({ service, index }) {
    const blockRef = useRef(null);
    const fillsRef = useRef([]);

    useEffect(() => {
        const fills = fillsRef.current.filter(Boolean);

        function update() {
            if (!blockRef.current) return;
            const rect = blockRef.current.getBoundingClientRect();
            const vh = window.innerHeight;

            // progress: 0 when block bottom is at viewport bottom, 1 when block top is at viewport top
            const progress = Math.min(1, Math.max(0,
                (vh - rect.top) / (vh + rect.height)
            ));

            fills.forEach((el) => {
                // fill left to right as progress increases
                const pct = Math.round((1 - progress) * 100);
                el.style.clipPath = `inset(0 ${pct}% 0 0)`;
            });
        }

        window.addEventListener("scroll", update, { passive: true });
        update();
        return () => window.removeEventListener("scroll", update);
    }, []);

    const addFill = (el) => { if (el) fillsRef.current.push(el); };

    return (
        <div ref={blockRef} className="service-block">
            <span className="wipe-wrap service-name">
                <span className="wipe-base" aria-hidden="true">{service.name}</span>
                <span className="wipe-fill scroll-fill" ref={addFill}>{service.name}</span>
            </span>

            {service.description && (
                <p className="service-description">{service.description}</p>
            )}

            <div className="service-techs">
                {service.techs.map((tech, ti) => (
                    <span key={ti} className="wipe-wrap service-tech">
                        <span className="wipe-base" aria-hidden="true">{tech}</span>
                        <span className="wipe-fill scroll-fill" ref={addFill}>{tech}</span>
                    </span>
                ))}
            </div>
        </div>
    );
}

function ServicesSection() {
    return (
        <section className="services-section" id="services">
            <div className="section-label-vertical">SERVICES</div>
            <div className="services-body">
                <p className="services-eyebrow mono">// What I build</p>
                <div className="services-list">
                    {SERVICES.map((service, si) => (
                        <ServiceBlock key={si} service={service} index={si} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ServicesSection;
