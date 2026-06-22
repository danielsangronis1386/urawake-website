import "./Footer.css";

function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="footer-top">
                <span className="footer-brand">URAWAKE STACKHOUSE</span>
                <nav className="footer-nav">
                    <a href="#about">About</a>
                    <a href="#projects">Projects</a>
                    <a href="#services">Services</a>
                    <a href="#contact">Contact</a>
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
