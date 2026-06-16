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
                    I'm Daniel Sangronis, a web developer focused on building clean,
                    functional interfaces and simple digital systems for small businesses.
                    I care about clarity, structure, and creating tools that solve real problems.
                </p>

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
