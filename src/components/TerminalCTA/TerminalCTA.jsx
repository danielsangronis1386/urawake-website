import { useEffect, useRef, useState } from "react";
import "./TerminalCTA.css";

/**
 * A prompt that types itself out when it scrolls into view.
 *
 * The width is measured from the laid-out text rather than counted in `ch`:
 * that unit is the advance of "0", which is a hair narrower than the other
 * glyphs in MonoBlaze and ignores letter-spacing, and the last word ends up
 * clipped.
 */
function TerminalCTA({
    line,
    href = "/#contact",
    action = "// Let's talk",
    prompt = "urawake@stackhouse:~$",
}) {
    const rootRef = useRef(null);
    const typedRef = useRef(null);
    // Reduced motion skips the reveal entirely, so it starts settled.
    const [started, setStarted] = useState(
        () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

    useEffect(() => {
        const el = rootRef.current;
        if (!el) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                setStarted(true);
                observer.disconnect();   // types once, not on every pass
            },
            { threshold: 0.6 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        let cancelled = false;

        document.fonts.ready.then(() => {
            const node = typedRef.current;
            if (cancelled || !node) return;

            const prev = node.style.width;
            node.style.width = "auto";
            const full = node.scrollWidth;
            node.style.width = prev;

            if (full > 0) node.style.setProperty("--typed-width", `${full}px`);
        });

        return () => { cancelled = true; };
    }, [line]);

    return (
        <div className={`terminal-cta ${started ? "is-typing" : ""}`} ref={rootRef}>
            <p className="terminal-line">
                <span className="terminal-prompt" aria-hidden="true">{prompt}</span>
                <span className="terminal-typed" ref={typedRef}>{line}</span>
                <span className="terminal-caret" aria-hidden="true" />
            </p>

            <a href={href} className="terminal-action mono">{action}</a>
        </div>
    );
}

export default TerminalCTA;
