export const Home = () => {
  return (
    <div
      className="relative min-h-[90vh] w-full flex flex-col items-center justify-center bg-black px-6 overflow-hidden"
      style={{ fontFamily: "sans-serif" }}
    >
      {/* GLOW DE FONDO (Más sutil y pequeño) */}
      <div className="absolute w-[400px] h-[200px] bg-cyan-500/10 blur-[100px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        {/* LINEA 1: BLANCA (Bajado de 8rem a 4.5rem máximo) */}
        <h1
          className="text-white font-black italic tracking-tighter leading-none text-center uppercase"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
        >
          FORJAMOS LEYENDAS.
        </h1>

        {/* LINEA 2: CYAN (Bajado de 4rem a 2.2rem máximo) */}
        <h2
          className="text-cyan-400 font-black tracking-tight leading-none text-center uppercase mt-2"
          style={{ fontSize: "clamp(1.2rem, 3vw, 2.2rem)" }}
        >
          CENTRALIZAMOS TU PROGRESO.
        </h2>

        {/* LINEA 3: BLANCA */}
        <h1
          className="text-white font-black italic tracking-tighter leading-none text-center uppercase mt-2"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
        >
          DOMINA TU POTENCIAL HÉROE.
        </h1>

        {/* DESCRIPCIÓN (Ajustado el max-w para que no se extienda tanto) */}
        <p className="text-zinc-500 text-center max-w-lg mt-8 font-medium tracking-wide uppercase text-[11px] md:text-xs">
          The ultimate data platform to track and optimize your physical and
          nutritional evolution.
        </p>

        {/* BOTÓN GET STARTED (Más compacto) */}
        <div className="mt-12">
          <button className="group relative px-12 py-3.5 bg-transparent border border-cyan-500/50 rounded-lg transition-all hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            <span className="text-cyan-400 font-black italic tracking-[0.3em] text-[11px] flex items-center gap-3 group-hover:scale-105 transition-transform">
              GET STARTED <span className="text-xl">›</span>
            </span>
          </button>
        </div>
      </div>

      {/* FOOTER DE LA HOME (Más discreto) */}
      <div className="absolute bottom-8 flex justify-between w-full max-w-4xl px-8 border-t border-white/5 pt-6 opacity-30">
        <div className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">
          <span className="text-zinc-400">TRACK</span> EVERY REP
        </div>
        <div className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">
          <span className="text-zinc-400">ANALYZE</span> PROGRESS
        </div>
        <div className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">
          <span className="text-zinc-400">PLAN</span> PATH
        </div>
        <div className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">
          <span className="text-zinc-400">BECOME</span> BEST
        </div>
      </div>
    </div>
  );
};
