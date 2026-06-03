import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SEO from "../components/SEO";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import { categories } from "../data/menu";

gsap.registerPlugin(ScrollTrigger);

export default function ProductShowcase() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionsRef.current.forEach((section) => {
        if (!section) return;
        gsap.fromTo(
          section.querySelectorAll(".reveal"),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 80%", end: "top 45%", toggleActions: "play none none reverse" } }
        );

        const img = section.querySelector(".cat-hero-img");
        if (img) {
          gsap.fromTo(img, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.4, ease: "power4.out", scrollTrigger: { trigger: section, start: "top 85%", end: "top 40%", toggleActions: "play none none reverse" } });
          gsap.to(img, { y: -20, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.5 } });
        }
      });
    }, []);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <SEO title="Carta" description="Explora la carta de Materia. Ramen, sushi, entradas, postres y maridajes en una experiencia gastronómica única." path="/carta" />
      <PageNav />
      <div className="pt-16 md:pt-20 bg-warm-black">
        <div className="px-8 md:px-16 lg:px-24 py-20 md:py-32 text-center">
          <p className="font-sans text-gold tracking-[0.35em] text-sm uppercase mb-4">Nuestra Carta</p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-tight">
            Un Recorrido de Sabores
          </h1>
          <p className="font-alt text-white/40 text-lg md:text-xl italic mt-6 max-w-xl mx-auto">
            Cada categoría es un capítulo en la historia de nuestra cocina
          </p>
        </div>

        {categories.map((cat, i) => (
          <section
            key={cat.id}
            ref={(el) => { sectionsRef.current[i] = el; }}
            className={`min-h-screen py-24 md:py-32 px-8 md:px-16 lg:px-24 ${i % 2 === 1 ? "bg-charcoal" : ""}`}
          >
            <div className="max-w-7xl mx-auto">
              <div className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-12 md:gap-20 items-center`}>
                <div className="cat-hero-img flex-1 w-full overflow-hidden">
                  <img src={cat.image} alt={cat.title} className="w-full aspect-video md:aspect-[4/3] object-cover" />
                </div>
                <div className="flex-1 max-w-lg">
                  <p className="reveal font-sans text-gold text-xs tracking-[0.3em] uppercase mb-3">0{i + 1}</p>
                  <h2 className="reveal font-serif text-4xl md:text-6xl lg:text-7xl text-white font-bold mb-4">{cat.title}</h2>
                  <p className="reveal font-alt text-white/50 text-lg md:text-xl italic mb-10">{cat.subtitle}</p>

                  <div className="space-y-6">
                    {cat.items.map((item, idx) => (
                      <Link
                        key={idx}
                        to={`/producto/${item.slug}`}
                        className="reveal group flex justify-between items-start gap-4 border-b border-white/10 pb-5 cursor-pointer"
                      >
                        <div>
                          <h3 className="font-serif text-white text-lg md:text-xl group-hover:text-gold transition-colors duration-300">{item.name}</h3>
                          <p className="font-sans text-white/40 text-sm mt-1">{item.desc}</p>
                        </div>
                        <span className="font-serif text-gold text-lg whitespace-nowrap">${item.price}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
      <Footer />
    </>
  );
}
