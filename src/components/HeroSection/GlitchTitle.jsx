import { useEffect, useRef, useState } from "react"

const COLORS = ["#00e5ff", "#ff2d78", "#ffffff", "#39FF14"]

function randomBetween(a, b) {
    return a + Math.random() * (b - a)
}

function GlitchTitle({ text }) {
    const canvasRef = useRef(null)
    const containerRef = useRef(null)
    const [fontSize, setFontSize] = useState(120)
    const timeoutRef = useRef(null)
    const glitchingRef = useRef(false)

    // Measure container to set font size
    useEffect(() => {
        function measure() {
            if (!containerRef.current) return
            const w = containerRef.current.offsetWidth
            // Scale font to fill width (Bebas Neue ~0.62 width ratio per char)
            const fit = Math.floor(w / (text.length * 0.62))
            setFontSize(Math.min(fit, 220))
        }
        measure()
        window.addEventListener("resize", measure)
        return () => window.removeEventListener("resize", measure)
    }, [text])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")

        const SLICE_H = 2   // px per slice — ultra thin
        const font = `${fontSize}px 'Bebas Neue', 'Inter Tight', sans-serif`

        function drawBase(ctx, w, h) {
            ctx.clearRect(0, 0, w, h)
            ctx.fillStyle = "#ffffff"
            ctx.font = font
            ctx.textBaseline = "top"
            ctx.fillText(text, 0, 0)
        }

        function resize() {
            const dpr = window.devicePixelRatio || 1
            const w = containerRef.current ? containerRef.current.offsetWidth : 800
            const h = fontSize * 1.1
            canvas.width = w * dpr
            canvas.height = h * dpr
            canvas.style.width = w + "px"
            canvas.style.height = h + "px"
            ctx.scale(dpr, dpr)
        }

        resize()

        const w = canvas.width / (window.devicePixelRatio || 1)
        const h = canvas.height / (window.devicePixelRatio || 1)

        // Draw clean base
        drawBase(ctx, w, h)

        // Save the clean frame to an offscreen canvas
        const offscreen = document.createElement("canvas")
        offscreen.width = canvas.width
        offscreen.height = canvas.height
        const offCtx = offscreen.getContext("2d")
        offCtx.drawImage(canvas, 0, 0)

        function applyGlitch() {
            const dpr = window.devicePixelRatio || 1
            const cw = canvas.width / dpr
            const ch = canvas.height / dpr

            ctx.clearRect(0, 0, cw, ch)

            let y = 0
            while (y < ch) {
                const sliceH = SLICE_H + Math.random() * 3
                const shouldShift = Math.random() > 0.55
                const tx = shouldShift ? randomBetween(-40, 40) : 0

                if (shouldShift) {
                    ctx.save()
                    // Colored chromatic aberration offset
                    const color = COLORS[Math.floor(Math.random() * COLORS.length)]
                    if (color !== "#ffffff") {
                        ctx.globalCompositeOperation = "source-over"
                        ctx.globalAlpha = 0.7
                    }
                    ctx.drawImage(
                        offscreen,
                        0, y * dpr, offscreen.width, sliceH * dpr,
                        tx, y, cw, sliceH
                    )
                    // Draw the shifted slice tinted
                    ctx.globalAlpha = 0.85
                    ctx.fillStyle = color
                    ctx.globalCompositeOperation = "multiply"
                    ctx.fillRect(tx, y, cw, sliceH)
                    ctx.restore()
                } else {
                    // Normal slice
                    ctx.drawImage(
                        offscreen,
                        0, y * dpr, offscreen.width, sliceH * dpr,
                        0, y, cw, sliceH
                    )
                }

                y += sliceH
            }
        }

        function clearGlitch() {
            const dpr = window.devicePixelRatio || 1
            const cw = canvas.width / dpr
            const ch = canvas.height / dpr
            ctx.clearRect(0, 0, cw, ch)
            ctx.drawImage(offscreen, 0, 0, offscreen.width, offscreen.height, 0, 0, cw, ch)
            glitchingRef.current = false
        }

        function runBurst() {
            glitchingRef.current = true
            const frames = Math.floor(randomBetween(4, 12))
            let count = 0
            function tick() {
                if (count >= frames) {
                    clearGlitch()
                    scheduleBurst()
                    return
                }
                applyGlitch()
                count++
                timeoutRef.current = setTimeout(tick, randomBetween(20, 80))
            }
            tick()
        }

        function scheduleBurst() {
            timeoutRef.current = setTimeout(runBurst, randomBetween(600, 2800))
        }

        scheduleBurst()

        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [text, fontSize])

    return (
        <div ref={containerRef} className="glitch-canvas-wrapper">
            <canvas ref={canvasRef} className="glitch-canvas" aria-label={text} />
            {/* Invisible text for SEO/accessibility */}
            <span className="glitch-sr-only">{text}</span>
        </div>
    )
}

export default GlitchTitle
