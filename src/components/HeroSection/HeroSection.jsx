import "./HeroSection.css"
import GlitchTitle from "./GlitchTitle"

function HeroSection() {
    return (
        <section className="hero-container">

            {/* Noise overlay */}
            <div className="hero-noise" aria-hidden="true" />

            {/* TOP LEFT — identity */}
            <div className="hero-top-left mono">
                <p>Daniel Sangronis</p>
                <p>Web Developer</p>
                <p className="hero-brand-tag">URAWAKE Stackhouse</p>
            </div>

            {/* MAIN HERO CONTENT */}
            <div className="hero-center">
                <div className="hero-eyebrow mono">// BUILD CONSCIOUS. CODE AWAKE.</div>

                <GlitchTitle text="URAWAKE" />

                <h2 className="hero-subtitle">STACKHOUSE</h2>

                <p className="hero-tagline mono">
                    Web development studio — digital, urban, awake.
                </p>
            </div>

        </section>
    );
}

export default HeroSection;
