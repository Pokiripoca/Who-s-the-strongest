import { Dumbbell, Download } from "lucide-react";

export const GymFacility = () => {
  const equipment = [
    {
      name: "SMITH MACHINE",
      zone: "STRENGTH",
      status: "OPTIMAL",
      img: "url_smith",
    },
    {
      name: "TREADMILLS",
      zone: "CARDIO",
      status: "OPTIMAL",
      img: "url_treadmill",
    },
    {
      name: "LEG PRESS",
      zone: "STRENGTH",
      status: "OPTIMAL",
      img: "url_legpress",
    },
    {
      name: "SPIN BIKES",
      zone: "CARDIO",
      status: "MAINTENANCE",
      img: "url_bikes",
    },
  ];

  return (
    <div className="p-8 bg-[#0a0a0a] min-h-screen text-white">
      {/* HEADER */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">
            Facility Status
          </h1>
          <p className="text-zinc-500 text-xs font-bold uppercase mt-1">
            Real-time overview of gym equipment and training zones.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-orange-500 text-black px-4 py-2 rounded-lg font-black text-[10px] uppercase hover:bg-orange-400 transition-all">
          <Download size={14} /> Export Report
        </button>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* GRID DE EQUIPAMIENTO */}
        <div className="col-span-8 space-y-6">
          <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black italic uppercase flex items-center gap-2 text-sm">
                <Dumbbell size={18} className="text-orange-500" /> Equipment
                Status
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {equipment.map((item, i) => (
                <div
                  key={i}
                  className="bg-black/40 border border-white/5 rounded-2xl overflow-hidden p-4 group hover:border-orange-500/30"
                >
                  <div className="flex gap-4">
                    <div className="w-24 h-16 bg-zinc-800 rounded-xl overflow-hidden">
                      <img
                        src={item.img}
                        className="w-full h-full object-cover opacity-50"
                      />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black italic uppercase">
                        {item.name}
                      </h4>
                      <p className="text-[8px] text-zinc-500 font-bold uppercase">
                        {item.zone} ZONE
                      </p>
                      <div
                        className={`flex items-center gap-1 mt-2 text-[8px] font-black ${item.status === "OPTIMAL" ? "text-green-500" : "text-red-500"}`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${item.status === "OPTIMAL" ? "bg-green-500 shadow-[0_0_5px_green]" : "bg-red-500 shadow-[0_0_5px_red]"}`}
                        />
                        {item.status}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: ZONAS */}
        <div className="col-span-4 space-y-6">
          <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-6">
            <h3 className="font-black italic uppercase text-xs mb-6">
              Training Zones
            </h3>
            {["CARDIO", "STRENGTH", "RECOVERY"].map((zone, i) => (
              <div
                key={i}
                className="relative h-32 rounded-2xl overflow-hidden mb-4 group cursor-pointer border border-white/5"
              >
                <img
                  src={`url_${zone}`}
                  className="absolute w-full h-full object-cover opacity-40 group-hover:scale-105 transition-all"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-[10px] font-black italic">{zone} ZONE</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[8px] text-zinc-400 font-bold uppercase">
                      Util: 74%
                    </span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-green-500 text-[8px] font-black text-black px-2 py-0.5 rounded italic">
                  OPTIMAL
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
