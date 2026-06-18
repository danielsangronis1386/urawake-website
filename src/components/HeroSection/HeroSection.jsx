import "./HeroSection.css"
import GlitchTitle from "./GlitchTitle"

function HeroSection() {
    return (
        <section className="hero-container">

            {/* Noise overlay */}
            <div className="hero-noise" aria-hidden="true" />

            {/* TOP LEFT — identity */}
            <div className="hero-top-left mono">
                <p>URAWAKE Stackhouse</p>
                <p>Web Development Studio</p>
                <p className="hero-brand-tag">Los Angeles, CA</p>
            </div>

            {/* MAIN HERO CONTENT */}
            <div className="hero-center">
                <div className="hero-eyebrow mono">// BUILD CONSCIOUS. CODE AWAKE.</div>

                <GlitchTitle text="URAWAKE" />

                <h2 className="hero-subtitle">STACKHOUSE</h2>

                <p className="hero-tagline mono">
                    Web development studio. Digital, urban, awake.
                </p>
            </div>

        </section>
    );
}

export default HeroSection;
