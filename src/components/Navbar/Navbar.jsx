import { useState } from "react"
import { useLocation } from "react-router-dom"
import "./Navbar.css"

const SCROLL_LINKS = [
    { label: "Projects",  id: "projects" },
    { label: "Services",  id: "services" },
    { label: "Contact",   id: "contact"  },
]

function scrollToSection(id) {
    const el = document.getElementById(id)
    if (el) {
        window.history.pushState(null, "", `#${id}`);
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const location = useLocation()
    const isHome = location.pathname === "/"

    function handleScrollLink(e, id) {
        e.preventDefault()
        setMenuOpen(false)
        if (isHome) {
            scrollToSection(id)
        } else {
            window.location.href = `/#${id}`
        }
    }

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
                {!isHome && (
                    <a className="nav-link mono" href="/" onClick={() => setMenuOpen(false)}>
                        ← Home
                    </a>
                )}
                {SCROLL_LINKS.map(({ label, id }) => (
                    <a
                        key={id}
                        className="nav-link mono"
                        href={`/#${id}`}
                        onClick={(e) => handleScrollLink(e, id)}
                    >
                        {label}
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
