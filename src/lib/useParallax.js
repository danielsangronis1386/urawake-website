import { useEffect } from "react";

/* Moves a background layer against the scroll while its section is on screen,
   so it drifts behind the content. `strength` is how far it lags the page:
   0 scrolls with it, 1 stays pinned to the screen. The layer must be taller
   than the section to have room to move. Skipped for reduced motion. */
export default function useParallax(sectionRef, layerRef, strength = 0.3) {
    useEffect(() => {
        const section = sectionRef.current;
        const layer = layerRef.current;
        if (!section || !layer) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let frame = 0;
        const update = () => {
            frame = 0;
            const rect = section.getBoundingClientRect();
            const offset = (window.innerHeight / 2 - (rect.top + rect.height / 2)) * strength;
            layer.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        // Only listen while the section is near the viewport.
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                update();
                window.addEventListener("scroll", onScroll, { passive: true });
                window.addEventListener("resize", onScroll);
            } else {
                window.removeEventListener("scroll", onScroll);
                window.removeEventListener("resize", onScroll);
            }
        });
        observer.observe(section);

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            cancelAnimationFrame(frame);
        };
    }, [sectionRef, layerRef, strength]);
}
