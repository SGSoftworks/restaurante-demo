import { Link } from "react-router-dom";

export default function Footer() {
  const scrollToTop = () => {
    const lenis = (window as unknown as Record<string, unknown>).__lenis as { scrollTo: (y: number, opts?: unknown) => void } | undefined;
    if (lenis) lenis.scrollTo(0, { duration: 2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-warm-black border-t border-white/5 py-16 md:py-20 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 md:gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="font-serif text-2xl text-white font-bold tracking-tight">Materia</Link>
            <p className="font-alt text-white/30 text-sm italic mt-2">Alta Cocina</p>
          </div>

          <div>
            <p className="font-sans text-white/30 text-xs tracking-[0.25em] uppercase mb-4">Horarios</p>
            <p className="font-sans text-white/60 text-sm">Mar - Sáb: 19:00 - 23:30</p>
            <p className="font-sans text-white/60 text-sm">Dom: 13:00 - 22:00</p>
            <p className="font-sans text-white/30 text-sm mt-2">Lunes: Cerrado</p>
          </div>

          <div>
            <p className="font-sans text-white/30 text-xs tracking-[0.25em] uppercase mb-4">Ubicación</p>
            <p className="font-sans text-white/60 text-sm leading-relaxed">Av. Gastronómica 123<br />Ciudad, CP 28001</p>
          </div>

          <div>
            <p className="font-sans text-white/30 text-xs tracking-[0.25em] uppercase mb-4">Explorar</p>
            <div className="space-y-2">
              <Link to="/carta" className="block font-sans text-white/40 text-sm hover:text-gold transition-colors duration-300">Carta</Link>
              <Link to="/coleccion" className="block font-sans text-white/40 text-sm hover:text-gold transition-colors duration-300">Colección</Link>
              <Link to="/galeria" className="block font-sans text-white/40 text-sm hover:text-gold transition-colors duration-300">Galería</Link>
              <Link to="/chef" className="block font-sans text-white/40 text-sm hover:text-gold transition-colors duration-300">Chef</Link>
              <Link to="/temporada" className="block font-sans text-white/40 text-sm hover:text-gold transition-colors duration-300">Temporada</Link>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-white/20 text-xs">&copy; 2026 Materia. Todos los derechos reservados.</p>
          <button
            onClick={scrollToTop}
            className="font-sans text-white/30 text-xs tracking-[0.25em] uppercase hover:text-gold transition-colors duration-300 cursor-pointer"
          >
            Volver arriba ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
