import { useState } from "react"
import "./Navbar.css"
import logo from "../../assets/logos/LOGO-01.png"

const NAV_LINKS = ["Projects", "Services", "Contact"]

function scrollToSection(id) {
    const el = document.getElementById(id)
    if (el) {
        window.history.pushState(null, "", `#${id}`);
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div className="navbar">
            <a href="/" className="navbar-logo-link" aria-label="Home">
                <img src={logo} alt="URAWAKE Stackhouse" className="navbar-logo" />
            </a>

            <div
                className={`hamburger ${menuOpen ? "open" : ""}`}
                onClick={() => setMenuOpen(prev => !prev)}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </div>

            <nav className={`nav-dropdown ${menuOpen ? "visible" : ""}`}>
                {NAV_LINKS.map(link => (
                    <a
                        key={link}
                        className="nav-link mono"
                        href={`#${link.toLowerCase()}`}
                        onClick={(e) => { e.preventDefault(); scrollToSection(link.toLowerCase()); setMenuOpen(false); }}
                    >
                        {link}
                    </a>
                ))}
            </nav>
        </div>
    )
}

export default Navbar
