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
        <div className="text-center text-zinc-600 text-xs tracking-widest uppercase py-12 border border-dashed border-zinc-900 animate-fade-in"></div>
      ) : (
        Object.entries(heroesPorUniverso).map(
          ([universoNombre, listaDeHeroes]) => {
            const universoColor = listaDeHeroes[0]?.color_hex || "#06b6d4";

            return (
              <div key={universoNombre} className="space-y-6">
                <div className="flex items-center gap-3 border-b border-zinc-900 pb-3 animate-fade-in-left">
                  <span
                    className="w-1.5 h-5 block animate-pulse"
                    style={{
                      backgroundColor: universoColor,
                    }}
                  />
                  <h2 className="text-md font-black uppercase tracking-widest">
                    {universoNombre}
                  </h2>
                  <span className="text-[10px] text-zinc-500 bg-zinc-900/50 px-2 py-0.5 border border-zinc-800/40">
                    {listaDeHeroes.length} ACTIVE_UNITS
                  </span>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {listaDeHeroes.map((hero, index) => (
                    <div
                      key={hero.id_p}
                      onClick={() => onViewProfile(hero.id_p)}
                      style={
                        {
                          "--universo-glow": `${universoColor}26`,
                          "--universo-border": `${universoColor}66`,
                          animationDelay: `${index * 50}ms`,
                        } as React.CSSProperties
                      }
                      className="bg-zinc-900/20 border border-zinc-800/80 p-4 relative cursor-pointer 
                                 /* Efecto de entrada de Tailwind configurado */
                                 animate-fade-in-up
                                 /* Transiciones base para el Hover */
                                 transition-all duration-300 ease-out 
                                 hover:-translate-y-1.5 group"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = `var(--universo-border)`;
                        e.currentTarget.style.boxShadow = `0 12px 30px var(--universo-glow)`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(39, 39, 42, 0.8)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div className="aspect-[4/5] bg-zinc-950 mb-3 overflow-hidden border border-zinc-900 group-hover:border-zinc-700/50 transition-colors">
                        <img
                          src={hero.imagen_url}
                          alt={hero.nombre}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-in-out"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-[9px] text-zinc-500">
                          <span>ID_P: #{hero.id_p}</span>
                          <span
                            className="font-bold animate-pulse"
                            style={{ color: universoColor }}
                          >
                            RANGO_{hero.rango || "X"}
                          </span>
                        </div>
                        <h3
                          className="font-black text-sm uppercase truncate tracking-wide text-white transition-colors duration-300"
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.color = universoColor)
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.color = "white")
                          }
                        >
                          {hero.nombre}
                        </h3>
                        <p className="text-[10px] text-zinc-400 truncate">
                          [{hero.alias || "NO_ALIAS"}]
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          },
        )
      )}
    </div>
  );
};
