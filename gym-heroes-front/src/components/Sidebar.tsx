import React from "react";
import { Home, LayoutGrid, Utensils, Activity } from "lucide-react";

interface SidebarProps {
  activeView: string;
  onGoHome: () => void;
  onGoNutrition: () => void;
  onGoUniverses: () => void;
  onGoFacility: () => void;
}

export const Sidebar = ({
  activeView,
  onGoHome,
  onGoNutrition,
  onGoUniverses,
  onGoFacility,
}: SidebarProps) => {
  return (
    <aside className="w-20 fixed left-0 h-full bg-[#0a0a0a] border-r border-white/5 flex flex-col items-center py-8 gap-10 z-50">
      {/* LOGO */}
      <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center font-black italic text-black shadow-[0_0_15px_rgba(6,182,212,0.3)]">
        HF
      </div>

      <nav className="flex flex-col gap-8">
        {/* HOME */}
        <SidebarButton
          onClick={onGoHome}
          icon={<Home size={24} />}
          label="Home"
          active={activeView === "home"}
        />

        {/* UNIVERSOS */}
        <SidebarButton
          onClick={onGoUniverses}
          icon={<LayoutGrid size={24} />}
          label="Universes"
          active={
            activeView === "universes" ||
            activeView === "catalog" ||
            activeView === "profile"
          }
        />

        {/* FACILITY */}
        <SidebarButton
          onClick={onGoFacility}
          icon={<Activity size={24} />}
          label="Facility"
          active={activeView === "facility"}
        />

        {/* NUTRICIÓN */}
        <SidebarButton
          onClick={onGoNutrition}
          icon={<Utensils size={24} />}
          label="Nutrition"
          active={activeView === "nutrition"}
        />
      </nav>
    </aside>
  );
};

// INTERFAZ EXPLÍCITA PARA TU SUB-COMPONENTE ORIGINAL
interface SidebarButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

const SidebarButton = ({
  onClick,
  icon,
  label,
  active,
}: SidebarButtonProps) => (
  <button
    onClick={onClick}
    className={`p-3 rounded-xl transition-all group relative ${
      active
        ? "text-cyan-400 bg-white/5"
        : "text-zinc-500 hover:text-cyan-400 hover:bg-white/5"
    }`}
  >
    {icon}
    <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-cyan-500 text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
      {label}
    </span>
  </button>
);
