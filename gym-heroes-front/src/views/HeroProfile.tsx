// src/views/HeroProfile.tsx
import { useHero } from "../hooks/useHero";
import { StatsGrid } from "../components/StatsGrid";
import { ArrowLeft } from "lucide-react"; // Para el botón de volver

// 1. Definimos qué necesita este componente para funcionar
interface HeroProfileProps {
  heroId: number;
  onBack: () => void;
}

export const HeroProfile = ({ heroId, onBack }: HeroProfileProps) => {
  // 2. Usamos el heroId que viene por props en lugar de un número fijo
  const { hero, loading } = useHero(heroId);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <span className="text-orange-500 font-black animate-pulse uppercase tracking-[0.5em]">
          Cargando Datos de Héroe...
        </span>
      </div>
    );

  if (!hero) return <div className="text-white">Héroe no encontrado</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 animate-in fade-in duration-700">
      {/* BOTÓN VOLVER - Estilo Minimalista */}
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group"
      >
        <ArrowLeft
          size={18}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="text-[10px] font-black uppercase tracking-widest">
          Regresar al Catálogo
        </span>
      </button>

      <div className="relative flex flex-col md:flex-row gap-12 items-center bg-zinc-900/20 p-10 rounded-[2.5rem] border border-white/5 overflow-hidden backdrop-blur-sm">
        {/* Resplandor de fondo dinámico */}
        <div
          className="absolute -top-24 -left-24 w-[500px] h-[500px] blur-[150px] opacity-10 pointer-events-none"
          style={{ backgroundColor: hero.color }}
        />

        {/* Contenedor de Imagen con Efecto de Aura */}
        <div className="relative w-72 h-72 shrink-0">
          <div
            className="absolute inset-0 rounded-full blur-[60px] opacity-20"
            style={{ backgroundColor: hero.color }}
          />
          <img
            src={`/heroes/${hero.imagen}`}
            alt={hero.nombre}
            className="relative w-full h-full object-contain z-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          />
        </div>

        {/* Info Principal */}
        <div className="flex-1 z-10 text-center md:text-left">
          <div className="flex items-center gap-4 justify-center md:justify-start mb-4">
            <span
              className="px-4 py-1 text-black text-[11px] font-black uppercase italic"
              style={{ backgroundColor: hero.color || "#fff" }}
            >
              Rango {hero.rango}
            </span>
            <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">
              {hero.serie}
            </span>
          </div>

          <h1 className="text-7xl font-black uppercase italic tracking-tighter text-white mb-2 leading-none">
            {hero.nombre}
          </h1>

          <p className="text-zinc-500 font-bold uppercase tracking-widest mb-10 text-xs">
            {hero.rol} //{" "}
            <span className="text-white/20">SYSTEM_ID: 00{heroId}</span>
          </p>

          {/* Tus Stats (Asegúrate de que StatsGrid acepte themeColor) */}
          <StatsGrid stats={hero.stats} themeColor={hero.color} />
        </div>
      </div>
    </div>
  );
};
