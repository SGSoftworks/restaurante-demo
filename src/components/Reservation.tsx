import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Reservation() {
  const sectionRef = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState("");
  const [date, setDate] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const labels = sectionRef.current?.querySelectorAll(".rsv-label");
      const cards = sectionRef.current?.querySelectorAll(".rsv-card");
      const extras = sectionRef.current?.querySelectorAll(".rsv-extra, .rsv-cta");

      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", end: "top 30%", toggleActions: "play none none reverse" },
      });

      if (labels) tl.fromTo(labels, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" });
      if (cards) tl.fromTo(cards, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" }, "-=0.2");
      if (extras) tl.fromTo(extras, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.2");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!dropdownListRef.current) return;
    if (dropdownOpen) {
      gsap.fromTo(
        dropdownListRef.current,
        { opacity: 0, y: -8, scaleY: 0.97 },
        { opacity: 1, y: 0, scaleY: 1, duration: 0.25, ease: "power3.out", transformOrigin: "top center" }
      );
    } else {
      gsap.to(dropdownListRef.current, {
        opacity: 0,
        y: -8,
        scaleY: 0.97,
        duration: 0.15,
        ease: "power2.in",
        transformOrigin: "top center",
      });
    }
  }, [dropdownOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !date || !guests) return;
    setSubmitted(true);
  };

  const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <section ref={sectionRef} className="bg-charcoal relative overflow-hidden py-32 md:py-40 px-8 md:px-16 lg:px-24">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/[0.02] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-start">

          {/* ── LEFT: Premium Experience Panel ── */}
          <div className="space-y-10">
            <div className="rsv-label space-y-3">
              <p className="font-sans text-gold tracking-[0.35em] text-xs md:text-sm uppercase">
                Reserva tu Experiencia
              </p>
            </div>

            <div className="rsv-card relative h-52 md:h-60 overflow-hidden rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80&fm=webp"
                alt="Ambiente del restaurante"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-serif text-white/80 text-xs tracking-[0.2em] uppercase">
                  Materia — Alta Cocina
                </p>
              </div>
            </div>

            <blockquote className="rsv-label font-alt text-white/70 text-lg md:text-xl italic leading-relaxed border-l-2 border-gold/30 pl-5">
              &ldquo;Cada mesa en Materia es una historia por descubrir. Una velada donde el tiempo se detiene y los sentidos despiertan.&rdquo;
            </blockquote>

            <div className="w-12 h-[1px] bg-gold/30" />

            <div className="rsv-card grid grid-cols-2 gap-x-8 gap-y-6">
              {[
                { label: "Duración estimada", value: "2.5 horas" },
                { label: "Anticipación", value: "24 horas" },
                { label: "Código de vestimenta", value: "Smart casual" },
                { label: "Disponibilidad", value: "Mié — Dom", gold: true },
              ].map((item, i) => (
                <div key={i}>
                  <p className="font-sans text-white/30 text-[10px] tracking-[0.3em] uppercase mb-1.5">{item.label}</p>
                  <p className={`font-serif text-sm ${item.gold ? "text-gold" : "text-white/60"}`}>{item.value}</p>
                </div>
              ))}
            </div>

            <div className="w-12 h-[1px] bg-gold/30" />

            <div className="rsv-extra space-y-4">
              <p className="font-sans text-white/30 text-[10px] tracking-[0.3em] uppercase">Contacto</p>
              <div className="space-y-2">
                <p className="font-serif text-white/60 text-base">+1 (555) 123-4567</p>
                <p className="font-serif text-white/60 text-base">reservas@materia.com</p>
              </div>
              <p className="font-sans text-white/50 text-sm leading-relaxed pt-2">
                Av. Gastronómica 123<br />Ciudad, CP 28001
              </p>
            </div>
          </div>

          {/* ── RIGHT: Reservation Form ── */}
          {submitted ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center mx-auto mb-6">
                  <p className="font-serif text-2xl text-gold">✓</p>
                </div>
                <p className="font-serif text-3xl text-white mb-3">Reserva confirmada</p>
                <p className="font-sans text-white/40 text-sm max-w-xs mx-auto leading-relaxed">
                  Te enviaremos un correo con los detalles de tu velada en Materia.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white/[0.025] border border-white/[0.06] rounded-sm p-8 md:p-10 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Info */}
                <div className="space-y-6">
                  <p className="font-sans text-white/30 text-[10px] tracking-[0.3em] uppercase">
                    Información personal
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="rsv-card form-group">
                      <label htmlFor="nombre-completo" className="block font-sans text-white/50 text-[11px] tracking-[0.2em] uppercase mb-2.5">Nombre completo</label>
                      <div className="group relative">
                        <input
                          id="nombre-completo"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-transparent border border-white/[0.07] rounded-sm px-5 py-4 text-white placeholder:text-white/20 font-sans text-base transition-all duration-300 outline-none focus:border-gold/40 focus:bg-white/[0.015] focus:shadow-[0_0_20px_-8px_rgba(201,168,76,0.15)]"
                          placeholder="Su nombre"
                          required
                        />
                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold/60 transition-all duration-500 ease-out group-focus-within:w-full" />
                      </div>
                    </div>
                    <div className="rsv-card form-group">
                      <label htmlFor="correo-electronico" className="block font-sans text-white/50 text-[11px] tracking-[0.2em] uppercase mb-2.5">Correo electrónico</label>
                      <div className="group relative">
                        <input
                          id="correo-electronico"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-transparent border border-white/[0.07] rounded-sm px-5 py-4 text-white placeholder:text-white/20 font-sans text-base transition-all duration-300 outline-none focus:border-gold/40 focus:bg-white/[0.015] focus:shadow-[0_0_20px_-8px_rgba(201,168,76,0.15)]"
                          placeholder="correo@ejemplo.com"
                          required
                        />
                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold/60 transition-all duration-500 ease-out group-focus-within:w-full" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reservation Details */}
                <div className="space-y-6">
                  <p className="font-sans text-white/30 text-[10px] tracking-[0.3em] uppercase">
                    Detalles de la reserva
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="rsv-card form-group">
                      <label htmlFor="fecha" className="block font-sans text-white/50 text-[11px] tracking-[0.2em] uppercase mb-2.5">Fecha</label>
                      <div className="group relative">
                        <input
                          id="fecha"
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full bg-transparent border border-white/[0.07] rounded-sm px-5 py-4 text-white font-sans text-base transition-all duration-300 outline-none focus:border-gold/40 focus:bg-white/[0.015] focus:shadow-[0_0_20px_-8px_rgba(201,168,76,0.15)] [color-scheme:dark]"
                          required
                        />
                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold/60 transition-all duration-500 ease-out group-focus-within:w-full" />
                      </div>
                    </div>

                    <div ref={dropdownRef} className="rsv-card form-group relative z-30">
                      <label htmlFor="comensales" className="block font-sans text-white/50 text-[11px] tracking-[0.2em] uppercase mb-2.5">Comensales</label>
                      <div className="group relative">
                        <button
                          id="comensales"
                          type="button"
                          onClick={() => setDropdownOpen((prev) => !prev)}
                          className="w-full bg-transparent border border-white/[0.07] rounded-sm px-5 py-4 text-left font-sans text-base transition-all duration-300 outline-none focus:border-gold/40 focus:bg-white/[0.015] focus:shadow-[0_0_20px_-8px_rgba(201,168,76,0.15)] flex items-center justify-between cursor-pointer"
                        >
                          <span className={guests ? "text-white" : "text-white/30"}>{guests ? `${guests} ${Number(guests) === 1 ? "persona" : "personas"}` : "Seleccionar"}</span>
                          <svg className={`w-3 h-3 text-white/20 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} viewBox="0 0 12 8" fill="none">
                            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold/60 transition-all duration-500 ease-out group-focus-within:w-full" />

                        <div
                          ref={dropdownListRef}
                          className="absolute top-full left-0 right-0 mt-1.5 bg-warm-black border border-white/[0.07] rounded-sm shadow-xl shadow-black/40 opacity-0 pointer-events-none z-50 overflow-hidden"
                          style={dropdownOpen ? { pointerEvents: "auto" } : undefined}
                        >
                          {guestOptions.map((n) => (
                            <button
                              key={n}
                              type="button"
                              onClick={() => { setGuests(String(n)); setDropdownOpen(false); }}
                              className={`w-full text-left px-5 py-4 font-sans text-sm transition-all duration-200 cursor-pointer ${
                                guests === String(n) ? "text-gold bg-gold/[0.04]" : "text-white/50 hover:text-white hover:bg-white/[0.03]"
                              }`}
                            >
                              {n} {n === 1 ? "persona" : "personas"}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                <div className="rsv-card form-group space-y-6">
                  <p className="font-sans text-white/30 text-[10px] tracking-[0.3em] uppercase">
                    Solicitudes especiales
                  </p>
                  <div className="group relative">
                    <textarea
                      id="solicitudes-especiales"
                      placeholder="Alergias, ocasiones especiales, preferencias de mesa..."
                      rows={4}
                      className="w-full bg-transparent border border-white/[0.07] rounded-sm px-5 py-4 text-white placeholder:text-white/20 font-sans text-base transition-all duration-300 outline-none focus:border-gold/40 focus:bg-white/[0.015] focus:shadow-[0_0_20px_-8px_rgba(201,168,76,0.15)] resize-none"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold/60 transition-all duration-500 ease-out group-focus-within:w-full" />
                  </div>
                </div>

                {/* CTA */}
                <div className="rsv-cta pt-4">
                  <button
                    type="submit"
                    className="group/btn relative overflow-hidden bg-gold text-black font-sans tracking-[0.3em] uppercase text-sm px-16 py-5 w-full sm:w-auto transition-all duration-500 cursor-pointer hover:bg-gold-light hover:shadow-[0_0_30px_-5px_rgba(201,168,76,0.3)]"
                  >
                    <span className="relative z-10 font-semibold">Confirmar Reserva</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                  </button>
                  <p className="font-sans text-white/20 text-[10px] tracking-[0.15em] mt-4">
                    Recibirás una confirmación por correo electrónico
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
