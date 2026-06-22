import { useState } from "react"
import "./Navbar.css"

const NAV_LINKS = ["Projects", "Services", "About", "Contact"]

function scrollToSection(id) {
    const el = document.getElementById(id)
    if (el) {
        window.history.pushState(null, "", `#${id}`);
        window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
    }
}

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div className="navbar">
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
