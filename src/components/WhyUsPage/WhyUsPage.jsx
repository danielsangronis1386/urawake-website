import { useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import TerminalCTA from "../TerminalCTA/TerminalCTA";
import "./WhyUsPage.css";

const REASONS = [
    {
        number: "01",
        title: "INSPIRATION FROM THE BEST. BUILT FOR YOU.",
        body: "We study what works across the web, then throw out everything that doesn't fit your business. Custom code, custom logic, built around how you actually operate. We don't drag and drop and call it a website.",
    },
    {
        number: "02",
        title: "WE DON'T END WHEN THE PROJECT DOES.",
        body: "ToursToDo runs on a Django backend we still maintain. Eliot's Adventures has a CRM we keep updated. We stay in it with you after launch because a website that nobody touches eventually breaks, and we'd rather not let that happen to something we built.",
    },
    {
        number: "03",
        title: "BRAND AND DEV. SAME TEAM. SAME GOAL.",
        body: "Janyerlyn owns the visual identity. Daniel owns the code. Both working on the same project at the same time. What we ship looks intentional because the person who designed it and the person who built it were in the same room.",
    },
    {
        number: "04",
        title: "WE KNOW TOURISM. WE LEARN EVERYTHING ELSE.",
        body: "Most of our work has been in tourism and hospitality. We know booking flows, seasonal traffic, and what it takes to convert a visitor into a paying customer. But the approach works across industries and we take on projects outside our lane when the problem is interesting enough.",
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
                        <h1 className="whyus-title">WHY<br />US?</h1>
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
                    <TerminalCTA line="Tell us your pain points. We got you." />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default WhyUsPage;
