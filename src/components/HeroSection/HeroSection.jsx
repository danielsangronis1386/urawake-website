import "./HeroSection.css"

function HeroSection({ onOpenMenu }) {
    return (
        <section className="hero-container">
            <div className="hero-top-left">
                <p>Daniel Sangronis</p>
                <p>Web Developer</p>
                <p>URAWAKE Stackhouse</p>
            </div>

            {/* hamburge on the top right*/}
            <div className="hero-top-right">
                <div className="hamburger" onClick={onOpenMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            {/* Center Logo */}
            <div className="hero-center-logo">
                <div className="logo-placeholder">LOGO</div>
                <div className="hero-tagline">
                    <p>Build Conscious. Code Awake.</p>
                </div>
            </div>

        </section>
    );
}

export default HeroSection;