import { useState, useEffect, useRef } from "react";
import "./ServicesSection.css";

const SERVICES = [
    {
        name: "FULL STACK",
        techs: ["REACT /", "NODE.JS /", "DJANGO /", "POSTGRESQL /"],
    },
    {
        name: "API INTEGRATION",
        techs: ["STRIPE /", "GMAIL API /", "REST /", "WEBHOOKS /"],
    },
    {
        name: "CRM & TOOLS",
        techs: ["LEADS /", "BOOKINGS /", "CAMPAIGNS /", "AUTOMATION /"],
    },
    {
        name: "UI / UX BUILD",
        techs: ["FIGMA → CODE /", "RESPONSIVE /", "BRUTALIST /", "MOTION /"],
    },
    {
        name: "DEPLOYMENT",
        techs: ["VERCEL /", "HEROKU /", "NETLIFY /", "CI/CD /"],
    },
];

function WipeText({ text, className, delay = 0 }) {
    const [inView, setInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold: 0.5 }
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

            <div className="services-header">
                <h2 className="services-title">SERVICES</h2>
                <p className="services-eyebrow mono">// What I build</p>
            </div>

            <div className="services-list">
                {SERVICES.map((service, si) => (
                    <div key={si} className="service-block">
                        <WipeText
                            text={service.name}
                            className="service-name"
                            delay={0}
                        />
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

        </section>
    );
}

export default ServicesSection;
