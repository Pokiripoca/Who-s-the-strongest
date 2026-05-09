const seriesData = [
  {
    id: 1,
    nombre: "DRAGON BALL",
    logo: "https://img.vidsrc.me/logo/dbz.png",
    image: "https://images7.alphacoders.com/611/611138.png",
    color: "#f97316",
  },
  {
    id: 2,
    nombre: "MY HERO ACADEMIA",
    logo: "logo_url",
    image: "https://images7.alphacoders.com/928/928420.png",
    color: "#06b6d4",
  },
  {
    id: 3,
    nombre: "ONE PIECE",
    logo: "logo_url",
    image: "https://images5.alphacoders.com/132/1322421.jpeg",
    color: "#ef4444",
  },
  // Aquí se irán sumando solitos los que agregues en la DB
];

export const Series = () => {
  return (
    <div className="min-h-screen bg-black p-8 flex flex-col items-center">
      <div className="text-center mb-12 mt-10">
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic">
          CHOOSE YOUR <span className="text-orange-500">UNIVERSE</span>
        </h1>
        <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mt-4">
          Select the anime universe that fuels your journey.
        </p>
      </div>

      {/* El GRID que se ajusta solo: 
          Si hay 3 se ven grandes, si hay 10 se acomodan en filas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-7xl">
        {seriesData.map((serie) => (
          <div
            key={serie.id}
            className="relative group cursor-pointer overflow-hidden rounded-3xl border-2 border-white/5 bg-zinc-900 transition-all duration-500 hover:border-orange-500/50 shadow-2xl"
          >
            {/* Imagen de fondo con Overlay */}
            <div className="aspect-[3/4] relative">
              <img
                src={serie.image}
                alt={serie.nombre}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-60 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              {/* Contenido de la Card */}
              <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center">
                <h3 className="text-2xl font-black text-white italic tracking-tighter mb-6 group-hover:scale-110 transition-transform">
                  {serie.nombre}
                </h3>

                <button className="w-full py-3 bg-white/5 border border-white/20 text-white font-black italic tracking-widest text-[10px] uppercase rounded-xl group-hover:bg-orange-500 group-hover:text-black group-hover:border-transparent transition-all">
                  SELECT
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-20 opacity-40">
        <p className="text-orange-500 font-black italic text-sm tracking-tighter">
          " THE ONLY LIMIT IS THE ONE YOU SET YOURSELF. "
        </p>
      </footer>
    </div>
  );
};
