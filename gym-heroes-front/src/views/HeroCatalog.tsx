// src/views/HeroCatalog.tsx
import React, { useState } from "react";
import { useHeroes } from "../hooks/useHeroes";
import type { Hero } from "../types/hero_types";

interface HeroCatalogProps {
  onViewProfile: (id: number) => void;
  selectedSerieId?: number | null;
}

export const HeroCatalog: React.FC<HeroCatalogProps> = ({
  onViewProfile,
  selectedSerieId,
}) => {
  const { heroes, loading, error } = useHeroes();
  const [search, setSearch] = useState("");
  const [selectedFaccion, setSelectedFaccion] = useState("Todos");

  const facciones = ["Todos", ...new Set(heroes.map((h) => h.faccion))];

  const filteredHeroes = heroes.filter((h) => {
    const matchesSearch =
      h.nombre.toLowerCase().includes(search.toLowerCase()) ||
      (h.alias && h.alias.toLowerCase().includes(search.toLowerCase()));
    const matchesFaccion =
      selectedFaccion === "Todos" || h.faccion === selectedFaccion;
    const matchesSerie = !selectedSerieId || h.id_serie === selectedSerieId;

    return matchesSearch && matchesFaccion && matchesSerie;
  });

  if (loading)
    return (
      <div className="p-12 font-mono text-xs tracking-widest text-zinc-500 animate-pulse uppercase">
        Syncing_Database_Roster...
      </div>
    );
  if (error)
    return (
      <div className="p-12 font-mono text-xs tracking-widest text-rose-500 uppercase">
        System_Error:: {error}
      </div>
    );

  return (
    <div className="p-12 space-y-8 bg-zinc-950 text-white">
      {/* HEADER OPERATIVO */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/60 pb-6">
        <div>
          <h2 className="text-xs font-mono tracking-[0.4em] text-zinc-500 uppercase">
            Active_Roster_Logs_
          </h2>
          <h1 className="text-4xl font-black italic tracking-tight uppercase mt-1">
            Miembros de la Arena
          </h1>
        </div>

        {/* FILTROS INTEGRADOS */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <input
            type="text"
            placeholder="BUSCAR GUERRERO..."
            className="bg-zinc-900 border border-zinc-800 px-4 py-2 text-zinc-300 focus:outline-none focus:border-zinc-700 uppercase tracking-wider"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="bg-zinc-900 border border-zinc-800 px-3 py-2 text-zinc-300 focus:outline-none focus:border-zinc-700 uppercase tracking-wider"
            value={selectedFaccion}
            onChange={(e) => setSelectedFaccion(e.target.value)}
          >
            {facciones.map((fac) => (
              <option key={fac} value={fac}>
                {fac.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* GRID DE COMPONENTES TÁCTICOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredHeroes.map((heroe: Hero) => (
          <div
            key={heroe.id_p}
            onClick={() => onViewProfile(heroe.id_p)}
            className="bg-zinc-900/40 border border-zinc-800/80 p-5 cursor-pointer hover:bg-zinc-900 transition-all relative flex flex-col justify-between group"
          >
            {/* Indicador lateral sutil del universo */}
            <div
              style={{ backgroundColor: heroe.color_hex }}
              className="absolute top-0 left-0 bottom-0 w-[3px] transition-all group-hover:w-[5px]"
            />

            <div className="space-y-4 pl-2">
              <div className="flex items-center justify-between font-mono text-[10px] tracking-widest text-zinc-500">
                <span className="uppercase">{heroe.faccion}</span>
                <span className="font-bold border border-zinc-800 px-1.5 py-0.5">
                  RNG_{heroe.rango}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black italic uppercase tracking-wide group-hover:text-cyan-400 transition-colors">
                  {heroe.nombre}
                </h3>
                <p className="text-xs font-mono text-zinc-400 lowercase mt-0.5">
                  @{heroe.alias || "no_alias"}
                </p>
              </div>

              <div className="space-y-1 pt-2 border-t border-zinc-850 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-zinc-500 uppercase">BIOTIPO:</span>
                  <span className="text-zinc-300 font-bold uppercase">
                    {heroe.tipo_cuerpo}
                  </span>
                </div>
              </div>
            </div>

            {/* STATUS BADGES DE TU INTERFAZ REAL */}
            <div className="mt-5 pt-3 border-t border-zinc-850/60 pl-2 flex items-center justify-between font-mono text-[10px] tracking-widest">
              <span
                style={{ color: heroe.color_hex }}
                className="font-bold uppercase text-[9px]"
              >
                {heroe.serie_titulo}
              </span>
              <span
                className={`flex items-center gap-1.5 font-bold uppercase ${
                  heroe.permite_entrenar === "Sí"
                    ? "text-emerald-500"
                    : "text-rose-500"
                }`}
              >
                <span className="text-xs">●</span>{" "}
                {heroe.estatus_salud.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
