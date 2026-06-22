import "./CtaBanner.css";

function CtaBanner() {
    return (
        <section className="cta-banner">
            <a href="#services" className="cta-banner-link" onClick={(e) => {
                e.preventDefault();
                document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}>
                <p className="cta-banner-text">
                    YOUR NEXT PROJECT STARTS HERE. LET'S BUILD SOMETHING THAT WORKS.
                </p>
                <span className="cta-banner-arrow">→</span>
            </a>
        </section>
    );
}

export default CtaBanner;
