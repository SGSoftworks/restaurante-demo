import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

interface GalleryImage {
  src: string;
  webp: string;
  span: string;
  alt: string;
  large: boolean;
}

const images: GalleryImage[] = [
  { src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80&fm=webp", webp: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1200&q=80&fm=webp", span: "md:row-span-2 md:col-span-2", alt: "Plato principal", large: true },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80&fm=webp", webp: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80&fm=webp", span: "md:col-span-1", alt: "Chef cocinando", large: false },
  { src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80&fm=webp", webp: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80&fm=webp", span: "md:col-span-1", alt: "Interior del restaurante", large: false },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&fm=webp", webp: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&fm=webp", span: "md:col-span-1", alt: "Entrada", large: false },
  { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80&fm=webp", webp: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80&fm=webp", span: "md:row-span-2 md:col-span-2", alt: "Ambiente del restaurante", large: true },
  { src: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80&fm=webp", webp: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80&fm=webp", span: "md:col-span-1", alt: "Postre", large: false },
  { src: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80&fm=webp", webp: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80&fm=webp", span: "md:col-span-1", alt: "Wagyu", large: false },
  { src: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80&fm=webp", webp: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80&fm=webp", span: "md:col-span-1", alt: "Ramen", large: false },
  { src: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80&fm=webp", webp: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1200&q=80&fm=webp", span: "md:row-span-2", alt: "Sushi", large: true },
  { src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80&fm=webp", webp: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80&fm=webp", span: "md:col-span-1", alt: "Coctel", large: false },
  { src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80&fm=webp", webp: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80&fm=webp", span: "md:col-span-1", alt: "Ambiente", large: false },
  { src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80&fm=webp", webp: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80&fm=webp", span: "md:col-span-1", alt: "Bebidas", large: false },
  { src: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&q=80&fm=webp", webp: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&q=80&fm=webp", span: "md:col-span-1", alt: "Ramen de temporada", large: false },
  { src: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&q=80&fm=webp", webp: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=1200&q=80&fm=webp", span: "md:row-span-2 md:col-span-2", alt: "Ceviche", large: true },
  { src: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80&fm=webp", webp: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80&fm=webp", span: "md:col-span-1", alt: "Postre ligero", large: false },
  { src: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=600&q=80&fm=webp", webp: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=600&q=80&fm=webp", span: "md:col-span-1", alt: "Plato de autor", large: false },
  { src: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=600&q=80&fm=webp", webp: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=600&q=80&fm=webp", span: "md:col-span-1", alt: "Cocina abierta", large: false },
  { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80&fm=webp", webp: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80&fm=webp", span: "md:col-span-1", alt: "Barra de sushi", large: false },
  { src: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&q=80&fm=webp", webp: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1200&q=80&fm=webp", span: "md:col-span-1 md:row-span-2", alt: "Nigiri variado", large: true },
  { src: "https://images.unsplash.com/photo-1504754524776-8f4f19590321?w=600&q=80&fm=webp", webp: "https://images.unsplash.com/photo-1504754524776-8f4f19590321?w=1200&q=80&fm=webp", span: "md:col-span-2", alt: "Plato de temporada", large: true },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [loaded, setLoaded] = useState<boolean[]>(() => images.map(() => false));
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionRef.current?.querySelectorAll(".gallery-item").forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.9, delay: i * 0.04, ease: "power4.out", scrollTrigger: { trigger: item, start: "top 90%", end: "top 55%", toggleActions: "play none none reverse" } }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(".lightbox-el", { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" });
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const handleLoad = (i: number) => {
    setLoaded((prev) => { const next = [...prev]; next[i] = true; return next; });
  };

  return (
    <>
      <PageNav />
      <div className="pt-16 md:pt-20 bg-warm-black min-h-screen">
        <section className="px-8 md:px-16 lg:px-24 py-20 md:py-32">
          <div className="max-w-7xl mx-auto">
            <p className="font-sans text-gold tracking-[0.35em] text-sm uppercase mb-4">Galería</p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-tight max-w-3xl">
              Una Experiencia Visual
            </h1>
            <p className="font-alt text-white/40 text-lg md:text-xl italic mt-6 max-w-xl">
              Cada imagen captura un momento de nuestra historia culinaria
            </p>
          </div>
        </section>

        <section ref={sectionRef} className="px-8 md:px-16 lg:px-24 pb-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
              {images.map((img, i) => (
                <div
                  key={i}
                  className={`gallery-item overflow-hidden cursor-pointer ${img.span} ${i === 0 ? "col-span-2" : ""}`}
                  onClick={() => setLightbox(img.webp)}
                >
                  <div className="relative w-full h-full min-h-[160px] md:min-h-[200px]">
                    {!loaded[i] && (
                      <div className="absolute inset-0 bg-white/5 animate-pulse" />
                    )}
                    <img
                      src={img.src}
                      srcSet={img.large ? `${img.webp} 1200w` : `${img.webp} 600w`}
                      alt={img.alt}
                      className={`w-full h-full object-cover transition-all duration-700 hover:scale-105 min-h-[160px] md:min-h-[200px] ${loaded[i] ? "opacity-100" : "opacity-0"}`}
                      loading="lazy"
                      decoding="async"
                      fetchPriority={i < 4 ? "high" : "auto"}
                      onLoad={() => handleLoad(i)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {lightbox && (
        <div
          className="lightbox-el fixed inset-0 z-[100] bg-black/95 flex items-center justify-center cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-8 right-8 text-white/60 text-3xl hover:text-white transition-colors cursor-pointer z-10"
            aria-label="Cerrar"
          >
            ×
          </button>
          <img src={lightbox} alt="Vista ampliada" className="max-w-[90vw] max-h-[90vh] object-contain" fetchPriority="high" loading="eager" />
        </div>
      )}

      <Footer />
    </>
  );
}
