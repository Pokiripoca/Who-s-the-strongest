import { useState, useMemo } from "react";
import { ArrowLeft, Search, Filter, SlidersHorizontal } from "lucide-react";
import type { Hero } from "../types/hero_types";

interface HeroCatalogProps {
  serieId: number;
  onSelectHero: (id: number) => void;
  onBack: () => void;
  heroesData: Hero[]; // Pasamos los héroes como prop o los traemos de un hook
}

export const HeroCatalog = ({
  serieId,
  onSelectHero,
  onBack,
  heroesData,
}: HeroCatalogProps) => {
  const [search, setSearch] = useState("");
  const [filterRango, setFilterRango] = useState("ALL");
  const [filterFaccion, setFilterFaccion] = useState("ALL");

  // Lógica de filtrado dinámico
  const filteredHeroes = useMemo(() => {
    return heroesData.filter((hero) => {
      const matchesSearch =
        hero.nombre.toLowerCase().includes(search.toLowerCase()) ||
        hero.alias.toLowerCase().includes(search.toLowerCase());
      const matchesRank = filterRango === "ALL" || hero.rango === filterRango;
      const matchesFaction =
        filterFaccion === "ALL" || hero.faccion === filterFaccion;
      // Aquí usamos serieId para asegurar que solo vemos héroes de este universo
      // const matchesSerie = hero.serie_id === serieId;

      return matchesSearch && matchesRank && matchesFaction;
    });
  }, [search, filterRango, filterFaccion, heroesData]);

  return (
    <div className="p-12 bg-zinc-950 min-h-screen">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-zinc-600 hover:text-cyan-400 mb-6 transition-colors font-mono text-[10px] tracking-widest uppercase"
          >
            <ArrowLeft size={14} /> Back to Multiverse Selection
          </button>
          <h2 className="text-6xl font-[1000] italic uppercase tracking-tighter">
            Top Tier Heroes{" "}
            <span className="text-zinc-800 ml-4">/ SID_{serieId}</span>
          </h2>
        </div>
        <Filter size={20} className="text-zinc-800 mb-2" />{" "}
        {/* Ya se usa Filter */}
      </div>

      {/* PANEL DE FILTROS TÉCNICOS */}
      <div className="flex flex-wrap items-center gap-6 p-4 bg-zinc-900/30 border border-white/5 mb-10 rounded-sm backdrop-blur-md">
        <div className="relative flex-1 min-w-[240px]">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
            size={16}
          />
          <input
            type="text"
            value={search}
            placeholder="FILTER_BY_NAME_OR_ALIAS..."
            className="w-full bg-black/40 border border-white/10 py-2 pl-10 pr-4 text-[10px] font-mono text-cyan-400 focus:outline-none focus:border-cyan-400/50 uppercase"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <FilterGroup
          label="Rank"
          value={filterRango}
          onChange={setFilterRango}
          options={["S+", "S", "A", "B"]}
        />
        <FilterGroup
          label="Faction"
          value={filterFaccion}
          onChange={setFilterFaccion}
          options={["VANGUARD", "SENTINEL", "NEUTRAL"]}
        />

        <div className="ml-auto flex items-center gap-4 border-l border-white/10 pl-6">
          <div className="text-right">
            <p className="text-[8px] font-mono text-zinc-600 uppercase">
              Found
            </p>
            <p className="text-[10px] font-black text-cyan-400 italic">
              {filteredHeroes.length} ACTIVE_DOSSIERS
            </p>
          </div>
          <SlidersHorizontal size={18} className="text-zinc-700" />
        </div>
      </div>

      {/* GRID DE RESULTADOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 border border-white/5 bg-white/5">
        {filteredHeroes.map((hero) => (
          <HeroCard
            key={hero.id_p}
            hero={hero}
            onClick={() => onSelectHero(hero.id_p)}
          />
        ))}
      </div>
    </div>
  );
};

// Componentes pequeños para mantener limpio el código
const FilterGroup = ({ label, value, onChange, options }: any) => (
  <div className="flex items-center gap-2">
    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">
      {label}:
    </span>
    <select
      value={value}
      className="bg-black/40 border border-white/10 text-[10px] font-mono p-2 text-white focus:outline-none focus:border-cyan-400 uppercase"
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="ALL">ALL_{label.toUpperCase()}</option>
      {options.map((opt: string) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const HeroCard = ({ hero, onClick }: { hero: Hero; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="group relative flex flex-col bg-zinc-950 p-6 border border-white/5 hover:bg-zinc-900 transition-all text-left"
  >
    <div className="relative aspect-[3/4] mb-6 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
      <img
        src={hero.imagen_url}
        alt={hero.nombre}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
      />
      <div className="absolute top-2 left-2 bg-cyan-500 text-black px-2 py-1 text-[10px] font-black italic uppercase">
        Rank {hero.rango}
      </div>
    </div>
    <p className="text-cyan-500 font-mono text-[9px] uppercase tracking-tighter mb-1">
      {hero.faccion}
    </p>
    <h3 className="text-2xl font-[1000] italic uppercase leading-none text-white">
      {hero.nombre}
    </h3>
    <p className="text-zinc-600 text-xs font-bold mt-1 uppercase tracking-tighter">
      {hero.alias}
    </p>
  </button>
);
