// src/views/GymFacility.tsx
import { Wrench, CheckCircle2, AlertTriangle } from "lucide-react";

const equipment = [
  {
    id: 1,
    name: "Rogue Power Rack R-7",
    type: "RACK",
    lastService: "2026-04-12",
    status: "Optimal",
  },
  {
    id: 2,
    name: "Eleiko Olympic Bar",
    type: "BARBELL",
    lastService: "2026-04-30",
    status: "Optimal",
  },
  {
    id: 3,
    name: "Concept2 RowErg",
    type: "CARDIO",
    lastService: "2026-03-08",
    status: "Maintenance",
  },
  {
    id: 4,
    name: "Assault Bike Pro",
    type: "CARDIO",
    lastService: "2026-05-01",
    status: "Optimal",
  },
];

export const GymFacility = () => {
  return (
    <div className="p-12">
      <header className="mb-12">
        <span className="text-zinc-500 font-mono text-[10px] tracking-widest uppercase">
          05 / CAT_EQUIPAMIENTO_GYM
        </span>
        <h2 className="text-5xl font-black italic uppercase mt-2">
          Nuestro Gimnasio
        </h2>
        <p className="text-zinc-500 mt-2">
          Instalaciones, equipo y rutinas oficiales de los héroes.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 border border-white/5 bg-white/5">
        {equipment.map((item) => (
          <div
            key={item.id}
            className="bg-zinc-950 p-6 group hover:bg-zinc-900 transition-colors"
          >
            <div className="flex justify-between items-start mb-8">
              <Wrench
                size={18}
                className="text-zinc-700 group-hover:text-cyan-400"
              />
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-sm text-[10px] font-bold uppercase ${
                  item.status === "Optimal"
                    ? "text-emerald-500 bg-emerald-500/10"
                    : "text-orange-500 bg-orange-500/10"
                }`}
              >
                {item.status === "Optimal" ? (
                  <CheckCircle2 size={10} />
                ) : (
                  <AlertTriangle size={10} />
                )}
                {item.status}
              </div>
            </div>

            <h4 className="text-xl font-black italic uppercase leading-tight mb-1">
              {item.name}
            </h4>
            <p className="text-zinc-600 text-[10px] font-mono tracking-widest mb-6">
              {item.type}
            </p>

            <div className="border-t border-white/5 pt-4">
              <p className="text-zinc-500 text-[9px] uppercase font-bold tracking-tighter">
                Last service • {item.lastService}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
