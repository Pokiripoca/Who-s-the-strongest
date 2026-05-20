import type { Hero } from "../types/hero_types";

interface HeroCatalogProps {
  heroesData: Hero[];
  serieId: number; // El ID de la serie que viene desde App.tsx
  onSelectHero: (id: number) => void;
  onBack: () => void;
}

export const HeroCatalog = ({
  heroesData,
  serieId,
  onSelectHero,
  onBack,
}: HeroCatalogProps) => {
  // 🔥 AQUÍ ESTÁ EL TRUCO: Filtramos los héroes cuyo id_serie coincida con el seleccionado
  const heroesFiltrados = heroesData.filter((hero) => {
    return Number(hero.id_serie) === Number(serieId);
  });

  return (
    <div className="p-12 space-y-8">
      {/* Botón para regresar a los universos */}
      <button
        onClick={onBack}
        className="text-xs font-mono text-zinc-500 hover:text-cyan-400 uppercase tracking-widest"
      >
        ← Volver a Universos
      </button>

      <h2 className="text-3xl font-black italic uppercase text-white">
        Expedientes Disponibles ({heroesFiltrados.length})
      </h2>

      {/* Grid del Catálogo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {heroesFiltrados.map((hero) => (
          <div
            key={hero.id_p}
            onClick={() => onSelectHero(hero.id_p)}
            className="border border-white/10 bg-zinc-900/40 p-4 cursor-pointer hover:border-cyan-500/50 transition-all group"
          >
            <div className="aspect-[3/4] overflow-hidden bg-zinc-950 mb-4 border border-white/5">
              <img
                src={hero.imagen_url}
                alt={hero.nombre}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <span
              className="text-[9px] font-mono uppercase tracking-widest"
              style={{ color: hero.color_hex }}
            >
              {hero.rango ? `RANK ${hero.rango}` : "RANK B"}
            </span>
            <h3 className="text-xl font-bold uppercase text-white tracking-tight mt-1">
              {hero.nombre}
            </h3>
            <p className="text-xs font-mono text-zinc-500 italic mt-0.5">
              {hero.alias}
            </p>
          </div>
        ))}
      </div>

      {heroesFiltrados.length === 0 && (
        <div className="p-12 border border-dashed border-white/5 text-center text-zinc-500 font-mono text-sm">
          No hay héroes registrados para este universo en la base de datos.
        </div>
      )}
    </div>
  );
};
