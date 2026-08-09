import "./HeroSection.css"
import logo from "../../assets/logos/LOGO-01.png"

function HeroSection() {
    return (
        <section className="hero-container">

            {/* Noise overlay */}
            <div className="hero-noise" aria-hidden="true" />

            {/* TOP LEFT: identity */}
            <div className="hero-top-left mono">
                <p>Daniel Sangronis</p>
                <p>Web Developer</p>
                <p className="hero-brand-tag">URAWAKE Stackhouse</p>
            </div>

            {/* MAIN HERO CONTENT */}
            <div className="hero-center">
                <div className="hero-eyebrow mono">// BUILD CONSCIOUS. CODE AWAKE.</div>

                <div className="hero-logo-glitch">
                    <img src={logo} alt="URAWAKE Stackhouse" className="hero-logo" />
                    <img src={logo} aria-hidden="true" className="hero-logo glitch-r" />
                    <img src={logo} aria-hidden="true" className="hero-logo glitch-c" />

                    {/* Full-bleed signal tear bands, hover only */}
                    <div className="hero-tear" aria-hidden="true" />
                    <div className="hero-tear" aria-hidden="true" />
                    <div className="hero-tear" aria-hidden="true" />
                </div>

                <p className="hero-tagline mono">
                    Full-stack web development. Digital, urban, awake.
                </p>
            </div>

        </section>
    );
}

export default HeroSection;
