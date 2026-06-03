import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    (window as unknown as Record<string, unknown>).__lenis = lenis;

    return () => {
      lenis.destroy();
      gsap.ticker.lagSmoothing(1);
      delete (window as unknown as Record<string, unknown>).__lenis;
    };
  }, []);
}

export function scrollToSection(el: HTMLElement) {
  const lenis = (window as unknown as Record<string, unknown>).__lenis as Lenis | undefined;
  if (lenis) {
    lenis.scrollTo(el, { offset: -80, duration: 1.5 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
