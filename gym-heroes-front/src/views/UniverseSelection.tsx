import { Zap } from "lucide-react";

export const UniverseSelection = ({
  onSelectSerie,
}: {
  onSelectSerie: (id: number) => void;
}) => {
  // Datos simulados de universos
  const universos = [
    {
      id: 1,
      nombre: "Dragon Ball Z",
      heroes: 12,
      color: "#f97316",
      img: "https://images.alphacoders.com/605/605592.png",
    },
    {
      id: 2,
      nombre: "My Hero Academia",
      heroes: 8,
      color: "#06b6d4",
      img: "https://images7.alphacoders.com/928/928420.png",
    },
    {
      id: 3,
      nombre: "Marvel Universe",
      heroes: 24,
      color: "#ef4444",
      img: "https://images.alphacoders.com/135/1351221.png",
    },
  ];

  return (
    <div className="p-8 mt-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12">
        <h1 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none">
          SELECT <span className="text-orange-500">UNIVERSE</span>
        </h1>
        <p className="text-zinc-500 text-[10px] font-black tracking-[0.3em] uppercase mt-2">
          Protocolo de sincronización dimensional activo
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {universos.map((uni) => (
          <div
            key={uni.id}
            onClick={() => onSelectSerie(uni.id)}
            className="group relative h-[450px] rounded-[2.5rem] overflow-hidden border border-white/5 cursor-pointer hover:border-white/20 transition-all duration-500"
          >
            {/* Fondo con imagen y overlay */}
            <img
              src={uni.img}
              className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-40 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

            {/* Contenido Táctico */}
            <div className="absolute bottom-0 p-8 w-full">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: uni.color }}
                />
                <span className="text-[10px] font-black text-zinc-500 tracking-widest uppercase">
                  {uni.heroes} Unidades Disponibles
                </span>
              </div>

              <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-2 group-hover:text-orange-500 transition-colors">
                {uni.nombre}
              </h2>

              <div
                className="h-1 w-0 group-hover:w-full transition-all duration-700"
                style={{ backgroundColor: uni.color }}
              />
            </div>

            {/* Badge Flotante */}
            <div className="absolute top-6 right-6 p-3 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 group-hover:border-orange-500/50 transition-colors">
              <Zap
                size={20}
                className="text-zinc-500 group-hover:text-orange-500 transition-colors"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
