import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SEO from "../components/SEO";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import { getItemBySlug, categories } from "../data/menu";

gsap.registerPlugin(ScrollTrigger);

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const item = getItemBySlug(slug || "");
  const heroRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);

  const relatedItems = item
    ? categories
        .flatMap((c) => c.items)
        .filter((i) => i.slug !== item.slug)
        .slice(0, 3)
    : [];

  useEffect(() => {
    if (!item) return;
    const ctx = gsap.context(() => {
      const heroEls = heroRef.current?.querySelectorAll(".hero-el");
      if (heroEls) {
        gsap.fromTo(heroEls, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" });
      }

      const storyEls = storyRef.current?.querySelectorAll(".story-el");
      if (storyEls) {
        gsap.fromTo(storyEls, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: storyRef.current, start: "top 80%", end: "top 45%", toggleActions: "play none none reverse" } });
      }
    }, []);

    return () => ctx.revert();
  }, [item]);

  if (!item) {
    return (
      <>
        <SEO title="Plato no encontrado" path={undefined} />
        <PageNav />
        <div className="pt-32 px-8 text-center min-h-screen flex flex-col items-center justify-center bg-warm-black">
          <p className="font-serif text-4xl text-white mb-4">Plato no encontrado</p>
          <Link to="/carta" className="font-sans text-gold text-sm tracking-[0.25em] uppercase hover:underline">Volver a la carta</Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO title={item.name} description={item.desc} ogImage={item.image.replace("w=800", "w=1200")} path={`/producto/${item.slug}`} />
      <PageNav />
      <div className="pt-16 md:pt-20 bg-warm-black">
        <section ref={heroRef} className="relative min-h-screen flex items-center">
          <div className="absolute inset-0">
            <img src={item.image.replace("w=800", "w=1920")} alt={item.name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 py-32">
            <div className="max-w-2xl">
              <p className="hero-el font-sans text-gold tracking-[0.35em] text-xs md:text-sm uppercase mb-4">Materia</p>
              <h1 className="hero-el font-serif text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-6">{item.name}</h1>
              <p className="hero-el font-alt text-white/60 text-lg md:text-xl italic mb-8">{item.desc}</p>
              <p className="hero-el font-serif text-gold text-3xl">${item.price}</p>
            </div>
          </div>
        </section>

        <section ref={storyRef} className="py-24 md:py-32 px-8 md:px-16 lg:px-24 bg-charcoal">
          <div className="max-w-4xl mx-auto">
            {item.story && (
              <>
                <p className="story-el font-sans text-gold tracking-[0.35em] text-xs uppercase mb-4">La Historia</p>
                <h2 className="story-el font-serif text-3xl md:text-5xl text-white font-bold mb-8">Detrás del Plato</h2>
                <p className="story-el font-alt text-white/60 text-lg md:text-xl leading-relaxed italic mb-16">{item.story}</p>
              </>
            )}

            {item.ingredients && item.ingredients.length > 0 && (
              <>
                <p className="story-el font-sans text-gold tracking-[0.35em] text-xs uppercase mb-4">Ingredientes</p>
                <h2 className="story-el font-serif text-3xl md:text-5xl text-white font-bold mb-8">Selección de Ingredientes</h2>
                <div className="story-el grid md:grid-cols-2 gap-4">
                  {item.ingredients.map((ing, i) => (
                    <div key={i} className="flex items-center gap-4 border-b border-white/5 pb-3">
                      <span className="text-gold text-sm">◆</span>
                      <span className="font-sans text-white/60 text-base">{ing}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {item.chefNote && (
              <div className="story-el mt-16 p-8 border border-white/10">
                <p className="font-sans text-gold text-xs tracking-[0.25em] uppercase mb-3">Nota del Chef</p>
                <p className="font-alt text-white/70 text-lg italic">&ldquo;{item.chefNote}&rdquo;</p>
              </div>
            )}
          </div>
        </section>

        {relatedItems.length > 0 && (
          <section className="py-24 md:py-32 px-8 md:px-16 lg:px-24 bg-warm-black">
            <div className="max-w-7xl mx-auto">
              <p className="font-sans text-gold tracking-[0.35em] text-xs uppercase mb-4 text-center">También te puede interesar</p>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-bold mb-16 text-center">Platos Relacionados</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedItems.map((rel) => (
                  <Link key={rel.slug} to={`/producto/${rel.slug}`} className="group">
                    <div className="overflow-hidden mb-4">
                      <img src={rel.image} alt={rel.name} className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <h3 className="font-serif text-white text-xl group-hover:text-gold transition-colors duration-300">{rel.name}</h3>
                    <p className="font-sans text-white/40 text-sm mt-1">${rel.price}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-16 px-8 md:px-16 lg:px-24 bg-warm-black text-center border-t border-white/5">
          <Link
            to="/#reservation"
            className="inline-block bg-gold hover:bg-gold-dark text-black font-sans tracking-[0.25em] uppercase text-sm px-14 py-5 transition-all duration-500"
          >
            Reserva esta Experiencia
          </Link>
        </section>
      </div>
      <Footer />
    </>
  );
}
