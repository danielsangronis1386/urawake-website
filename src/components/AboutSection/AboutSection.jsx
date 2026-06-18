import "./AboutSection.css"
import portrait from "../../assets/about/Daniel Sangronis.png"
import janyerlyn from "../../assets/about/janyerlyn morales.png"

function AboutSection() {
    return (
        <section className="about-section" id="about">

            {/* ── STUDIO INTRO ── */}
            <div className="about-studio-intro">
                <h2 className="about-title">ABOUT</h2>

                <p className="about-bio">
                    <span className="bio-em">URAWAKE Stackhouse</span> is a web development studio based in <span className="bio-em">Los Angeles, California</span>.
                    We design and build full digital presences for <span className="bio-em">startups and small businesses</span> that need more than a template —
                    brands that need to exist, function, and convert from day one.
                </p>
                <p className="about-bio">
                    We come in at the brand level: <span className="bio-em">identity, graphic design, development, and delivery</span>.
                    Our main clientele is in <span className="bio-em">tourism and hospitality</span>, but we take on projects across industries
                    and work with clients across the <span className="bio-em">United States</span>.
                </p>
                <p className="about-bio">
                    Every element on every page earns its place.
                    No filler, no static blocks. <span className="bio-em">Motion, interaction, and structure</span> that actually works.
                </p>
            </div>

            {/* ── DANIEL ── */}
            <div className="about-left">
                <img src={portrait} alt="Daniel Sangronis" className="portrait-img" width="400" height="500" />
            </div>

            <div className="about-right">
                <div className="team-member-label">// Founder & Developer</div>
                <h2 className="about-title">DANIEL<br />SANGRONIS</h2>

                <p className="about-bio">
                    I architect and build everything the studio ships — from <span className="bio-em">React frontends</span> to
                    <span className="bio-em"> backend APIs, databases, and deployment</span>.
                    If it runs in a browser or on a server, that's my side of the table.
                </p>
                <p className="about-bio">
                    I started building in late 2025 and have spent the last year turning that into real client work —
                    full digital presences for businesses that had none.
                </p>

                <div className="about-links">
                    <a href="https://github.com/danielsangronis1386" target="_blank" rel="noopener noreferrer" className="about-link mono">// GitHub</a>
                    <a href="https://www.linkedin.com/in/daniel-sangronis-65210117a/" target="_blank" rel="noopener noreferrer" className="about-link mono">// LinkedIn</a>
                </div>

                <p className="skills-label">// Stack</p>
                <div className="skills-grid">
                    <div className="skill-item">JavaScript</div>
                    <div className="skill-item">React</div>
                    <div className="skill-item">Python</div>
                    <div className="skill-item">Django</div>
                    <div className="skill-item">Node.js</div>
                    <div className="skill-item">PostgreSQL</div>
                    <div className="skill-item">REST APIs</div>
                    <div className="skill-item">Git</div>
                </div>
            </div>

            {/* ── LEO ── */}
            <div className="about-left about-left--placeholder">
                <div className="portrait-placeholder">LC</div>
            </div>

            <div className="about-right">
                <div className="team-member-label">// Project Manager</div>
                <h2 className="about-title">LEO<br />CALDERA</h2>

                <p className="about-bio">
                    Leo is the bridge between the studio and the client.
                    He handles <span className="bio-em">project scoping, client relations, and delivery coordination</span> —
                    making sure every project starts with the right brief and ends with a satisfied client.
                </p>
                <p className="about-bio">
                    He is the one who finds the opportunities, qualifies them, and keeps the team aligned from kickoff to launch.
                    No project moves without his sign-off on scope.
                </p>
            </div>

            {/* ── JANYERLYN ── */}
            <div className="about-left">
                <img src={janyerlyn} alt="Janyerlyn Morales" className="portrait-img" width="400" height="500" />
            </div>

            <div className="about-right">
                <div className="team-member-label">// Graphic Designer</div>
                <h2 className="about-title">JANYERLYN<br />MORALES</h2>

                <p className="about-bio">
                    I'm Venezuelan and I specialize in <span className="bio-em">graphic design and illustration</span>.
                    My work focuses on <span className="bio-em">visual identity</span>, packaging, social media content,
                    and illustration for brands across different industries.
                </p>
                <p className="about-bio">
                    I believe design should be <span className="bio-em">aesthetically compelling</span> and
                    above all <span className="bio-em">authentic</span>, because it's through design that a brand's
                    value, soul, and personality truly come through.
                </p>

                <p className="skills-label">// Brands</p>
                <div className="about-brands">
                    <span className="brand-tag">ToursToDo PR</span>
                    <span className="brand-tag">Eliot's Adventures</span>
                </div>

                <div className="about-links">
                    <a href="https://www.behance.net/papillographic" target="_blank" rel="noopener noreferrer" className="about-link mono">// Behance</a>
                </div>

                <p className="skills-label">// Tools</p>
                <div className="skills-grid">
                    <div className="skill-item">Adobe Illustrator</div>
                    <div className="skill-item">Adobe Photoshop</div>
                    <div className="skill-item">Adobe Premiere</div>
                    <div className="skill-item">Branding</div>
                    <div className="skill-item">Illustration</div>
                    <div className="skill-item">Packaging</div>
                    <div className="skill-item">Social Media</div>
                    <div className="skill-item">Video Editing</div>
                </div>
            </div>

        </section>
    )
}

export default AboutSection;
