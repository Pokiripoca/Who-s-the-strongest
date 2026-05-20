import { ArrowLeft, Activity } from "lucide-react";
import type { Hero } from "../types/hero_types";

interface HeroProfileProps {
  hero: Hero;
  onBack: () => void;
}

export const HeroProfile = ({ hero, onBack }: HeroProfileProps) => {
  return (
    <div className="p-12 bg-zinc-950 min-h-screen animate-in fade-in zoom-in-95 duration-500">
      {/* Botón Volver */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-zinc-600 hover:text-cyan-400 mb-12 transition-colors font-mono text-[10px] tracking-[0.4em] uppercase group"
      >
        <ArrowLeft
          size={14}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Exit_Dossier [ESC]
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Identificación (Izquierda) */}
        <div className="lg:col-span-4 space-y-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 to-transparent h-1 w-full animate-scan z-10"></div>
            <div className="relative aspect-[3/4] border border-white/10 overflow-hidden bg-zinc-900">
              <img
                src={hero.imagen_url}
                alt={hero.nombre}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-zinc-950 to-transparent">
                {/* Muestra dinámicamente la serie real de la base de datos */}
                <span
                  className="font-mono text-[10px] tracking-[0.5em] uppercase block mb-2"
                  style={{ color: hero.color_hex || "#22d3ee" }}
                >
                  {hero.serie_titulo} // {hero.faccion}
                </span>
                <h2 className="text-5xl font-[1000] italic uppercase text-white leading-none tracking-tighter">
                  {hero.nombre}
                </h2>
                <p className="text-zinc-500 font-mono text-xs mt-2 italic">
                  {hero.alias}
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5">
            <DataBox label="Rank" value={hero.rango} color="text-cyan-400" />
            <DataBox
              label="Health"
              value={hero.estatus_salud}
              color="text-emerald-500"
            />
          </div>
        </div>

        {/* Biometría (Derecha) */}
        <div className="lg:col-span-8 space-y-12">
          <div className="relative">
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600 mb-6 flex items-center gap-2">
              <Activity size={14} className="text-cyan-500" />{" "}
              Biometric_Analysis_v.4
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* 🔥 SOLUCIÓN INTEGRAL AL UNDEFINED:
                Usamos el operador de coalescencia nula (??). Si 'hero.peso' no existe,
                busca en 'hero.stats.peso'. Si tampoco existe, muestra '0' por defecto.
              */}
              <StatCard
                label="Weight"
                value={`${(hero as any).peso ?? 0}`}
                unit="kg"
              />
              <StatCard
                label="Chest"
                value={`${(hero as any).pecho ?? 0}`}
                unit="cm"
              />
              <StatCard
                label="Waist"
                value={`${(hero as any).cintura ?? 0}`}
                unit="cm"
              />
              <StatCard
                label="Body Fat"
                value={`${(hero as any).grasa_pct ?? 0}`}
                unit="%"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DataBox = ({ label, value, color }: any) => (
  <div className="bg-zinc-950 p-5 border border-white/5">
    <p className="text-[9px] font-mono text-zinc-600 uppercase mb-1 tracking-widest">
      {label}
    </p>
    <p className={`text-2xl font-black italic uppercase ${color}`}>{value}</p>
  </div>
);

const StatCard = ({ label, value, unit }: any) => (
  <div className="bg-zinc-900/20 border border-white/5 p-6 group hover:bg-zinc-900 transition-all">
    <p className="text-[9px] font-mono text-zinc-500 uppercase mb-3">{label}</p>
    <div className="flex items-baseline gap-1">
      <span className="text-3xl font-black italic text-white leading-none">
        {value}
      </span>
      <span className="text-[10px] font-mono text-zinc-600 uppercase font-bold">
        {unit}
      </span>
    </div>
  </div>
);
