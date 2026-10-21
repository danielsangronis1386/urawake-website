import { useState, useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
const logo = "/logo.png"
import "./Navbar.css"

const SCROLL_LINKS = [
    { label: "Projects",  id: "projects" },
    { label: "Services",  id: "services" },
    { label: "Contact",   id: "contact"  },
]

// Desktop has room for every destination in one row, so the Studio group is
// flattened there. The hamburger keeps it nested on small screens.
const PAGE_LINKS = [
    { label: "Team",   path: "/team"   },
    { label: "Why Us", path: "/why-us" },
]

function scrollToSection(id) {
    const el = document.getElementById(id)
    if (el) {
        window.history.pushState(null, "", `#${id}`);
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function Navbar({ logoOnly = false }) {
    const [menuOpen, setMenuOpen] = useState(false)
    const [studioOpen, setStudioOpen] = useState(false)
    const logoRef = useRef(null)
    const navRef = useRef(null)
    const lastScrollY = useRef(0)
    const location = useLocation()
    const navigate = useNavigate()
    const isHome = location.pathname === "/"

    const prefersReducedMotion = () =>
        window.matchMedia("(prefers-reduced-motion: reduce)").matches

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

    /* Hide while reading down the page, bring it back the moment the user
       scrolls up. The open menu pins it, so the bar cannot slide out from
       under a menu the user is still using. */
    useEffect(() => {
        const el = navRef.current
        if (!el) return

        if (menuOpen) el.classList.remove("navbar--hidden")

        const REVEAL_AT = 90   // always visible near the top of the page
        const DEADZONE = 6     // ignore trackpad jitter

        lastScrollY.current = window.scrollY
        let ticking = false

        function update() {
            ticking = false
            const y = window.scrollY
            const delta = y - lastScrollY.current

            if (Math.abs(delta) < DEADZONE) return
            lastScrollY.current = y

            if (menuOpen || y < REVEAL_AT) {
                el.classList.remove("navbar--hidden")
                return
            }

            el.classList.toggle("navbar--hidden", delta > 0)
        }

        function onScroll() {
            if (ticking) return
            ticking = true
            requestAnimationFrame(update)
        }

        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [menuOpen])

    function handleScrollLink(e, id) {
        e.preventDefault()
        setMenuOpen(false)
        setStudioOpen(false)
        if (isHome) {
            scrollToSection(id)
        } else {
            // Same in-app swap as the logo; HomePage reads the hash on mount
            // and glides to the section instead of reloading the whole site.
            navigate({ pathname: "/", hash: `#${id}` })
        }
    }

    function handleNavLink() {
        setMenuOpen(false)
        setStudioOpen(false)
    }

    /* In-app swap for page links; the href stays real for crawlers and
       middle-clicks. ScrollToTop in App starts the new page at the top. */
    function handlePageLink(e, path) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        e.preventDefault()
        handleNavLink()
        navigate(path)
    }

    /* The href stays a real link for crawlers and middle-clicks, but the click
       is handled in-app: on home we glide back to the top, and from another
       route we swap the view without a full page reload. */
    function handleHomeLink(e) {
        e.preventDefault()
        setMenuOpen(false)
        setStudioOpen(false)

        if (isHome) {
            window.history.replaceState(null, "", "/")
            window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" })
        } else {
            navigate("/")
        }
    }

    return (
        <div className="navbar" ref={navRef}>
            <a
                href="/"
                className="navbar-logo"
                ref={logoRef}
                onClick={handleHomeLink}
                aria-label="URAWAKE Stackhouse home"
            >
                <img src={logo} alt="URAWAKE" />
            </a>

            {!logoOnly && (
                <>
                    {/* Desktop: links in the bar. Hidden under 769px, where
                        the hamburger below takes over. */}
                    <nav className="nav-bar" aria-label="Main">
                        {SCROLL_LINKS.map(({ label, id }) => (
                            <a
                                key={id}
                                className="nav-bar-link mono"
                                href={`/#${id}`}
                                onClick={(e) => handleScrollLink(e, id)}
                            >
                                {label}
                            </a>
                        ))}
                        {PAGE_LINKS.map(({ label, path }) => (
                            <a
                                key={path}
                                className="nav-bar-link mono"
                                href={path}
                                aria-current={location.pathname === path ? "page" : undefined}
                                onClick={(e) => handlePageLink(e, path)}
                            >
                                {label}
                            </a>
                        ))}
                    </nav>

                    <div
                        className={`hamburger ${menuOpen ? "open" : ""}`}
                        onClick={() => { setMenuOpen(prev => !prev); setStudioOpen(false); }}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <nav className={`nav-dropdown ${menuOpen ? "visible" : ""}`}>
                        {!isHome && (
                            <a className="nav-link mono" href="/" onClick={handleHomeLink}>
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

                        {/* Studio: nested */}
                        <button
                            className={`nav-link mono nav-link--parent ${studioOpen ? "active" : ""}`}
                            onClick={() => setStudioOpen(prev => !prev)}
                        >
                            Studio
                            <span className="nav-arrow">{studioOpen ? "▲" : "▼"}</span>
                        </button>
                        <div className={`nav-sub ${studioOpen ? "nav-sub--open" : ""}`}>
                            <a className="nav-link mono nav-link--sub" href="/team" onClick={handleNavLink}>
                                Meet the Team
                            </a>
                            <a className="nav-link mono nav-link--sub" href="/why-us" onClick={handleNavLink}>
                                Why Us
                            </a>
                        </div>
                    </nav>
                </>
            )}

        </div>
    )
}

export default Navbar
