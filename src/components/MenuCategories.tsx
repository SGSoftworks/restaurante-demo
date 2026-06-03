import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { categories } from "../data/menu";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const layoutStyles = ["default", "hero", "inset"] as const;

export default function MenuCategories({ containerId }: { containerId: string }) {
  const sectionsRef = useRef<Map<string, HTMLElement>>(new Map());
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      categories.forEach((cat, idx) => {
        const section = sectionsRef.current.get(cat.id);
        if (!section) return;

        const img = section.querySelector(".cat-img");
        const items = section.querySelectorAll(".cat-item");
        const title = section.querySelector(".cat-title");
        const subtitle = section.querySelector(".cat-subtitle");
        const layout = layoutStyles[idx % layoutStyles.length];

        const entranceDir = idx % 3 === 0 ? -60 : idx % 3 === 1 ? 60 : 0;

        if (img) {
          gsap.fromTo(
            img,
            layout === "hero"
              ? { clipPath: "inset(0 0 100% 0)", filter: "blur(8px)" }
              : { opacity: 0, x: entranceDir, scale: 0.95, filter: "blur(8px)" },
            {
              clipPath: layout === "hero" ? "inset(0 0 0% 0)" : undefined,
              opacity: 1,
              x: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 1.4,
              ease: "power4.out",
              scrollTrigger: { trigger: section, start: "top 78%", end: "top 38%", toggleActions: "play none none reverse" },
            }
          );

          gsap.to(img, {
            y: -30 + (idx % 3) * 10,
            ease: "none",
            scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.5 },
          });
        }

        if (title) {
          gsap.fromTo(
            title.querySelectorAll(".text-mask-line > span"),
            { y: 80 },
            { y: 0, duration: 1, ease: "power4.out", scrollTrigger: { trigger: section, start: "top 75%", end: "top 42%", toggleActions: "play none none reverse" } }
          );
        }

        if (subtitle) {
          gsap.fromTo(subtitle, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3, scrollTrigger: { trigger: section, start: "top 72%", end: "top 45%", toggleActions: "play none none reverse" } });
        }

        items.forEach((item, i) => {
          gsap.fromTo(
            item,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, delay: 0.4 + i * 0.15, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 70%", end: "top 42%", toggleActions: "play none none reverse" } }
          );
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div id={containerId} className="bg-warm-black">
      {categories.map((cat, i) => {
        const layout = layoutStyles[i % layoutStyles.length];

        if (layout === "hero" && i < categories.length - 1) {
          return (
            <section
              key={cat.id}
              data-category={cat.id}
              ref={(el) => { if (el) sectionsRef.current.set(cat.id, el); }}
              className="relative min-h-screen flex items-center overflow-hidden"
            >
              <div className="cat-img absolute inset-0">
                <img src={cat.image} alt={cat.title} className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/70" />
              <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 py-32">
                <div className="max-w-2xl">
                  <p className="font-sans text-gold text-xs tracking-[0.3em] uppercase mb-3">0{i + 1}</p>
                  <h3 className="cat-title font-serif text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-4">
                    <span className="text-mask-line"><span>{cat.title}</span></span>
                  </h3>
                  <p className="cat-subtitle font-alt text-white/60 text-xl md:text-2xl italic mb-12">{cat.subtitle}</p>
                  <div className="space-y-6 max-w-lg">
                    {cat.items.map((item, idx) => (
                      <div key={idx} className="cat-item border-b border-white/10 pb-4">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h4 className="font-serif text-white text-xl md:text-2xl font-bold">{item.name}</h4>
                            <p className="font-sans text-white/60 text-sm md:text-base mt-1 leading-relaxed">{item.desc}</p>
                          </div>
                          <span className="font-serif text-gold text-xl whitespace-nowrap">${item.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        }

        return (
          <section
            key={cat.id}
            data-category={cat.id}
            ref={(el) => { if (el) sectionsRef.current.set(cat.id, el); }}
            className="min-h-screen py-32 md:py-40 px-8 md:px-16 lg:px-24"
          >
            <div className={`max-w-7xl mx-auto flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-12 md:gap-20 items-center`}>
              <div className="cat-img flex-1 w-full overflow-hidden cursor-pointer group" onClick={() => navigate(`/producto/${cat.items[0].slug}`)}>
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full aspect-video md:aspect-auto md:h-[500px] lg:h-[550px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="cat-content flex-1 max-w-lg">
                <p className="font-sans text-gold text-xs tracking-[0.3em] uppercase mb-3">{`0${i + 1}`}</p>
                <h3 className="cat-title font-serif text-4xl md:text-6xl lg:text-7xl text-white font-bold mb-4">
                  <span className="text-mask-line"><span>{cat.title}</span></span>
                </h3>
                <p className="cat-subtitle font-alt text-white/60 text-lg md:text-xl italic mb-12">{cat.subtitle}</p>

                <div className="space-y-8">
                  {cat.items.map((item, idx) => (
                    <div key={idx} className="cat-item border-b border-white/10 pb-6">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h4 className="font-serif text-white text-xl md:text-2xl font-bold">{item.name}</h4>
                          <p className="font-sans text-white/60 text-sm md:text-base mt-2 leading-relaxed">{item.desc}</p>
                        </div>
                        <span className="font-serif text-gold text-xl whitespace-nowrap">${item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
