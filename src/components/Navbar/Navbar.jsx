import { useState } from "react"
import "./Navbar.css"

const SCROLL_LINKS = ["Projects", "Services", "Contact"]

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
                {SCROLL_LINKS.map(link => (
                    <a
                        key={link}
                        className="nav-link mono"
                        href={`#${link.toLowerCase()}`}
                        onClick={(e) => { e.preventDefault(); scrollToSection(link.toLowerCase()); setMenuOpen(false); }}
                    >
                        {link}
                    </a>
                ))}
                <a
                    className="nav-link mono"
                    href="/team"
                    onClick={() => setMenuOpen(false)}
                >
                    Meet the Team
                </a>
            </nav>
        </div>
    )
}

export default Navbar
