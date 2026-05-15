import { ArrowUpRight } from "lucide-react";

interface Universe {
  id: number;
  slug: string;
  title: string;
  description: string;
  heroesCount: number;
  image?: string;
}

export const UniverseSelection = ({
  onSelectSerie,
}: {
  onSelectSerie: (id: number) => void;
}) => {
  const universes: Universe[] = [
    {
      id: 1,
      slug: "SERIES_01",
      title: "Shonen Forge",
      description: "Will, sweat, ascension.",
      heroesCount: 2,
    },
    {
      id: 2,
      slug: "SERIES_02",
      title: "Cape Doctrine",
      description: "Modern myth.",
      heroesCount: 2,
    },
    {
      id: 3,
      slug: "SERIES_03",
      title: "Mecha Division",
      description: "Pilots & iron.",
      heroesCount: 2,
    },
  ];

  return (
    <div className="p-12 bg-zinc-950 min-h-screen">
      {/* HEADER TÉCNICO */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 bg-cyan-400"></div>
          <span className="text-cyan-400 font-mono text-[10px] tracking-[0.4em] uppercase">
            Multiverse Console / Phase 01 — Universe Selection
          </span>
        </div>

        <h1 className="text-8xl font-[1000] italic uppercase leading-[0.85] tracking-tighter text-white">
          ESCOGE TU
          <br />
          <span className="text-cyan-400">UNIVERSO.</span>
          <br />
        </h1>

        <p className="mt-8 text-zinc-500 max-w-xl text-sm leading-relaxed font-medium">
          Elige el universo del que quieres tomar tu modelo. Cada serie
          desbloquea su roster, su nutrición y su gimnasio con telemetría
          completa.
        </p>
      </div>

      {/* GRID DE UNIVERSOS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/5">
        {universes.map((uni) => (
          <UniverseCard
            key={uni.id}
            universe={uni}
            onClick={() => onSelectSerie(uni.id)}
          />
        ))}
      </div>
    </div>
  );
};

// COMPONENTE INTERNO PARA LAS TARJETAS
const UniverseCard = ({
  universe,
  onClick,
}: {
  universe: Universe;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="group relative border border-white/5 p-8 text-left hover:bg-cyan-400/5 transition-all duration-500 overflow-hidden"
    >
      <div className="flex justify-between items-start mb-12">
        <span className="text-[10px] font-mono text-zinc-600 group-hover:text-cyan-400 transition-colors">
          {universe.slug}
        </span>
        <ArrowUpRight
          size={18}
          className="text-zinc-700 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
        />
      </div>

      <h3 className="text-3xl font-black italic uppercase text-white mb-2 group-hover:tracking-wider transition-all">
        {universe.title}
      </h3>
      <p className="text-zinc-500 text-xs mb-10 font-medium">
        {universe.description}
      </p>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-4xl font-black text-white italic">
            {universe.heroesCount}
          </p>
          <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
            Heroes on Roster
          </p>
        </div>

        {/* Placeholder de imagen pequeña como en el mock */}
        <div className="w-16 h-10 bg-zinc-800 grayscale group-hover:grayscale-0 transition-all opacity-50 group-hover:opacity-100 overflow-hidden rounded-sm">
          <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-black"></div>
        </div>
      </div>

      {/* Línea de acento inferior */}
      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-400 group-hover:w-full transition-all duration-700"></div>
    </button>
  );
};
