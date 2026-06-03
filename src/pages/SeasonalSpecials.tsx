import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SEO from "../components/SEO";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const seasonalItems = [
  {
    name: "Ramen de Primavera",
    desc: "Caldo claro de verduras de temporada, espárragos trigueros, huevo poché y flor de calabacín",
    price: "28",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=80",
    season: "Primavera 2026",
  },
  {
    name: "Tartar de Atún Rojo",
    desc: "Atún rojo de almadraba con aguacate, wasabi fresco y crujiente de arroz inflado",
    price: "36",
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=80",
    season: "Primavera 2026",
  },
  {
    name: "Risotto de Espárragos",
    desc: "Risotto cremoso con espárragos blancos, parmesano de 36 meses y trufa de verano",
    price: "32",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    season: "Primavera 2026",
  },
  {
    name: "Fresas con Wasabi",
    desc: "Fresas maceradas en sake, crema de wasabi, merengue crujiente y menta fresca",
    price: "18",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
    season: "Primavera 2026",
  },
];

export default function SeasonalSpecials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroEls = sectionRef.current?.querySelectorAll(".hero-el");
      if (heroEls) {
        gsap.fromTo(heroEls, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" });
      }

      sectionRef.current?.querySelectorAll(".season-card").forEach((card) => {
        gsap.fromTo(
          card.querySelectorAll(".card-el"),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 85%", end: "top 50%", toggleActions: "play none none reverse" } }
        );
      });
    }, []);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <SEO title="Especiales de Temporada" description="Especiales de primavera en Materia. Ingredientes de temporada seleccionados en su momento óptimo." path="/temporada" />
      <PageNav />
      <div className="pt-16 md:pt-20 bg-warm-black">
        <section ref={sectionRef} className="min-h-screen flex items-center relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920&q=80"
              alt="Primavera"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
          </div>

          <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 py-32">
            <div className="max-w-3xl">
              <p className="hero-el font-sans text-gold tracking-[0.35em] text-xs md:text-sm uppercase mb-4">Temporada</p>
              <h1 className="hero-el font-serif text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-6">Especiales de Primavera</h1>
              <p className="hero-el font-alt text-white/60 text-lg md:text-xl italic max-w-xl">
                Ingredientes de temporada seleccionados en su momento óptimo. Una celebración de los productos frescos que la primavera nos regala.
              </p>
              <div className="hero-el mt-8 inline-block border border-white/20 px-6 py-3">
                <p className="font-sans text-gold text-xs tracking-[0.3em] uppercase">Disponible hasta junio 2026</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-8 md:px-16 lg:px-24 bg-charcoal">
          <div className="max-w-7xl mx-auto">
            <p className="font-sans text-gold tracking-[0.35em] text-xs uppercase mb-4 text-center">Menú de Temporada</p>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-bold mb-16 text-center">Edición Primavera 2026</h2>

            <div className="grid md:grid-cols-2 gap-12">
              {seasonalItems.map((item, i) => (
                <div key={i} className="season-card group">
                  <div className="overflow-hidden mb-6">
                    <img src={item.image} alt={item.name} className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <p className="card-el font-sans text-gold text-xs tracking-[0.3em] uppercase mb-2">{item.season}</p>
                  <h3 className="card-el font-serif text-2xl md:text-3xl text-white font-bold mb-2">{item.name}</h3>
                  <p className="card-el font-sans text-white/50 text-base leading-relaxed mb-4">{item.desc}</p>
                  <p className="card-el font-serif text-gold text-xl">${item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-8 md:px-16 lg:px-24 bg-warm-black text-center">
          <Link
            to="/#reservation"
            className="inline-block bg-gold hover:bg-gold-dark text-black font-sans tracking-[0.25em] uppercase text-sm px-14 py-5 transition-all duration-500"
          >
            Reserva tu Experiencia de Temporada
          </Link>
        </section>
      </div>
      <Footer />
    </>
  );
}
