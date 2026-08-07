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

function WipeText({ children, className = "", as: Tag = "span" }) {
    const baseRef = useRef(null);
    const fillRef = useRef(null);

    useEffect(() => {
        const fill = fillRef.current;
        const base = baseRef.current;
        if (!fill || !base) return;

        function update() {
            const rect = base.getBoundingClientRect();
            const vh = window.innerHeight;
            const center = rect.top + rect.height * 0.5;
            const start = vh * 0.92;
            const end = vh * 0.5;
            const progress = Math.min(1, Math.max(0, (start - center) / (start - end)));
            fill.style.clipPath = `inset(0 ${Math.round((1 - progress) * 100)}% 0 0)`;
        }

        window.addEventListener("scroll", update, { passive: true });
        update();
        return () => window.removeEventListener("scroll", update);
    }, []);

    return (
        <span className={`wipe-wrap ${className}`}>
            <Tag className="wipe-base" ref={baseRef} aria-hidden="true">{children}</Tag>
            <Tag className="wipe-fill scroll-fill" ref={fillRef}>{children}</Tag>
        </span>
    );
}

function ServiceBlock({ service }) {
    return (
        <div className="service-block">
            <WipeText className="service-name">{service.name}</WipeText>

            {service.description && (
                <WipeText className="service-description-wipe" as="p">
                    {service.description}
                </WipeText>
            )}

            <div className="service-techs">
                {service.techs.map((tech, ti) => (
                    <WipeText key={ti} className="service-tech">{tech}</WipeText>
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
                        <ServiceBlock key={si} service={service} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ServicesSection;
