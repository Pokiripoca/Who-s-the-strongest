// src/views/UniverseSelection.tsx
import type { Hero } from "../types/hero_types";

interface UniverseSelectionProps {
  heroesData: Hero[];
  onSelectSerie: (id: number) => void;
}

export const UniverseSelection = ({
  heroesData,
  onSelectSerie,
}: UniverseSelectionProps) => {
  const seriesUnicas = Array.from(
    new Map(
      heroesData.map((h) => [
        h.id_serie,
        { id: h.id_serie, titulo: h.serie_titulo, color: h.color_hex },
      ]),
    ).values(),
  );

  return (
    <div className="p-12 space-y-8">
      <h2 className="text-xs font-mono tracking-[0.4em] text-zinc-500 uppercase">
        Select_Origin_Universe_
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {seriesUnicas.map((serie) => (
          <div
            key={serie.id}
            onClick={() => onSelectSerie(serie.id)}
            className="p-8 border border-white/10 bg-zinc-900/50 hover:bg-zinc-900 cursor-pointer transition-all relative overflow-hidden group"
            style={{ borderColor: `${serie.color}20` }}
          >
            <div
              className="absolute top-0 left-0 w-1 h-full transition-all group-hover:w-2"
              style={{ backgroundColor: serie.color }}
            />
            <h3 className="text-2xl font-black italic uppercase text-white group-hover:text-cyan-400 transition-colors">
              {serie.titulo}
            </h3>
            <p className="text-[10px] font-mono text-zinc-500 mt-2 tracking-widest uppercase">
              Ver Expedientes →
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
