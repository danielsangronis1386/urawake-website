function AboutSection() {
    return (
        <section className="about-section">
            {/* LEFT COLUMN */}
            <div className="about-left">
                <div className="portrait-placeholder">PORTRAIT</div>

            </div>

            {/* RIGHT COLUMN */}
            <div className="about-right">

                <h2 className ="about-title">ABOUT</h2>

                <p className="about-bio">
                    I'm Daniel Sangronis, a web developer focused on building clean,
                    functional interfaces and simple digital system for small bussiness.
                    I care about clarity, structure, and creating tools that solve
                    real problems.
                </p>

                <div className="skills-grid">
                    <div className="skill-item">JavasScript</div>
                    <div className="skill-item">React</div>
                    <div className="skill-item">Python</div>
                    <div className="skill-item">Django</div>
                    <div className="skill-item">HTML</div>
                    <div className="skill-item">CSS</div>
                    <div className="skill-item">REST APIs</div>
                    <div className="skill-item">Git</div>
                </div>

            </div>
        </section>
    )
}

export default AboutSection;