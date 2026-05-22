import { useState } from "react";
import { HeroCatalog } from "./HeroCatalog";
import type { Hero } from "../types/hero_types";

interface HeroDashboardProps {
  heroes: Hero[];
  onViewProfile: (id: number) => void;
}

export function HeroDashboard({ heroes, onViewProfile }: HeroDashboardProps) {
  const [activeTab, setActiveTab] = useState<string>("all");

  const seriesUnicas = Array.from(
    new Map(
      heroes
        .filter((h) => h.id_serie && h.text_titulo)
        .map((h) => [h.id_serie, { id: h.id_serie, titulo: h.text_titulo }]),
    ).values(),
  );

  return (
    <div className="w-full min-h-screen bg-zinc-950 p-6 font-mono text-white animate-fade-in">
      <div className="w-full space-y-8">
        <div className="flex justify-center border-b border-zinc-900 pb-3">
          <div className="bg-zinc-900/40 p-1 border border-zinc-800/60 rounded-md flex flex-wrap gap-1">
            {/* Botón: Ver Todo */}
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-1.5 text-xs uppercase tracking-widest font-bold transition-all duration-300 rounded-sm ${
                activeTab === "all"
                  ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              [ ALL_UNITS ]
            </button>

            {seriesUnicas.map((serie) => {
              const isSelected = activeTab === `serie-${serie.id}`;
              return (
                <button
                  key={serie.id}
                  onClick={() => setActiveTab(`serie-${serie.id}`)}
                  className={`px-4 py-1.5 text-xs uppercase tracking-widest font-bold transition-all duration-300 rounded-sm ${
                    isSelected
                      ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                  }`}
                >
                  {serie.titulo ? serie.titulo.split(" ")[0] : "UNK"}
                </button>
              );
            })}
          </div>
        </div>

        <div className="transition-all duration-300 ease-in-out">
          {activeTab === "all" && (
            <div className="animate-fade-in">
              <HeroCatalog
                heroes={heroes}
                selectedSerieId={null}
                onViewProfile={onViewProfile}
              />
            </div>
          )}

          {/* Paneles Filtrados por Anime */}
          {seriesUnicas.map(
            (serie) =>
              activeTab === `serie-${serie.id}` && (
                <div key={serie.id} className="animate-fade-in">
                  <HeroCatalog
                    heroes={heroes}
                    selectedSerieId={serie.id}
                    onViewProfile={onViewProfile}
                  />
                </div>
              ),
          )}
        </div>
      </div>
    </div>
  );
}
