import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SEO from "../components/SEO";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import { chefRecommendations } from "../data/menu";

gsap.registerPlugin(ScrollTrigger);

export default function ChefRecommendations() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroEls = sectionRef.current?.querySelectorAll(".hero-el");
      if (heroEls) {
        gsap.fromTo(
          heroEls,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%", end: "top 40%", toggleActions: "play none none reverse" } }
        );
      }

      sectionRef.current?.querySelectorAll(".dish-card").forEach((card, i) => {
        gsap.fromTo(
          card.querySelectorAll(".card-el"),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 80%", end: "top 45%", toggleActions: "play none none reverse" }, delay: i * 0.15 }
        );
      });
    }, []);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <SEO title="Recomendaciones del Chef" description="Takashi Yamamoto, chef ejecutivo de Materia, comparte sus platos favoritos. Una selección personal para una experiencia completa." path="/chef" />
      <PageNav />
      <div className="pt-16 md:pt-20 bg-warm-black">
        <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80"
              alt="Chef"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/70" />
          <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 py-32">
            <div className="max-w-3xl">
              <p className="hero-el font-sans text-gold tracking-[0.35em] text-xs md:text-sm uppercase mb-4">Recomendaciones del Chef</p>
              <h1 className="hero-el font-serif text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-8">Takashi Yamamoto</h1>
              <p className="hero-el font-alt text-white/60 text-lg md:text-xl italic leading-relaxed">
                &ldquo;La cocina es mi lenguaje. Cada plato que creo es una conversación entre la tradición y la innovación. Estos son los platos que mejor representan mi visión culinaria.&rdquo;
              </p>
              <div className="hero-el mt-8">
                <p className="font-sans text-white/50 text-sm tracking-[0.2em] uppercase">Chef Ejecutivo · Materia</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-8 md:px-16 lg:px-24 bg-charcoal">
          <div className="max-w-7xl mx-auto">
            <p className="font-sans text-gold tracking-[0.35em] text-xs uppercase mb-4 text-center">Selección del Chef</p>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-bold mb-4 text-center">Sus Platos Favoritos</h2>
            <p className="font-alt text-white/40 text-lg text-center italic mb-16 max-w-xl mx-auto">
              Platos que el chef recomienda personalmente para una experiencia completa
            </p>

            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              {chefRecommendations.map((item, i) => (
                <Link key={item.slug} to={`/producto/${item.slug}`} className="dish-card group">
                  <div className="overflow-hidden mb-6">
                    <img src={item.image} alt={item.name} className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <p className="card-el font-sans text-gold text-xs tracking-[0.3em] uppercase mb-2">Recomendación 0{i + 1}</p>
                  <h3 className="card-el font-serif text-2xl md:text-3xl text-white font-bold mb-2 group-hover:text-gold transition-colors duration-300">{item.name}</h3>
                  <p className="card-el font-sans text-white/50 text-base leading-relaxed mb-4">{item.desc}</p>
                  <div className="card-el flex items-center justify-between">
                    <span className="font-serif text-gold text-xl">${item.price}</span>
                    <span className="font-sans text-white/30 text-xs tracking-[0.2em] uppercase group-hover:text-gold transition-colors duration-300">Ver plato →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-8 md:px-16 lg:px-24 bg-warm-black text-center">
          <Link
            to="/carta"
            className="inline-block border border-white/20 text-white font-sans tracking-[0.25em] uppercase text-sm px-12 py-4 hover:border-gold hover:text-gold transition-all duration-500"
          >
            Explorar Carta Completa
          </Link>
        </section>
      </div>
      <Footer />
    </>
  );
}
