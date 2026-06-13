import { useState } from "react"
import "./Navbar.css"

const NAV_LINKS = ["About", "Projects", "Services", "Contact"]

function scrollToSection(id) {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" })
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
                    <button
                        key={link}
                        className="nav-link mono"
                        onClick={() => { scrollToSection(link.toLowerCase()); setMenuOpen(false); }}
                    >
                        {link}
                    </button>
                ))}
            </nav>
        </div>
    )
}

export default Navbar
