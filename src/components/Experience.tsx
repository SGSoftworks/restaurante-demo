import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  { quote: "Cada bocado es una historia que el paladar recuerda", author: "— Crítica Gastronómica", bg: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80", overlay: 0.65, label: "La Experiencia" },
  { quote: "No es solo cocina. Es la memoria de un instante hecho sabor", author: "— Chef Ejecutivo", bg: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1920&q=80", overlay: 0.5, label: "El Momento" },
  { quote: "Materia no es un restaurante. Es un destino", author: "— Guía Michelin", bg: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1920&q=80", overlay: 0.7, label: "El Legado" },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${chapters.length * 100}%`,
        pin: pinRef.current,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      gsap.set(bgRefs.current.filter(Boolean), { opacity: 0 });
      gsap.set(bgRefs.current[0], { opacity: 1 });

      const quotes = pinRef.current?.querySelectorAll(".exp-quote");
      if (quotes) {
        gsap.set(quotes, { opacity: 0 });
        gsap.set(quotes[0], { opacity: 1 });
      }

      chapters.forEach((_, i) => {
        if (i >= chapters.length - 1) return;

        const bg = bgRefs.current[i];
        const nextBg = bgRefs.current[i + 1];
        const quote = quotes?.[i] as HTMLElement | undefined;
        const nextQuote = quotes?.[i + 1] as HTMLElement | undefined;

        if (!bg || !nextBg) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top+=${(i + 0.45) * 100}% top`,
            end: `top+=${(i + 0.8) * 100}% top`,
            scrub: 1,
          },
        });

        tl.to(bg, { opacity: 0, duration: 1 }, 0);
        tl.to(nextBg, { opacity: 1, duration: 1 }, 0);

        if (quote && nextQuote) {
          tl.to(quote, { opacity: 0, duration: 1 }, 0);
          tl.to(nextQuote, { opacity: 1, duration: 1 }, 0);
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative" style={{ height: `${chapters.length * 100}vh` }}>
      <div ref={pinRef} className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-warm-black">
        {chapters.map((ch, i) => (
          <div
            key={i}
            ref={(el) => { bgRefs.current[i] = el; }}
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{ backgroundImage: `url(${ch.bg})`, zIndex: i + 1 }}
          >
            <div className="absolute inset-0" style={{ backgroundColor: `rgba(0,0,0,${ch.overlay})` }} />
          </div>
        ))}

        <div className="absolute inset-0 z-10 flex items-center justify-center px-8">
          {chapters.map((ch, i) => (
            <div key={i} className="exp-quote absolute max-w-4xl text-center" style={{ zIndex: i + 1 }}>
              <p className="font-sans text-gold tracking-[0.35em] text-xs md:text-sm uppercase mb-8">{ch.label}</p>
              <blockquote className="font-serif text-2xl md:text-4xl lg:text-6xl text-white leading-tight font-bold italic">
                &ldquo;{ch.quote}&rdquo;
              </blockquote>
              <div className="mt-10">
                <div className="w-12 h-[1px] bg-gold mx-auto mb-6" />
                <p className="font-alt text-white/50 text-sm md:text-base tracking-[0.2em] uppercase">{ch.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
