import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/carta", label: "Carta" },
  { to: "/coleccion", label: "Colección" },
  { to: "/galeria", label: "Galería" },
  { to: "/chef", label: "Chef" },
  { to: "/temporada", label: "Temporada" },
];

export default function PageNav() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-warm-black/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="font-serif text-xl md:text-2xl text-white font-bold tracking-tight shrink-0">Materia</Link>
        <div className="flex items-center gap-4 pl-8 md:gap-10 md:pl-0 overflow-x-auto no-scrollbar">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`font-sans text-xs tracking-[0.2em] uppercase whitespace-nowrap transition-colors duration-300 ${
                location.pathname === l.to ? "text-gold" : "text-white/40 hover:text-white/70"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
