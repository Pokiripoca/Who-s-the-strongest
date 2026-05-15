import { Utensils, Zap, Database } from "lucide-react";

export const NutritionDashboard = () => {
  return (
    <div
      id="nutrition"
      className="p-12 bg-zinc-950 min-h-screen border-t border-white/5"
    >
      <header className="mb-16">
        <span className="text-cyan-400 font-mono text-[10px] tracking-[0.4em] uppercase">
          ■ 06 / EAT_LIKE_A_HERO
        </span>
        <h2 className="text-7xl font-[1000] italic uppercase leading-none mt-4 text-white">
          EAT LIKE
          <br />
          <span className="text-zinc-800">A HERO</span>
        </h2>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* COL 1: ACTIVE PLANS (Tabla: cat_planes_nutricion) */}
        <div className="space-y-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
            <Zap size={14} className="text-cyan-400" /> Active_Plans
          </h3>
          <div className="bg-zinc-900/50 border border-cyan-400/20 p-6 group hover:border-cyan-400 transition-all">
            <p className="text-cyan-400 font-mono text-[10px] mb-2 uppercase">
              Vanguard Surplus
            </p>
            <h4 className="text-2xl font-black italic uppercase text-white leading-tight">
              Bulking Phase_01
            </h4>
            <div className="mt-6 flex justify-between items-end">
              <div>
                <p className="text-3xl font-black text-white italic">3,400</p>
                <p className="text-[10px] text-zinc-500 uppercase font-bold">
                  Kcal / Day
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-zinc-400 italic">
                  High Carb
                </p>
                <p className="text-[10px] text-zinc-500 uppercase font-bold">
                  Macro Focus
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* COL 2: DAILY DIET (Rel_Hero_Alimento) */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
            <Utensils size={14} className="text-cyan-400" /> Current_Hero_Diet
          </h3>
          <div className="border border-white/5 bg-zinc-900/20 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/5 text-[10px] font-mono text-zinc-500 uppercase">
                  <th className="p-4">Meal</th>
                  <th className="p-4">Food Item</th>
                  <th className="p-4 text-right">Amount</th>
                  <th className="p-4 text-right">Protein</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-black italic text-cyan-400">
                    Breakfast
                  </td>
                  <td className="p-4 text-white uppercase font-bold text-xs">
                    Oats + Whey Protein
                  </td>
                  <td className="p-4 text-right text-zinc-400 italic">
                    120g / 2 Scoops
                  </td>
                  <td className="p-4 text-right font-black text-white">45g</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-black italic text-cyan-400">Lunch</td>
                  <td className="p-4 text-white uppercase font-bold text-xs">
                    Chicken Breast + Jasmine Rice
                  </td>
                  <td className="p-4 text-right text-zinc-400 italic">
                    250g / 150g
                  </td>
                  <td className="p-4 text-right font-black text-white">62g</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FOOTER: FOOD DATABASE SECTOR */}
      <div className="mt-12 bg-zinc-900/10 border border-white/5 p-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Database size={40} className="text-zinc-800" />
          <div>
            <h5 className="font-black italic uppercase text-xl">
              Food_Database_v.1
            </h5>
            <p className="text-zinc-500 text-xs uppercase tracking-tighter">
              Search & analyze 500+ ingredients for hero performance
            </p>
          </div>
        </div>
        <button className="bg-white text-black px-6 py-2 text-xs font-black uppercase italic hover:bg-cyan-400 transition-colors">
          Open Database
        </button>
      </div>
    </div>
  );
};
