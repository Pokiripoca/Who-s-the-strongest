import {
  Home,
  LayoutGrid,
  Utensils,
  Settings,
  BarChart2,
  Activity,
} from "lucide-react";

// 1. Agregamos onGoFacility a la interfaz
interface SidebarProps {
  onGoHome: () => void;
  onGoNutrition: () => void;
  onGoUniverses: () => void;
  onGoFacility: () => void; // <--- Agregado
}

export const Sidebar = ({
  onGoHome,
  onGoNutrition,
  onGoUniverses,
  onGoFacility, // <--- Recibimos la prop
}: SidebarProps) => {
  return (
    <aside className="w-20 fixed left-0 h-full bg-[#0a0a0a] border-r border-white/5 flex flex-col items-center py-8 gap-10 z-50">
      {/* LOGO */}
      <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center font-black italic text-black shadow-[0_0_15px_rgba(249,115,22,0.3)]">
        HF
      </div>

      <nav className="flex flex-col gap-8">
        {/* BOTÓN HOME */}
        <button
          onClick={onGoHome}
          className="p-3 text-zinc-500 hover:text-orange-500 hover:bg-white/5 rounded-xl transition-all group relative"
        >
          <Home size={24} />
          <span className="absolute left-16 bg-orange-500 text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
            Home
          </span>
        </button>

        {/* BOTÓN UNIVERSOS */}
        <button
          onClick={onGoUniverses}
          className="p-3 text-zinc-500 hover:text-orange-500 hover:bg-white/5 rounded-xl transition-all group relative"
        >
          <LayoutGrid size={24} />
          <span className="absolute left-16 bg-orange-500 text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
            Universes
          </span>
        </button>

        {/* BOTÓN NUTRICIÓN */}
        <button
          onClick={onGoNutrition}
          className="p-3 text-zinc-500 hover:text-orange-500 hover:bg-white/5 rounded-xl transition-all group relative"
        >
          <Utensils size={24} />
          <span className="absolute left-16 bg-orange-500 text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
            Nutrition
          </span>
        </button>

        {/* BOTÓN GIMNASIO (FACILITY) */}
        <button
          onClick={onGoFacility}
          className="p-3 text-zinc-500 hover:text-orange-500 hover:bg-white/5 rounded-xl transition-all group relative"
        >
          <Activity size={24} />
          <span className="absolute left-16 bg-orange-500 text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
            Facility
          </span>
        </button>

        {/* BOTÓN PROGRESO */}
        <button className="p-3 text-zinc-500 hover:text-orange-500 hover:bg-white/5 rounded-xl transition-all group relative">
          <BarChart2 size={24} />
          <span className="absolute left-16 bg-orange-500 text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
            Analytics
          </span>
        </button>
      </nav>

      {/* AJUSTES AL FINAL */}
      <div className="mt-auto flex flex-col gap-4">
        <button className="p-3 text-zinc-700 hover:text-white transition-all">
          <Settings size={24} />
        </button>
      </div>
    </aside>
  );
};
