import { useCallback, useEffect, useRef, useState } from "react"
import { useGlitchBreaks } from "./useGlitchBreaks"
import "./HeroSection.css"
import logoGreen from "../../assets/logos/logos/LOGO-07.png"
import logoPink from "../../assets/logos/logos/LOGO-08.png"
import logoMagenta from "../../assets/logos/logos/LOGO-09.png"
import logoCyan from "../../assets/logos/logos/LOGO-10.png"
import isotipo from "../../assets/logos/isotipos/ISOTIPO-10.png"

const logo = "/logo.png"

const SLOGAN = "// BUILD CONSCIOUS. CODE AWAKE."

/* If nobody interacts, the hero reveals itself anyway. The brand cannot
   depend on a hover that may never come. */
const AUTO_REVEAL_AFTER = 2600

/* Designer's colour variants, same canvas as the base logo so they line up
   exactly when stacked. Order sets the hover cycle. */
const COLOR_LOGOS = [logoGreen, logoPink, logoMagenta, logoCyan]

function HeroSection() {
    const [colorsReady, setColorsReady] = useState(false)
    /* typing -> ready -> revealed */
    const [phase, setPhase] = useState(() =>
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "ready" : "typing"
    )
    const { live, variant, start, stop } = useGlitchBreaks()
    const logoRef = useRef(null)
    const typedRef = useRef(null)

    /* No pointer to hover with, so the hero plays itself: it runs while the
       logo is on screen and the tab is in front, and stops otherwise. */
    useEffect(() => {
        const el = logoRef.current
        if (!el) return
        if (!window.matchMedia("(hover: none)").matches) return

        let onScreen = false

        const sync = () => {
            if (onScreen && !document.hidden) start({ ambient: true })
            else stop()
        }

        const observer = new IntersectionObserver(([entry]) => {
            onScreen = entry.isIntersecting
            sync()
        }, { threshold: 0.35 })

        observer.observe(el)
        document.addEventListener("visibilitychange", sync)

        return () => {
            observer.disconnect()
            document.removeEventListener("visibilitychange", sync)
            stop()
        }
    }, [start, stop])

    /* The `ch` unit is the advance of "0", which in this face is a hair narrower
       than the other glyphs and ignores letter-spacing entirely. Measuring the
       laid-out line is the only way the last word is guaranteed to land. */
    useEffect(() => {
        const el = typedRef.current
        if (!el) return
        let cancelled = false

        document.fonts.ready.then(() => {
            const node = typedRef.current
            if (cancelled || !node) return

            /* Unclip it, read the laid-out width, put it straight back. All in
               one synchronous block, so nothing paints in between. A Range or
               `ch` maths both come up a few px short of the real advance. */
            const prev = node.style.width
            node.style.width = "auto"
            const full = node.scrollWidth
            node.style.width = prev

            if (full > 0) node.style.setProperty("--typed-width", `${full}px`)
        })

        return () => { cancelled = true }
    }, [])

    /* The slogan types itself out, holds with a blinking caret, then hands the
       hero over to the wordmark. Hovering just brings that handover forward. */
    useEffect(() => {
        if (phase !== "typing") return
        const t = setTimeout(() => setPhase("ready"), 1900)
        return () => clearTimeout(t)
    }, [phase])

    useEffect(() => {
        if (phase !== "ready") return
        const t = setTimeout(() => setPhase("revealed"), AUTO_REVEAL_AFTER)
        return () => clearTimeout(t)
    }, [phase])

    const reveal = useCallback(() => setPhase("revealed"), [])

    /* A tap replays the sequence from the isotipo, so the logo answers touch
       the same way it answers a cursor. */
    const handlePointerDown = (e) => {
        if (e.pointerType === "mouse") return
        reveal()
        start({ ambient: true })
    }

    /* Held back until the browser is idle: the hero logo must not compete
       with four extra downloads during first paint. */
    useEffect(() => {
        const idle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 1500))
        const cancel = window.cancelIdleCallback ?? clearTimeout
        const handle = idle(() => setColorsReady(true))
        return () => cancel(handle)
    }, [])

    return (
        <section className="hero-container" data-phase={phase}>

            {/* Noise overlay */}
            <div className="hero-noise" aria-hidden="true" />

            {/* TOP LEFT: identity */}
            <div className="hero-top-left mono">
                <p>Daniel Sangronis</p>
                <p>Web Developer</p>
                <p className="hero-brand-tag">URAWAKE Stackhouse</p>
            </div>

            {/* MAIN HERO CONTENT */}
            <div className="hero-center">
                <div className="hero-eyebrow" style={{ "--chars": SLOGAN.length }}>
                    <span className="hero-typed" ref={typedRef}>{SLOGAN}</span>
                </div>

                <div
                    className={`hero-logo-glitch ${colorsReady ? "has-colors" : ""} ${live ? "is-live" : ""}`}
                    ref={logoRef}
                    data-break={variant ?? undefined}
                    onPointerEnter={(e) => {
                        if (e.pointerType !== "mouse") return
                        reveal()
                        start()
                    }}
                    onPointerLeave={(e) => { if (e.pointerType === "mouse") stop() }}
                    onPointerDown={handlePointerDown}
                >
                    <img src={logo} alt="URAWAKE Stackhouse" className="hero-logo" />
                    <img src={logo} aria-hidden="true" className="hero-logo glitch-r" />
                    <img src={logo} aria-hidden="true" className="hero-logo glitch-c" />

                    {colorsReady && COLOR_LOGOS.map((src, i) => (
                        <img
                            key={src}
                            src={src}
                            aria-hidden="true"
                            className="hero-logo hero-logo-color"
                            style={{ "--i": i }}
                        />
                    ))}

                    {/* The wordmark collapses into the isotipo during the blackout */}
                    {colorsReady && (
                        <img src={isotipo} aria-hidden="true" className="hero-isotipo" />
                    )}

                    {/* Displaced slices of the mark, hover only. Same file as
                        the base logo, so they cost no extra request. */}
                    <img src={logo} aria-hidden="true" className="hero-logo hero-shard" style={{ "--i": 0 }} />
                    <img src={logo} aria-hidden="true" className="hero-logo hero-shard" style={{ "--i": 1 }} />
                    <img src={logo} aria-hidden="true" className="hero-logo hero-shard" style={{ "--i": 2 }} />
                    <img src={logo} aria-hidden="true" className="hero-logo hero-shard" style={{ "--i": 3 }} />

                    {/* Full-bleed signal tear bands, hover only */}
                    <div className="hero-tear" aria-hidden="true" style={{ "--i": 0 }} />
                    <div className="hero-tear" aria-hidden="true" style={{ "--i": 1 }} />
                    <div className="hero-tear" aria-hidden="true" style={{ "--i": 2 }} />
                </div>

            </div>

        </section>
    );
}

export default HeroSection;
