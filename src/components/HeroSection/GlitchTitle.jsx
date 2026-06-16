import { useEffect, useRef } from "react"

const IS_MOBILE = typeof window !== "undefined" && window.innerWidth < 768
const LETTER_LAYERS = IS_MOBILE ? 8 : 12
const WORD_LAYERS = IS_MOBILE ? 8 : 12
const COLORS = Array.from({ length: Math.max(LETTER_LAYERS, WORD_LAYERS) }, (_, i) =>
    i % 3 === 0 ? "#00e5ff" : i % 3 === 1 ? "#ff2d78" : "#ffffff"
)

function randomBetween(a, b) {
    return a + Math.random() * (b - a)
}

function GlitchLetter({ char, delay }) {
    const baseRef = useRef(null)
    const layersRef = useRef([])

    useEffect(() => {
        let timeout

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
                if (count >= frames) { clearGlitch(); scheduleBurst(); return }
                applyGlitch()
                count++
                timeout = setTimeout(tick, randomBetween(30, 100))
            }
            tick()
        }

        function scheduleBurst() {
            timeout = setTimeout(runBurst, randomBetween(400, 2500))
        }

        timeout = setTimeout(scheduleBurst, delay)
        return () => clearTimeout(timeout)
    }, [delay])

    return (
        <span className="glitch-letter-wrapper">
            <span className="glitch-letter-base" ref={baseRef}>{char}</span>
            {Array.from({ length: LETTER_LAYERS }).map((_, i) => (
                <span key={i} className="glitch-letter-layer" ref={el => layersRef.current[i] = el} aria-hidden="true">{char}</span>
            ))}
        </span>
    )
}

function GlitchTitle({ text }) {
    const wordLayersRef = useRef([])

    useEffect(() => {
        let timeout

        function applyWordGlitch() {
            const sliceHeight = 100 / WORD_LAYERS
            wordLayersRef.current.forEach((el, i) => {
                if (!el) return
                const shouldShift = Math.random() > 0.4
                const tx = shouldShift ? randomBetween(-60, 60) : 0
                el.style.clipPath = `inset(${i * sliceHeight}% 0 ${100 - (i + 1) * sliceHeight}% 0)`
                el.style.transform = `translateX(${tx}px)`
                el.style.color = shouldShift ? COLORS[i] : "#ffffff"
                el.style.opacity = shouldShift ? "0.9" : "0"
            })
        }

        function clearWordGlitch() {
            wordLayersRef.current.forEach(el => {
                if (!el) return
                el.style.opacity = "0"
                el.style.transform = "translateX(0)"
            })
        }

        function runBurst() {
            const frames = Math.floor(randomBetween(4, 12))
            let count = 0
            function tick() {
                if (count >= frames) { clearWordGlitch(); scheduleBurst(); return }
                applyWordGlitch()
                count++
                timeout = setTimeout(tick, randomBetween(20, 80))
            }
            tick()
        }

        function scheduleBurst() {
            timeout = setTimeout(runBurst, randomBetween(800, 3500))
        }

        scheduleBurst()
        return () => clearTimeout(timeout)
    }, [])

    return (
        <h1 className="hero-title glitch-title-wrapper">
            {text.split("").map((char, i) => (
                <GlitchLetter key={i} char={char} delay={i * randomBetween(100, 400)} />
            ))}
            {Array.from({ length: WORD_LAYERS }).map((_, i) => (
                <span
                    key={i}
                    className="glitch-word-layer"
                    ref={el => wordLayersRef.current[i] = el}
                    aria-hidden="true"
                >
                    {text}
                </span>
            ))}
        </h1>
    )
}

export default GlitchTitle
