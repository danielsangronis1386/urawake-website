import logo from "../../assets/logos/logo-wordmark-trim.png";
import "./Footer.css";

function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="footer-top">
                <a href="/" className="footer-brand" aria-label="URAWAKE Stackhouse home">
                    <img src={logo} alt="URAWAKE Stackhouse" />
                </a>
                <nav className="footer-nav">
                    <a href="/team">About</a>
                    <a href="/#projects">Projects</a>
                    <a href="/#services">Services</a>
                    <a href="/#contact">Contact</a>
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
