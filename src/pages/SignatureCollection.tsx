import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SEO from "../components/SEO";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import { featuredItems } from "../data/menu";

gsap.registerPlugin(ScrollTrigger);

export default function SignatureCollection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroEls = sectionRef.current?.querySelectorAll(".hero-reveal");
      if (heroEls) {
        gsap.fromTo(
          heroEls,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%", end: "top 40%", toggleActions: "play none none reverse" } }
        );
      }

      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card.querySelectorAll(".card-reveal"),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 80%", end: "top 45%", toggleActions: "play none none reverse" } }
        );

        const img = card.querySelector(".col-img");
        if (img) {
          gsap.fromTo(img, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power4.out", scrollTrigger: { trigger: card, start: "top 85%", end: "top 40%", toggleActions: "play none none reverse" } });
        }
      });
    }, []);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <SEO title="Colección de Autor" description="Cuatro platos que definen la esencia de Materia. Creaciones signature que representan lo mejor de nuestra cocina." path="/coleccion" />
      <PageNav />
      <div className="pt-16 md:pt-20 bg-warm-black">
        <section ref={sectionRef} className="px-8 md:px-16 lg:px-24 py-20 md:py-32">
          <div className="max-w-7xl mx-auto">
            <p className="hero-reveal font-sans text-gold tracking-[0.35em] text-sm uppercase mb-4">Colección Signature</p>
            <h1 className="hero-reveal font-serif text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-tight max-w-4xl">
              Creaciones que Definen Nuestra Esencia
            </h1>
            <p className="hero-reveal font-alt text-white/50 text-lg md:text-xl italic mt-6 max-w-2xl">
              Cuatro platos que representan lo mejor de nuestra cocina. Cada uno es una declaración de intenciones.
            </p>
          </div>
        </section>

        {featuredItems.map((item, i) => (
          <section key={item.slug} className="px-8 md:px-16 lg:px-24 pb-32 md:pb-40">
            <div ref={(el) => { cardsRef.current[i] = el; }} className="max-w-7xl mx-auto">
              <div className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-12 md:gap-20 items-center`}>
                <div className="col-img flex-1 w-full overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full aspect-[4/3] object-cover" />
                </div>
                <div className="flex-1 max-w-lg">
                  <p className="card-reveal font-sans text-gold text-xs tracking-[0.3em] uppercase mb-3">Colección {String(i + 1).padStart(2, "0")}</p>
                  <h2 className="card-reveal font-serif text-4xl md:text-6xl text-white font-bold mb-4">{item.name}</h2>
                  <p className="card-reveal font-sans text-white/50 text-base md:text-lg leading-relaxed">{item.desc}</p>
                  <div className="card-reveal mt-6">
                    <span className="font-serif text-gold text-2xl">${item.price}</span>
                  </div>
                  <Link
                    to={`/producto/${item.slug}`}
                    className="card-reveal inline-block mt-8 font-sans text-white/40 text-xs tracking-[0.25em] uppercase border border-white/20 px-8 py-4 hover:border-gold hover:text-gold transition-all duration-500"
                  >
                    Descubrir Plato
                  </Link>
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
