import { useCallback, useEffect, useRef, useState } from "react";

/* How long each break variant runs. Must match the CSS animation durations,
   or the class comes off mid-animation and the layer snaps. */
const VARIANTS = {
    a: 750,   // explode, blackout, isotipo
    b: 260,   // hard flinch
    c: 900,   // tape rewind
};

/* Weighted so the big one stays special. Repeating "a" is what made the
   old fixed loop read as a GIF. */
const BAG = ["a", "b", "b", "c", "b", "a", "c", "b"];

const GAP_MIN = 380;
const GAP_MAX = 1900;

/* Touch screens get no hover, so the hero plays itself. Breaks come further
   apart there: it runs unattended, and a phone pays for every frame in
   battery. */
const AMBIENT_GAP_MULTIPLIER = 2.6;

/* The first break always leads with the isotipo, and lands fast so the hover
   feels answered. Randomness starts from the second one on. */
const OPENER = "a";
const OPENER_DELAY = 220;

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const gap = (ambient) =>
    (GAP_MIN + Math.random() * (GAP_MAX - GAP_MIN)) * (ambient ? AMBIENT_GAP_MULTIPLIER : 1);

/**
 * Drives the hero logo's glitch while the pointer is over it.
 *
 * Returns { live, variant, start, stop }. The component puts `live` on the
 * wrapper as a class and `variant` as a data attribute; all the animation
 * itself stays in CSS.
 */
export function useGlitchBreaks() {
    const ambient = useRef(false);
    const [live, setLive] = useState(false);
    const [variant, setVariant] = useState(null);

    const timers = useRef([]);
    const lastVariant = useRef(null);
    const isFirst = useRef(true);

    const clearTimers = useCallback(() => {
        timers.current.forEach(clearTimeout);
        timers.current = [];
    }, []);

    const schedule = useCallback(function schedule() {
        const opening = isFirst.current;
        isFirst.current = false;

        timers.current.push(setTimeout(() => {
            // Never the same variant twice running, so the pattern cannot settle
            let next = pick(BAG);
            if (next === lastVariant.current) next = pick(BAG.filter((v) => v !== next));
            if (opening) next = OPENER;
            lastVariant.current = next;

            setVariant(next);
            timers.current.push(setTimeout(() => {
                setVariant(null);
                schedule();
            }, VARIANTS[next]));
        }, opening ? OPENER_DELAY : gap(ambient.current)));
    }, []);

    /** `opts.ambient` spaces the breaks out for the unattended, touch-screen case. */
    const start = useCallback((opts = {}) => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        ambient.current = Boolean(opts.ambient);
        clearTimers();
        isFirst.current = true;
        setLive(true);
        schedule();
    }, [clearTimers, schedule]);

    const stop = useCallback(() => {
        clearTimers();
        setLive(false);
        setVariant(null);
    }, [clearTimers]);

    useEffect(() => clearTimers, [clearTimers]);

    return { live, variant, start, stop };
}
