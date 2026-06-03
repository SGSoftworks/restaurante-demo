import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToSection } from "../hooks/useLenis";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: "ramen", label: "Ramen" },
  { id: "entradas", label: "Entradas" },
  { id: "sushi", label: "Sushi" },
  { id: "postres", label: "Postres" },
  { id: "bebidas", label: "Bebidas" },
];

export default function MenuNav({ containerId }: { containerId: string }) {
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("ramen");

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const sections = container.querySelectorAll<HTMLElement>("[data-category]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-category");
            if (id) setActive(id);
          }
        });
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));

    const ctx = gsap.context(() => {
      const navItems = navRef.current?.querySelectorAll(".nav-item");
      if (navItems) {
        gsap.fromTo(
          navItems,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: container, start: "top 60%" } }
        );
      }
    }, navRef);

    return () => { observer.disconnect(); ctx.revert(); };
  }, [containerId]);

  useEffect(() => {
    const activeEl = navRef.current?.querySelector(`[data-nav="${active}"]`);
    if (activeEl && indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        width: (activeEl as HTMLElement).offsetWidth,
        x: (activeEl as HTMLElement).offsetLeft,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  }, [active]);

  const scrollTo = (id: string) => {
    const el = document.querySelector<HTMLElement>(`[data-category="${id}"]`);
    if (el) scrollToSection(el);
  };

  return (
    <nav ref={navRef} className="sticky top-0 z-50 w-full bg-warm-black/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        <div className="flex items-center h-16 md:h-20 gap-8 md:gap-12 relative overflow-x-auto no-scrollbar nav-fade-right">
          <div ref={indicatorRef} className="absolute bottom-0 h-[2px] bg-gold" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              data-nav={cat.id}
              onClick={() => scrollTo(cat.id)}
              className={`nav-item flex-shrink-0 font-sans text-sm tracking-[0.25em] uppercase cursor-pointer transition-all duration-500 ${
                active === cat.id ? "text-gold" : "text-white/40 hover:text-white/70 hover:tracking-[0.3em]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
