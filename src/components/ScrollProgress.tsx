import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fill = fillRef.current;
    const wrap = wrapRef.current;
    if (!fill || !wrap) return;

    let rafId: number;
    let current = 0;
    let visible = true;

    const tick = () => {
      const lenis = (window as unknown as Record<string, unknown>).__lenis as { scroll: number; limit: number } | undefined;
      const story = document.querySelector('[data-section="story"]');
      const reservation = document.querySelector('[data-section="reservation"]');

      let p = 0;
      if (lenis) {
        p = lenis.limit > 0 ? lenis.scroll / lenis.limit : 0;
      } else {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        p = docHeight > 0 ? scrollTop / docHeight : 0;
      }
      p = Math.min(Math.max(p, 0), 1);

      const shouldShow = (() => {
        if (!story || !reservation) return true;
        const storyTop = story.getBoundingClientRect().top;
        const storyBottom = story.getBoundingClientRect().bottom;
        const reservationTop = reservation.getBoundingClientRect().top;
        const inStory = storyTop < window.innerHeight && storyBottom > 0;
        const atOrPastReservation = reservationTop < window.innerHeight * 0.3;
        return !inStory && !atOrPastReservation;
      })();

      if (shouldShow !== visible) {
        visible = shouldShow;
        wrap.style.opacity = visible ? "1" : "0";
        wrap.style.pointerEvents = visible ? "auto" : "none";
      }

      current += (p - current) * 0.15;
      if (Math.abs(current - p) < 0.0001) current = p;
      fill.style.transform = `scaleX(${current})`;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none transition-opacity duration-500"
    >
      <div className="absolute inset-0 bg-white/5" />
      <div
        ref={fillRef}
        className="absolute inset-0 origin-left bg-gradient-to-r from-gold-dark via-gold to-gold-light will-change-transform"
      />
    </div>
  );
}
