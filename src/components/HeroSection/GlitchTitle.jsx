import { useEffect, useRef, useState } from "react"

const IS_MOBILE = typeof window !== "undefined" && window.innerWidth < 768
const SCANLINES = IS_MOBILE ? 20 : 50
const SHOULD_REDUCE = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

function randomBetween(a, b) {
    return a + Math.random() * (b - a)
}

function GlitchLetter({ char }) {
    const [hovered, setHovered] = useState(false)
    const baseRef = useRef(null)
    const redRef = useRef(null)
    const cyanRef = useRef(null)
    const linesRef = useRef([])
    const timeoutRef = useRef(null)

    useEffect(() => {
        if (SHOULD_REDUCE) return

        function applyGlitch() {
            const sliceH = 100 / SCANLINES

            // chromatic aberration on base
            if (baseRef.current) {
                const shift = randomBetween(-6, 6)
                baseRef.current.style.transform = `translateX(${shift}px)`
            }

            // red channel — offset left
            if (redRef.current) {
                redRef.current.style.transform = `translateX(${randomBetween(-12, -3)}px)`
                redRef.current.style.opacity = randomBetween(0.6, 0.9).toString()
            }

            // cyan channel — offset right
            if (cyanRef.current) {
                cyanRef.current.style.transform = `translateX(${randomBetween(3, 12)}px)`
                cyanRef.current.style.opacity = randomBetween(0.6, 0.9).toString()
            }

            // scanline blocks — horizontal strips that shift left/right
            linesRef.current.forEach((el, i) => {
                if (!el) return
                const active = Math.random() > 0.45
                const tx = active ? randomBetween(-60, 60) : 0
                el.style.clipPath = `inset(${i * sliceH}% 0 ${100 - (i + 1) * sliceH}% 0)`
                el.style.transform = `translateX(${tx}px)`
                el.style.opacity = active ? "1" : "0"
                el.style.color = "#ffffff"
            })
        }

        function clearGlitch() {
            if (baseRef.current) baseRef.current.style.transform = "none"
            if (redRef.current) { redRef.current.style.opacity = "0"; redRef.current.style.transform = "none" }
            if (cyanRef.current) { cyanRef.current.style.opacity = "0"; cyanRef.current.style.transform = "none" }
            linesRef.current.forEach(el => {
                if (!el) return
                el.style.opacity = "0"
                el.style.transform = "translateX(0)"
            })
        }

        function runBurst() {
            const frames = Math.floor(randomBetween(4, 10))
            let count = 0
            function tick() {
                if (count >= frames) { clearGlitch(); scheduleNext(); return }
                applyGlitch()
                count++
                timeoutRef.current = setTimeout(tick, randomBetween(30, 90))
            }
            tick()
        }

        function scheduleNext() {
            timeoutRef.current = setTimeout(runBurst, randomBetween(100, 500))
        }

        clearTimeout(timeoutRef.current)

        if (hovered) {
            timeoutRef.current = setTimeout(runBurst, 60)
        } else {
            clearGlitch()
        }

        return () => clearTimeout(timeoutRef.current)
    }, [hovered])

    return (
        <span
            className="glitch-letter-wrapper"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* base letter */}
            <span className="glitch-letter-base" ref={baseRef}>{char}</span>

            {/* red channel */}
            <span className="glitch-letter-base glitch-channel-red" ref={redRef} aria-hidden="true">{char}</span>

            {/* cyan channel */}
            <span className="glitch-letter-base glitch-channel-cyan" ref={cyanRef} aria-hidden="true">{char}</span>

            {/* scanline layers */}
            {Array.from({ length: SCANLINES }).map((_, i) => (
                <span
                    key={i}
                    className="glitch-letter-layer"
                    ref={el => linesRef.current[i] = el}
                    aria-hidden="true"
                >{char}</span>
            ))}
        </span>
    )
}

function GlitchTitle({ text }) {
    return (
        <h1 className="hero-title glitch-title-wrapper">
            {text.split("").map((char, i) => (
                <GlitchLetter key={i} char={char} />
            ))}
        </h1>
    )
}

export default GlitchTitle
