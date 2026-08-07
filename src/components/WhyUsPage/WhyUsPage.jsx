import { useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./WhyUsPage.css";

const REASONS = [
    {
        number: "01",
        title: "WE BUILD. WE DON'T TEMPLATE.",
        body: "Every project we've delivered — ToursToDo PR, Eliot's Adventures, Cajamarca — was built from scratch. Custom code, custom design, custom logic. No Wix, no Squarespace, no shortcuts that come back to bite you six months later.",
    },
    {
        number: "02",
        title: "FULL PRESENCE, NOT JUST A PAGE.",
        body: "Our clients don't get a static brochure site. They get booking integrations, CRM tools, SEO foundations, and real infrastructure. ToursToDo runs on a custom Django backend. Eliot's Adventures has a full content management flow. We build for how a business actually operates.",
    },
    {
        number: "03",
        title: "BRAND + DEV UNDER ONE ROOF.",
        body: "Most agencies hand you off between a designer and a developer who've never met. We work together from day one — Janyerlyn handles visual identity, Daniel handles the build. The result is a product where the design and the code speak the same language.",
    },
    {
        number: "04",
        title: "TOURISM + HOSPITALITY IS OUR LANE.",
        body: "We didn't stumble into this industry. Our two main clients are tourism-based businesses in Puerto Rico and the Caribbean. We understand booking flows, seasonal traffic, multilingual audiences, and what actually converts a traveler into a client.",
    },
];

function WhyUsPage() {
    const pageRef = useRef(null);

    useEffect(() => {
        const el = pageRef.current;
        if (!el) return;
        requestAnimationFrame(() => el.classList.add("whyus-entered"));
    }, []);

    return (
        <>
            <Navbar />
            <div className="whyus-page" ref={pageRef}>
                <header className="whyus-header">
                    <div className="whyus-header-inner">
                        <p className="whyus-from mono">// URAWAKE Stackhouse</p>
                        <h1 className="whyus-title">WHY<br />US.</h1>
                        <p className="whyus-sub mono">Real work. Real results. No middlemen.</p>
                    </div>
                </header>

                <div className="whyus-body">
                    {REASONS.map((r) => (
                        <div key={r.number} className="whyus-block whyus-reveal">
                            <span className="whyus-number">{r.number}</span>
                            <div className="whyus-content">
                                <h2 className="whyus-block-title">{r.title}</h2>
                                <p className="whyus-block-body">{r.body}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="whyus-cta whyus-reveal">
                    <p className="whyus-cta-text">Ready to build something real?</p>
                    <a href="/#contact" className="whyus-cta-btn mono">// Get in touch</a>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default WhyUsPage;
