import { useState, useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import logo from "../../assets/logos/LOGO-01.png"
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
    const [aboutOpen, setAboutOpen] = useState(false)
    const logoRef = useRef(null)
    const location = useLocation()
    const isHome = location.pathname === "/"

    useEffect(() => {
        const el = logoRef.current
        if (!el) return
        if (!isHome) {
            el.classList.add("navbar-logo--visible")
            return
        }
        function onScroll() {
            const past = window.scrollY > window.innerHeight * 0.6
            el.classList.toggle("navbar-logo--visible", past)
        }
        window.addEventListener("scroll", onScroll, { passive: true })
        onScroll()
        return () => window.removeEventListener("scroll", onScroll)
    }, [isHome])

    function handleScrollLink(e, id) {
        e.preventDefault()
        setMenuOpen(false)
        setAboutOpen(false)
        if (isHome) {
            scrollToSection(id)
        } else {
            window.location.href = `/#${id}`
        }
    }

    function handleNavLink() {
        setMenuOpen(false)
        setAboutOpen(false)
    }

    return (
        <div className="navbar">
            <a
                href="/"
                className="navbar-logo"
                ref={logoRef}
                aria-label="URAWAKE Stackhouse home"
            >
                <img src={logo} alt="URAWAKE" />
            </a>

            <div
                className={`hamburger ${menuOpen ? "open" : ""}`}
                onClick={() => { setMenuOpen(prev => !prev); setAboutOpen(false); }}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </div>

            <nav className={`nav-dropdown ${menuOpen ? "visible" : ""}`}>
                {!isHome && (
                    <a className="nav-link mono" href="/" onClick={handleNavLink}>
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

                {/* About — nested */}
                <button
                    className={`nav-link mono nav-link--parent ${aboutOpen ? "active" : ""}`}
                    onClick={() => setAboutOpen(prev => !prev)}
                >
                    About
                    <span className="nav-arrow">{aboutOpen ? "▲" : "▼"}</span>
                </button>
                <div className={`nav-sub ${aboutOpen ? "nav-sub--open" : ""}`}>
                    <a className="nav-link mono nav-link--sub" href="/team" onClick={handleNavLink}>
                        Meet the Team
                    </a>
                    <a className="nav-link mono nav-link--sub" href="/why-us" onClick={handleNavLink}>
                        Why Us
                    </a>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
