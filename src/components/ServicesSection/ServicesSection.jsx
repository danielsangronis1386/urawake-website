import { useEffect, useRef } from "react";
import "./ServicesSection.css";

const TAGLINE = "Websites and systems built around how your business runs.";

const SERVICES = [
    {
        name: "FULL STACK",
        description: "Web applications written around how your business actually runs, from the database to the screen. No page builders, no templates.",
        techs: ["REACT /", "NODE.JS /", "DJANGO /", "POSTGRESQL /"],
    },
    {
        name: "API INTEGRATION",
        description: "Your site talking to the tools you already pay for. Stripe takes the payment, your inbox and email platform stay in sync, booking and shipping tools plug in, and webhooks carry the rest.",
        techs: ["STRIPE /", "GMAIL API /", "REST /", "WEBHOOKS /"],
    },
    {
        name: "CRM & TOOLS",
        description: "Internal platforms that replace the spreadsheet and the inbox. Customers, orders, bookings, and email campaigns, laid out the way your team already works.",
        techs: ["LEADS /", "BOOKINGS /", "CAMPAIGNS /", "AUTOMATION /"],
    },
    {
        name: "BRAND TO WEB",
        description: "Bring your visual identity, or build one with Janyerlyn first. Either way it ends up as a site that looks like your business and is easy to buy from.",
        techs: ["IDENTITY → WEB /", "RESPONSIVE /", "MOTION /", "CONVERSION /"],
    },
    {
        name: "DEPLOYMENT",
        description: "Launched on Vercel or Heroku with automatic deploys, so a fix or a new page goes live without taking the site down.",
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
                <p className="services-eyebrow mono">What we build</p>

                {/* Moved out of the hero: this is where a visitor is actually
                    asking what the studio does. Wipes in like the rest. */}
                <span className="wipe-wrap services-intro">
                    <p className="wipe-base" aria-hidden="true">{TAGLINE}</p>
                    <p className="wipe-fill scroll-fill">{TAGLINE}</p>
                </span>
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
