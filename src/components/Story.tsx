import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  {
    label: "Nuestra Historia",
    title: "El Arte de la Gastronomía",
    text: "Materia nació de una visión singular — transformar la alta cocina en una experiencia artística total. Cada plato cuenta una historia, cada ingrediente es una elección deliberada.",
    bg: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920&q=80",
  },
  {
    label: "Origen",
    title: "De la Tierra a la Mesa",
    text: "Trabajamos con pequeños productores que comparten nuestra filosofía. Ingredientes de temporada, seleccionados a mano, respetando el ciclo natural de cada alimento.",
    bg: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80",
  },
  {
    label: "Filosofía",
    title: "Donde la Tradición Encuentra la Innovación",
    text: "Nuestra cocina es un laboratorio de sabores donde honramos las técnicas clásicas mientras exploramos los límites de la gastronomía contemporánea.",
    bg: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80",
  },
];

function getVhPerChapter() {
  return window.innerWidth < 768 ? 60 : 90;
}

const FADE = 0.055;

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [vhPerChapter] = useState(getVhPerChapter);
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = () => window.location.reload();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const total = chapters.length;

    const ctx = gsap.context(() => {
      gsap.set(bgRefs.current[0], { opacity: 1 });
      for (let i = 1; i < chapters.length; i++) {
        if (bgRefs.current[i]) gsap.set(bgRefs.current[i], { opacity: 0 });
      }
      chapters.forEach((_, i) => {
        const group = pinRef.current?.querySelector(`[data-step="${i}"]`);
        if (!group) return;
        gsap.set(group, { opacity: i === 0 ? 1 : 0, y: 0, pointerEvents: i === 0 ? "auto" : "none" });
        if (i > 0) {
          group.querySelectorAll("[data-el]").forEach((el) => gsap.set(el, { y: 35 }));
        }
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${total * vhPerChapter}%`,
        pin: pinRef.current,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;

          const idx = Math.min(Math.floor(p * total), total - 1);
          setActiveChapter(idx);

          chapters.forEach((_, i) => {
            const cs = i / total;
            const ce = (i + 1) / total;
            const fadeIn = cs;
            const fadeInEnd = cs + FADE;
            const fadeOut = ce - FADE;
            const fadeOutEnd = ce;
            const isLast = i === chapters.length - 1;

            let bgOpacity, textOpacity;
            if (i === 0) {
              bgOpacity = p < fadeOut ? 1 : p < fadeOutEnd ? 1 - (p - fadeOut) / (fadeOutEnd - fadeOut) : 0;
            } else {
              bgOpacity = p < fadeIn ? 0 : p < fadeInEnd ? (p - fadeIn) / (fadeInEnd - fadeIn) : p < fadeOut ? 1 : p < fadeOutEnd ? 1 - (p - fadeOut) / (fadeOutEnd - fadeOut) : 0;
            }

            textOpacity = bgOpacity;
            if (isLast && p >= fadeInEnd) {
              textOpacity = p < fadeOut ? 1 : p < fadeOutEnd ? 1 - (p - fadeOut) / (fadeOutEnd - fadeOut) : 0;
              const textExitStart = ce - FADE * 4;
              const textExitEnd = ce - FADE * 2;
              if (p < textExitStart) {
                textOpacity = 1;
              } else if (p < textExitEnd) {
                textOpacity = 1 - (p - textExitStart) / (textExitEnd - textExitStart);
              } else {
                textOpacity = 0;
              }
            }

            const bg = bgRefs.current[i];
            if (bg) gsap.set(bg, { opacity: bgOpacity });

            const group = pinRef.current?.querySelector(`[data-step="${i}"]`) as HTMLElement | null;
            if (!group) return;
            const visible = textOpacity > 0;
            gsap.set(group, { opacity: textOpacity, pointerEvents: visible ? "auto" : "none" });

            if (visible) {
              const enterWindow = FADE * 2;
              const exitWindow = isLast ? FADE * 2 : FADE;
              const textEls = group.querySelectorAll("[data-el]");
              if (!textEls.length) return;

              textEls.forEach((el) => {
                const elType = el.getAttribute("data-el");
                const offset = elType === "label" ? 0 : elType === "title" ? 0.03 : 0.06;

                const entryStart = cs + (i === 0 ? 99 : offset);
                const entryEnd = cs + enterWindow + (i === 0 ? 99 : offset);
                const textExitStart = isLast ? ce - FADE * 4 : ce - exitWindow;
                const textExitEnd = isLast ? ce - FADE * 2 : ce;
                const maxExitY = isLast ? -35 : -25;

                let y = 0;
                if (i !== 0 && p < entryStart) {
                  y = 35;
                } else if (i !== 0 && p < entryEnd) {
                  y = 35 * (1 - (p - entryStart) / (entryEnd - entryStart));
                } else if (p < textExitStart) {
                  y = 0;
                } else if (p < textExitEnd) {
                  y = maxExitY * ((p - textExitStart) / (textExitEnd - textExitStart));
                }

                gsap.set(el, { y });
              });
            }
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [vhPerChapter]);

  return (
    <section ref={sectionRef} className="relative" style={{ height: `${chapters.length * vhPerChapter}vh` }}>
      <div ref={pinRef} className="sticky top-0 h-screen w-full overflow-hidden bg-warm-black">
        {chapters.map((ch, i) => (
          <div
            key={i}
            ref={(el) => { bgRefs.current[i] = el; }}
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{ backgroundImage: `url(${ch.bg})`, zIndex: i + 1, opacity: i === 0 ? 1 : 0 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
          </div>
        ))}

        <div className="relative z-10 w-full h-full px-8 md:px-16 lg:px-24">
          <div className="fixed right-8 md:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-0">
            {/* Vertical track */}
            <div className="relative flex flex-col items-center">
              <div className="absolute top-2 bottom-2 w-[1.5px] bg-white/[0.07]" />
              <div
                className="absolute top-2 w-[1.5px] bg-gold transition-all duration-200 ease-out"
                style={{ height: `${((activeChapter + 0.5) / chapters.length) * 100}%` }}
              />
              {chapters.map((_, i) => (
                <div key={i} className="relative flex items-center gap-3 py-2">
                  <span
                    className={`font-sans text-xs tracking-[0.3em] transition-all duration-500 ${
                      activeChapter === i ? "text-gold font-semibold" : "text-white/20"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <div
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                      activeChapter === i ? "bg-gold shadow-[0_0_6px_rgba(201,168,76,0.5)] scale-150" : "bg-white/[0.15]"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {chapters.map((ch, i) => (
            <div
              key={i}
              data-step={i}
              className="absolute max-w-3xl top-[15%] md:top-[20%]"
              style={{ zIndex: i + 1 }}
            >
              <p data-el="label" className="font-sans text-gold tracking-[0.3em] text-xs md:text-sm uppercase mb-4">{ch.label}</p>
              <h2 data-el="title" className="font-serif text-4xl md:text-6xl lg:text-7xl text-white font-bold mb-8">
                {ch.title}
              </h2>
              <p data-el="text" className="font-alt text-white/70 text-lg md:text-2xl leading-relaxed italic">{ch.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
