import { useEffect, useRef } from "react";
import "./AboutSection.css"
import portrait from "../../assets/about/Daniel Sangronis.jpg"
import janyerlyn from "../../assets/about/janyerlyn morales.jpg"

// `asPage` marks the standalone /team route, where the section needs to carry
// the page's h1. On the homepage it stays a section under the hero's h1.
function AboutSection({ asPage = false }) {
    const sectionRef = useRef(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        requestAnimationFrame(() => {
            el.classList.add("team-entered");
        });
    }, []);

    return (
        <section className="about-section" id="about" ref={sectionRef}>

            <div className="section-label-vertical">TEAM</div>

            {asPage && (
                <h1 className="sr-only">
                    Meet the team behind URAWAKE Stackhouse: Daniel Sangronis and Janyerlyn Morales
                </h1>
            )}

            <div className="about-grid">

            {/* ── DANIEL ── */}
            <div className="about-left team-reveal" style={{ "--delay": "0s" }}>
                <div className="collage-card">
                    <div className="collage-bg collage-bg--cyan" />
                    <div className="collage-word collage-word--back">AWAKE</div>
                    <div className="collage-photo-wrap">
                        <img src={portrait} alt="Daniel Sangronis" className="portrait-img" decoding="async" />
                    </div>
                    <div className="collage-word collage-word--front">AWAKE</div>
                </div>
            </div>

            <div className="about-right team-reveal" style={{ "--delay": "0.1s" }}>
                <div className="team-member-label">Developer</div>
                <h2 className="about-title">DANIEL<br />SANGRONIS</h2>

                <div className="about-bio-group">
                <p className="about-bio">
                    I'm Daniel Sangronis, a web developer and creative director based in Los Angeles, California.
                    I started building in late 2025 and have spent the last year turning that into real client work,
                    designing and developing full digital presences for businesses that had none.
                </p>
                <p className="about-bio">
                    My focus is startups and small businesses that need more than just a website.
                    I work across the United States building UI/UX, from structure and interaction
                    to a live, fast, functional product. When a project needs brand direction, I collaborate with
                    graphic designers and creatives, guiding the visual identity and copywriting as creative director.
                    My main clientele is in tourism and hospitality, but I take on projects across industries.
                </p>
                <p className="about-bio">
                    What I care about: if something on the page doesn't help a visitor understand
                    the business or book with it, it goes. Motion is there when it shows you
                    something, not to fill space.
                </p>
                </div>

                <div className="about-links">
                    <a href="https://github.com/danielsangronis1386" target="_blank" rel="noopener noreferrer" className="about-link mono">GitHub</a>
                    <a href="https://www.linkedin.com/in/daniel-sangronis-65210117a/" target="_blank" rel="noopener noreferrer" className="about-link mono">LinkedIn</a>
                </div>

                <p className="skills-label">Stack</p>
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

            {/* ── JANYERLYN ── */}
            <div className="about-left team-reveal" style={{ "--delay": "0.2s" }}>
                <div className="collage-card">
                    <div className="collage-bg collage-bg--green" />
                    <div className="collage-word collage-word--back">AWAKE</div>
                    <div className="collage-photo-wrap collage-photo-wrap--offset">
                        <img src={janyerlyn} alt="Janyerlyn Morales" className="portrait-img" loading="lazy" decoding="async" />
                    </div>
                    <div className="collage-word collage-word--front">AWAKE</div>
                </div>
            </div>

            <div className="about-right team-reveal" style={{ "--delay": "0.3s" }}>
                <div className="team-member-label">Collaborator</div>
                <h2 className="about-title">JANYERLYN<br />MORALES</h2>

                <div className="about-bio-group">
                <p className="about-bio">
                    I'm Venezuelan and I specialize in graphic design and illustration.
                    My work focuses on visual identity, packaging, social media content,
                    and illustration for brands across different industries.
                </p>
                <p className="about-bio">
                    I want a brand to look like the people who run it, not like everyone
                    else in its industry. That's the part of the work I care about most.
                </p>
                </div>

                <p className="skills-label">Brands</p>
                <div className="about-brands">
                    <span className="brand-tag">URAWAKE Stackhouse</span>
                    <span className="brand-tag">ToursToDo PR</span>
                    <span className="brand-tag">Eliot's Adventures</span>
                </div>

                <div className="about-links">
                    <a href="https://www.behance.net/papillographic" target="_blank" rel="noopener noreferrer" className="about-link mono">Behance</a>
                </div>

                <p className="skills-label">Tools</p>
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

            </div>{/* end about-grid */}

        </section>
    )
}

export default AboutSection;
