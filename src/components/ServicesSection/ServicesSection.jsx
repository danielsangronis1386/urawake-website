import React from 'react';
import './ServicesSection.css';

const ServicesSection = () => {
    const services = [
        {
            title: "WEB DEVELOPMENT",
            description: "Building robust, scalable websites that drive growth and engagement.",
            capabilities: [
                "Marketing websites",
                "Landing pages",
                "Portfolio sites",
                "Small business websites",
                "Responsive layouts"
            ]
        },
        {
            title: "WEB APPLICATIONS",
            description: "Creating functional digital tools to streamline operations and user experiences.",
            capabilities: [
                "React front-end interfaces",
                "Dashboards",
                "Simple CRMs",
                "Internal tools",
                "API-driven UIs"
            ]
        },
        {
            title: "BRAND + DIGITAL STRATEGY",
            description: "Defining the core structure and direction for your digital presence.",
            capabilities: [
                "Information architecture",
                "UX structure",
                "Content clarity",
                "Brand direction",
                "Collaboration with designers"
            ]
        }
    ];

    return (
        <section className="services-section">
            <div className="services-header">
                <h2>SERVICES</h2>
                <p>Comprehensive digital solutions for modern businesses</p>
            </div>

            <div className="services-grid">
                {services.map((service, index) => (
                    <div key={index} className="service-block">
                        <h3>{service.title}</h3>
                        <p className="service-description">{service.description}</p>
                        <ul className="service-capabilities">
                            {service.capabilities.map((cap, i) => (
                                <li key={i}>{cap}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="services-cta">
                <button className="services-cta-btn">START A PROJECT</button>
            </div>
        </section>
    );
};

export default ServicesSection;
