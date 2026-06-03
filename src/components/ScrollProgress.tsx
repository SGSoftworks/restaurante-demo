import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;

    let rafId: number;
    let current = 0;

    const tick = () => {
      const lenis = (window as unknown as Record<string, unknown>).__lenis as { scroll: number; limit: number } | undefined;
      let p = 0;
      if (lenis) {
        p = lenis.limit > 0 ? lenis.scroll / lenis.limit : 0;
      } else {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        p = docHeight > 0 ? scrollTop / docHeight : 0;
      }
      p = Math.min(Math.max(p, 0), 1);
      current += (p - current) * 0.15;
      if (Math.abs(current - p) < 0.0001) current = p;
      fill.style.transform = `scaleX(${current})`;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none">
      <div className="absolute inset-0 bg-white/5" />
      <div
        ref={fillRef}
        className="absolute inset-0 origin-left bg-gradient-to-r from-gold-dark via-gold to-gold-light will-change-transform"
      />
    </div>
  );
}
