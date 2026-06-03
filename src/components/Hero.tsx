import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const chars = "Materia".split("");

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);
  const decorativeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(bgRef.current, { scale: 1.25 }, { scale: 1, duration: 3, ease: "power3.out" })
        .fromTo(labelRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0.6)
        .fromTo(
          charsRef.current.filter(Boolean),
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.06, ease: "power4.out" },
          1.0
        )
        .fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 1.6)
        .fromTo(decorativeRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power3.out" }, 1.8)
        .fromTo(scrollLineRef.current, { scaleY: 0 }, { scaleY: 1, duration: 0.8, ease: "power3.out" }, 2.2)
        .to(scrollLineRef.current, { opacity: 0.3, duration: 1.5, repeat: -1, yoyo: true, ease: "power1.inOut" }, 3.0);

      gsap.to(bgRef.current, {
        scale: 1.05,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1.5 },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[100dvh] w-full overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1920&q=80)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(0,0,0,0.4)_100%)] pointer-events-none" />

      <div className="relative z-10 h-full flex items-center">
        <div className="px-8 md:px-16 lg:px-24 max-w-6xl">
          <p ref={labelRef} className="font-sans text-gold tracking-[0.35em] text-xs md:text-sm uppercase mb-4 md:mb-6">
            Experiencia Gastronómica
          </p>

          <h1 className="font-serif text-7xl md:text-9xl lg:text-[10rem] font-bold leading-[0.8] text-white flex flex-wrap">
            {chars.map((ch, i) => (
              <span
                key={i}
                ref={(el) => { charsRef.current[i] = el; }}
                className="inline-block"
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </h1>

          <p ref={subtitleRef} className="font-alt text-white/60 text-xl md:text-2xl lg:text-3xl mt-4 md:mt-6 font-light italic max-w-xl">
            Donde los ingredientes se convierten en arte
          </p>
        </div>
      </div>

      <div ref={decorativeRef} className="absolute bottom-24 right-0 w-1/3 h-[1px] bg-gradient-to-l from-gold/60 via-gold/20 to-transparent origin-right" />

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="font-sans text-white/30 text-[11px] tracking-[0.35em] uppercase">Descubre</span>
        <div ref={scrollLineRef} className="w-[1px] h-14 bg-gold will-change-transform origin-top" />
      </div>
    </section>
  );
}
