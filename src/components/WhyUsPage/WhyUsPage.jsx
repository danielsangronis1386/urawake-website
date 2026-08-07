import { useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./WhyUsPage.css";

const REASONS = [
    {
        number: "01",
        title: "WE BUILD. WE DON'T TEMPLATE.",
        body: "ToursToDo PR, Eliot's Adventures, Cajamarca. Every project was coded from zero. Custom logic, custom design, built around what that specific business needs. We don't drag and drop and call it a website.",
    },
    {
        number: "02",
        title: "FULL PRESENCE, NOT JUST A PAGE.",
        body: "ToursToDo runs on a Django backend we built and maintain. Eliot's Adventures has a full CRM to manage bookings and customer data. Our clients don't get a page, they get a working system that fits how their business actually runs day to day.",
    },
    {
        number: "03",
        title: "BRAND AND DEV, SAME TEAM.",
        body: "Janyerlyn handles the visual identity. Daniel handles the code. We work on the same project at the same time, not handing files back and forth between strangers. That's why what we ship looks intentional, because it is.",
    },
    {
        number: "04",
        title: "TOURISM IS WHAT WE KNOW.",
        body: "Both of our main clients are in tourism and hospitality. We know the booking flows, the seasonal pressure, the need to convert a visitor who found you on Google into someone who actually pays. We've solved those problems before and we know where the gaps are.",
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
