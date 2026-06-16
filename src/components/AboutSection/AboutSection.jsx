import "./AboutSection.css"
import portrait from "../../assets/about/338448695_890247788711486_6640237707443073491_n.jpg"

function AboutSection() {
    return (
        <section className="about-section">
            {/* LEFT COLUMN */}
            <div className="about-left">
                <img src={portrait} alt="Daniel Sangronis" className="portrait-img" width="400" height="500" />
            </div>

            {/* RIGHT COLUMN */}
            <div className="about-right">
                <h2 className="about-title">ABOUT</h2>

                <p className="about-bio">
                    I'm Daniel Sangronis, a web developer and creative director based in Los Angeles, California.
                    I started building in late 2025 and have spent the last year turning that into real client work —
                    designing and developing full digital presences for businesses that had none.
                </p>
                <p className="about-bio">
                    My focus is startups and small businesses that need more than just a website. I come in at the
                    brand level — identity, graphic design, copywriting direction — and build everything through to
                    a live, fast, functional product. I've worked primarily in the tourism and hospitality space,
                    building booking systems, CRMs, and marketing sites for operators in Puerto Rico.
                </p>
                <p className="about-bio">
                    What I care about: every page element should earn its place. No filler, no static blocks —
                    motion, interaction, and structure that actually converts.
                </p>

                <div className="about-links">
                    <a
                        href="https://github.com/danielsangronis1386"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="about-link mono"
                    >
                        // GitHub
                    </a>
                    <a
                        href="https://www.linkedin.com/in/daniel-sangronis-65210117a/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="about-link mono"
                    >
                        // LinkedIn
                    </a>
                </div>

                <p className="skills-label">// Stack</p>

                <div className="skills-grid">
                    <div className="skill-item">JavaScript</div>
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
