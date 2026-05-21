import React from "react";
import type { Hero } from "../types/hero_types";

interface UniverseSelectionProps {
  heroesData: Hero[];
  onSelectSerie: (id: number) => void;
}

export const UniverseSelection: React.FC<UniverseSelectionProps> = ({
  heroesData = [],
  onSelectSerie,
}) => {
  const universosUnicos = heroesData.reduce(
    (acc, hero) => {
      const titulo = hero.text_titulo;
      const idSerie = hero.id_serie;

      if (idSerie && titulo && !acc.some((u) => u.id === idSerie)) {
        acc.push({
          id: idSerie,
          titulo: titulo,
          color: hero.color_hex || "#22d3ee",
        });
      }
      return acc;
    },
    [] as { id: number; titulo: string; color: string }[],
  );

  return (
    <div className="p-12 space-y-8 bg-zinc-950 min-h-screen font-mono text-white">
      <div className="space-y-1">
        <h1 className="text-4xl font-black italic tracking-tight uppercase mt-1">
          Universos{" "}
        </h1>
      </div>

      {/* GRILLA TÁCTICA DE UNIVERSOS ANIMADA */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {universosUnicos.map((universo) => (
          <div
            key={universo.id}
            onClick={() => onSelectSerie(universo.id)}
            className="bg-zinc-900/20 border border-zinc-900 p-6 relative cursor-pointer hover:border-zinc-700 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(255,255,255,0.02)] group h-32 flex flex-col justify-between"
          >
            <span
              className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 group-hover:w-1.5"
              style={{ backgroundColor: universo.color }}
            />

            <div>
              <h3 className="text-lg font-black uppercase tracking-wider text-zinc-100 group-hover:text-cyan-400 transition-colors duration-300">
                {universo.titulo}
              </h3>
            </div>

            <div className="flex justify-between items-center text-[10px] text-zinc-500 tracking-widest uppercase">
              <span className="group-hover:text-zinc-300 transition-colors">
                VER EXPEDIENTES →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
