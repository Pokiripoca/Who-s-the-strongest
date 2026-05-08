import { useHero } from "../hooks/useHero";
import { StatsGrid } from "../components/StatsGrid";

export const HeroProfile = () => {
  const { hero, loading } = useHero(1);

  if (loading) return <div>Cargando Héroe...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="relative flex flex-col md:flex-row gap-8 items-center bg-zinc-900/30 p-8 rounded-3xl border border-white/5 overflow-hidden">
        {/* Resplandor de fondo basado en el color de la serie */}
        <div
          className="absolute -top-24 -left-24 w-96 h-96 blur-[120px] opacity-20"
          style={{ backgroundColor: hero.color }}
        />

        {/* Imagen del Héroe */}
        <div className="relative w-64 h-64 shrink-0">
          <div
            className="absolute inset-0 rounded-full blur-2xl opacity-40"
            style={{ backgroundColor: hero.color }}
          />
          <img
            src={`/heroes/${hero.imagen}`}
            alt={hero.nombre}
            className="relative w-full h-full object-contain z-10"
          />
        </div>

        {/* Info Principal */}
        <div className="flex-1 z-10 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
            <span className="px-3 py-1 bg-white text-black text-[10px] font-black uppercase italic">
              Rango {hero.rango}
            </span>
            <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
              {hero.serie}
            </span>
          </div>

          <h1 className="text-6xl font-black uppercase italic tracking-tighter text-white mb-1">
            {hero.nombre}
          </h1>
          <p className="text-zinc-400 font-medium uppercase tracking-tight mb-4">
            {hero.rol}
          </p>

          <StatsGrid stats={hero.stats} themeColor={hero.color} />
        </div>
      </div>
    </div>
  );
};
