import "./PitchSection.css";

/* What we do and the one thing to click. Sits right after the work,
   so the claim lands once the visitor has seen the proof. */
function PitchSection() {
    return (
        <section className="pitch-section" aria-labelledby="pitch-heading">
            <div className="pitch">
                <h2 id="pitch-heading" className="pitch-headline">
                    Websites, online stores and booking systems for small businesses.
                </h2>
                <div className="pitch-actions">
                    <a href="/#estimate" className="pitch-btn" onClick={(e) => jumpTo(e, "estimate")}>
                        Get an instant estimate →
                    </a>
                </div>
            </div>
        </section>
    );
}

/* Glide to the section in place; the href stays a real link for crawlers. */
function jumpTo(e, id) {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    window.history.pushState(null, "", `#${id}`);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}

export default PitchSection;
