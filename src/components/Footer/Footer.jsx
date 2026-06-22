import "./Footer.css";

function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) {
        window.history.pushState(null, "", `#${id}`);
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="footer-top">
                <span className="footer-brand">URAWAKE STACKHOUSE</span>
                <nav className="footer-nav">
                    <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo("about"); }}>About</a>
                    <a href="#projects" onClick={(e) => { e.preventDefault(); scrollTo("projects"); }}>Projects</a>
                    <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo("services"); }}>Services</a>
                    <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>Contact</a>
                </nav>
            </div>

            <div className="footer-bottom">
                <span className="footer-copy">© {year} Daniel Sangronis. All rights reserved.</span>
                <a href="mailto:info@urawake.dev" className="footer-email">info@urawake.dev</a>
            </div>
        </footer>
    );
}

export default Footer;
