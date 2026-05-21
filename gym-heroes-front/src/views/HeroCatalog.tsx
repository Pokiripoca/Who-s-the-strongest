import React from "react";
import type { Hero } from "../types/hero_types";

export interface HeroCatalogProps {
  heroes: Hero[];
  selectedSerieId: number | null;
  onViewProfile: (id: number) => void;
}

export const HeroCatalog: React.FC<HeroCatalogProps> = ({
  heroes = [],
  selectedSerieId = null,
  onViewProfile,
}) => {
  const heroesFiltrados = selectedSerieId
    ? heroes.filter((h) => h.id_serie === selectedSerieId)
    : heroes;

  const heroesPorUniverso = heroesFiltrados.reduce(
    (acc, hero) => {
      const universoKey = hero.text_titulo || "Universo Desconocido";
      if (!acc[universoKey]) {
        acc[universoKey] = [];
      }
      acc[universoKey].push(hero);
      return acc;
    },
    {} as Record<string, Hero[]>,
  );

  return (
    <div className="p-12 space-y-12 bg-zinc-950 min-h-screen text-white font-mono">
      {Object.keys(heroesPorUniverso).length === 0 ? (
        <div className="text-center text-zinc-600 text-xs tracking-widest uppercase py-12 border border-dashed border-zinc-900"></div>
      ) : (
        Object.entries(heroesPorUniverso).map(
          ([universoNombre, listaDeHeroes]) => (
            <div key={universoNombre} className="space-y-6">
              {/* ENCABEZADO LOGÍSTICO */}
              <div className="flex items-center gap-3 border-b border-zinc-900 pb-3">
                <span
                  className="w-1.5 h-5 block"
                  style={{
                    backgroundColor: listaDeHeroes[0]?.color_hex || "#06b6d4",
                  }}
                />
                <h2 className="text-md font-black uppercase tracking-widest">
                  {universoNombre}
                </h2>
                <span className="text-[10px] text-zinc-500 bg-zinc-900/50 px-2 py-0.5 border border-zinc-800/40">
                  {listaDeHeroes.length} ACTIVE_UNITS
                </span>
              </div>

              {/* cuaditos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {listaDeHeroes.map((hero) => (
                  <div
                    key={hero.id_p}
                    onClick={() => onViewProfile(hero.id_p)}
                    className="bg-zinc-900/20 border border-zinc-800/80 p-4 relative group cursor-pointer hover:border-cyan-500/40 transition-all duration-200"
                  >
                    <div className="aspect-[4/5] bg-zinc-950 mb-3 overflow-hidden border border-zinc-900 group-hover:border-zinc-800 transition-colors">
                      <img
                        src={hero.imagen_url}
                        alt={hero.nombre}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300 grayscale group-hover:grayscale-0"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[9px] text-zinc-500">
                        <span>ID_P: #{hero.id_p}</span>
                        <span className="text-cyan-400 font-bold">
                          RANGO_{hero.rango}
                        </span>
                      </div>
                      <h3 className="font-black text-sm uppercase truncate tracking-wide text-white group-hover:text-cyan-400 transition-colors">
                        {hero.nombre}
                      </h3>
                      <p className="text-[10px] text-zinc-400 truncate">
                        [{hero.alias}]
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ),
        )
      )}
    </div>
  );
};
