import { useEffect, useRef, useState } from "react"
// word-level glitch removed — per-letter hover is cleaner

const IS_MOBILE = typeof window !== "undefined" && window.innerWidth < 768
const LETTER_LAYERS = IS_MOBILE ? 8 : 30
const COLORS = Array.from({ length: LETTER_LAYERS }, (_, i) =>
    i % 3 === 0 ? "#00e5ff" : i % 3 === 1 ? "#ff2d78" : "#ffffff"
)

function randomBetween(a, b) {
    return a + Math.random() * (b - a)
}

function GlitchLetter({ char }) {
    const [hovered, setHovered] = useState(false)
    const baseRef = useRef(null)
    const layersRef = useRef([])
    const timeoutRef = useRef(null)

    useEffect(() => {
        function applyGlitch() {
            const sliceHeight = 100 / LETTER_LAYERS
            if (baseRef.current) {
                baseRef.current.style.transform = `translateX(${randomBetween(-40, 40)}px) skewX(${randomBetween(-6, 6)}deg) scaleY(${randomBetween(0.92, 1.08)})`
                baseRef.current.style.filter = `brightness(${randomBetween(0.4, 1.8)}) hue-rotate(${randomBetween(-40, 40)}deg)`
            }
            layersRef.current.forEach((el, i) => {
                if (!el) return
                const shouldShift = Math.random() > 0.35
                const tx = shouldShift ? randomBetween(-80, 80) : 0
                el.style.clipPath = `inset(${i * sliceHeight}% 0 ${100 - (i + 1) * sliceHeight}% 0)`
                el.style.transform = `translateX(${tx}px)`
                el.style.color = shouldShift ? COLORS[i] : "#ffffff"
                el.style.opacity = shouldShift ? "1" : "0"
            })
        }

        function clearGlitch() {
            if (baseRef.current) {
                baseRef.current.style.transform = "none"
                baseRef.current.style.filter = "none"
            }
            layersRef.current.forEach(el => {
                if (!el) return
                el.style.opacity = "0"
                el.style.transform = "translateX(0)"
            })
        }

        function runBurst() {
            const frames = Math.floor(randomBetween(3, 9))
            let count = 0
            function tick() {
                if (count >= frames) { clearGlitch(); scheduleNext(); return }
                applyGlitch()
                count++
                timeoutRef.current = setTimeout(tick, randomBetween(30, 100))
            }
            tick()
        }

        function scheduleNext() {
            timeoutRef.current = setTimeout(runBurst, randomBetween(100, 500))
        }

        clearTimeout(timeoutRef.current)

        if (hovered) {
            runBurst()
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
            <span className="glitch-letter-base" ref={baseRef}>{char}</span>
            {Array.from({ length: LETTER_LAYERS }).map((_, i) => (
                <span key={i} className="glitch-letter-layer" ref={el => layersRef.current[i] = el} aria-hidden="true">{char}</span>
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
