import { useState, useEffect, useRef } from "react";
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
        description: "From brand identity to live interface. I take your visual language or build it from scratch and turn it into a site that moves, converts, and represents your business at full force. I don't do branding, but I work with a designer I trust. If you need it, I can bring her in.",
        techs: ["IDENTITY → WEB /", "RESPONSIVE /", "MOTION /", "CONVERSION /"],
    },
    {
        name: "DEPLOYMENT",
        description: "Production-ready launches with proper CI/CD pipelines. Your site goes live clean, stays up, and gets updated without friction.",
        techs: ["VERCEL /", "HEROKU /", "NETLIFY /", "CI/CD /"],
    },
];

function WipeText({ text, className, delay = 0 }) {
    const [inView, setInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // entering viewport — fill
                    setInView(true);
                } else {
                    // leaving viewport — only unfill if exiting from the BOTTOM
                    // (user scrolled back up), keep filled if exiting from top (scrolled past)
                    if (entry.boundingClientRect.top > 0) {
                        setInView(false);
                    }
                }
            },
            { threshold: 0.15 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <span
            ref={ref}
            className={`wipe-wrap ${className}${inView ? " in-view" : ""}`}
            style={{ "--delay": `${delay}ms` }}
        >
            <span className="wipe-base" aria-hidden="true">{text}</span>
            <span className="wipe-fill">{text}</span>
        </span>
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
                    <div key={si} className="service-block">
                        <WipeText
                            text={service.name}
                            className="service-name"
                            delay={0}
                        />
                        {service.description && (
                            <p className="service-description">{service.description}</p>
                        )}
                        <div className="service-techs">
                            {service.techs.map((tech, ti) => (
                                <WipeText
                                    key={ti}
                                    text={tech}
                                    className="service-tech"
                                    delay={ti * 80}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            </div>{/* end services-body */}

        </section>
    );
}

export default ServicesSection;
