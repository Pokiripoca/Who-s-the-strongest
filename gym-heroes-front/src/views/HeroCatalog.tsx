import { useState } from "react";
import { Search, Filter, Star } from "lucide-react";

const HEROES_MOCK = [
  {
    id: 1,
    name: "Goku",
    serie: "Dragon Ball Z",
    rank: "S",
    color: "text-yellow-500",
    border: "border-yellow-500/50",
    img: "https://images.alphacoders.com/605/605592.png",
  },
  {
    id: 2,
    name: "Izuku Midoriya",
    serie: "Boku No Hero Academia",
    rank: "S",
    color: "text-yellow-500",
    border: "border-yellow-500/50",
    img: "https://images7.alphacoders.com/928/928420.png",
  },
  {
    id: 3,
    name: "Monkey D. Luffy",
    serie: "One Piece",
    rank: "A",
    color: "text-purple-500",
    border: "border-purple-500/50",
    img: "https://images5.alphacoders.com/132/1322132.jpeg",
  },
  {
    id: 4,
    name: "Roronoa Zoro",
    serie: "One Piece",
    rank: "B",
    color: "text-cyan-500",
    border: "border-cyan-500/50",
    img: "https://images2.alphacoders.com/132/1321040.png",
  },
];
// ... tus imports y HEROES_MOCK se mantienen igual

export const HeroCatalog = ({
  serieId,
  onSelectHero,
  onBack,
}: {
  serieId: number;
  onSelectHero: (id: number) => void;
  onBack: () => void;
}) => {
  const [search, setSearch] = useState("");

  return (
    <div className="p-8 bg-black min-h-screen text-white font-sans animate-in fade-in duration-500">
      {/* HEADER DE NAVEGACIÓN */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <button
            onClick={onBack}
            className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-4 hover:text-orange-500 transition-colors flex items-center gap-2"
          >
            ← Back to Universes
          </button>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
            SELECT <span className="text-orange-500 font-normal">YOUR</span>{" "}
            HERO
          </h1>
          <p className="text-zinc-500 text-[10px] font-bold tracking-widest mt-2 uppercase">
            Universe ID: {serieId} — Choose a hero to view your profile.
          </p>
        </div>

        {/* BUSCADOR Y FILTROS */}
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
              size={16}
            />
            <input
              type="text"
              placeholder="Search heroes..."
              className="bg-zinc-900/50 border border-white/5 rounded-lg py-2 pl-10 pr-4 text-xs w-full md:w-64 focus:border-orange-500/50 outline-none transition-all"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="bg-zinc-900/50 border border-white/5 p-2 rounded-lg hover:bg-white/5 transition-colors">
            <Filter size={18} className="text-zinc-400" />
          </button>
        </div>
      </header>

      {/* GRID DE HÉROES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {HEROES_MOCK.filter((h) =>
          h.name.toLowerCase().includes(search.toLowerCase()),
        ).map((hero) => (
          <div
            key={hero.id}
            onClick={() => onSelectHero(hero.id)} // <--- CONEXIÓN DE DATOS
            className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 hover:border-orange-500/50 cursor-pointer transition-all duration-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]"
          >
            {/* BADGE DE RANK */}
            <div
              className={`absolute top-4 left-4 z-20 flex flex-col items-center bg-black/80 backdrop-blur-md border ${hero.border} px-2 py-1 rounded`}
            >
              <span
                className={`text-xl font-black italic leading-none ${hero.color}`}
              >
                {hero.rank}
              </span>
              <span className="text-[7px] font-black text-zinc-500 uppercase tracking-tighter">
                Power Rank
              </span>
            </div>

            {/* BOTÓN FAVORITO */}
            <button
              className="absolute top-4 right-4 z-20 text-zinc-500 hover:text-yellow-500 transition-colors"
              onClick={(e) => e.stopPropagation()} // Evita que al dar clic a la estrella se seleccione el héroe
            >
              <Star size={18} />
            </button>

            {/* IMAGEN DEL HÉROE */}
            <div className="h-[400px] relative overflow-hidden">
              <img
                src={hero.img}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.8] group-hover:brightness-110"
                alt={hero.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
            </div>

            {/* INFO DEL HÉROE */}
            <div className="absolute bottom-0 p-6 w-full transform group-hover:-translate-y-2 transition-transform duration-500">
              <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter mb-1 leading-none">
                {hero.name}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.2em]">
                  {hero.serie}
                </span>
              </div>

              {/* LÍNEA DE PROGRESO DECORATIVA */}
              <div className="mt-4 h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 w-0 group-hover:w-full transition-all duration-700 ease-out" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* BOTÓN CARGAR MÁS */}
      <div className="mt-16 flex flex-col items-center gap-4">
        <div className="h-px w-20 bg-zinc-800" />
        <button className="group bg-zinc-900/50 border border-white/10 px-10 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all flex items-center gap-3">
          <span className="group-hover:rotate-180 transition-transform duration-500 text-orange-500 font-bold text-lg">
            ↻
          </span>
          Load More Heroes
        </button>
      </div>
    </div>
  );
};
