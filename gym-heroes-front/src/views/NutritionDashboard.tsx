import {
  Search,
  Bell,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Plus,
} from "lucide-react";

export const NutritionDashboard = () => {
  const meals = [
    {
      name: "PROTEIN SHAKE",
      type: "BREAKFAST",
      p: "40g",
      c: "5g",
      f: "6g",
      img: "URL_DE_TU_IMAGEN",
    },
    {
      name: "GRILLED SALMON",
      type: "LUNCH",
      p: "42g",
      c: "28g",
      f: "14g",
      img: "URL_DE_TU_IMAGEN",
    },
    {
      name: "CHICKEN & RICE",
      type: "DINNER",
      p: "45g",
      c: "28g",
      f: "12g",
      img: "URL_DE_TU_IMAGEN",
    },
    {
      name: "GREEK YOGURT BOWL",
      type: "SNACK",
      p: "20g",
      c: "18g",
      f: "4g",
      img: "URL_DE_TU_IMAGEN",
    },
  ];

  return (
    <div className="p-8 bg-[#0a0a0a] min-h-screen text-white">
      {/* HEADER */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-5xl font-black uppercase italic tracking-tighter">
            Eat Like a Hero
          </h1>
          <p className="text-zinc-500 font-medium uppercase text-xs tracking-widest mt-2">
            Fuel your body. Elevate your training.
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
              size={18}
            />
            <input
              className="bg-zinc-900 border border-white/5 rounded-full py-2 pl-10 pr-4 text-xs w-64"
              placeholder="Search meals, foods..."
            />
          </div>
          <Bell className="text-zinc-500 cursor-pointer hover:text-orange-500" />
          <div className="flex items-center gap-3 border-l border-white/10 pl-6">
            <div className="text-right">
              <p className="text-[10px] font-black italic">GOKU</p>
              <p className="text-[8px] text-zinc-500">Saiyan Elite</p>
            </div>
            <img
              src="https://images.alphacoders.com/605/605592.png"
              className="w-10 h-10 rounded-full object-cover border border-orange-500/50"
            />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* COLUMNA IZQUIERDA: MEAL PLAN */}
        <div className="col-span-9 space-y-8">
          <section className="bg-zinc-900/30 border border-white/5 rounded-3xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black italic uppercase flex items-center gap-2">
                <span className="text-orange-500">●</span> Today's Meal Plan
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-lg border border-white/5">
                  <ChevronLeft
                    size={14}
                    className="text-zinc-500 cursor-pointer"
                  />
                  <span className="text-[10px] font-bold uppercase">
                    May 18, 2025
                  </span>
                  <ChevronRight
                    size={14}
                    className="text-zinc-500 cursor-pointer"
                  />
                </div>
                <button className="bg-orange-500 text-black text-[10px] font-black uppercase px-4 py-2 rounded-lg hover:bg-orange-400 transition-all">
                  View Full Plan
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {meals.map((meal, i) => (
                <div
                  key={i}
                  className="bg-zinc-900/50 rounded-2xl overflow-hidden border border-white/5 group hover:border-orange-500/50 transition-all"
                >
                  <div className="h-40 relative">
                    <img
                      src={meal.img}
                      className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 text-[8px] font-black bg-black/80 px-2 py-1 rounded italic uppercase">
                      {meal.type}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-[11px] font-black italic mb-3 uppercase">
                      {meal.name}
                    </h4>
                    <div className="flex justify-between text-[10px] font-bold">
                      <div className="text-center">
                        <p className="text-orange-500">{meal.p}</p>
                        <p className="text-[8px] text-zinc-500">P</p>
                      </div>
                      <div className="text-center">
                        <p className="text-orange-500">{meal.c}</p>
                        <p className="text-[8px] text-zinc-500">C</p>
                      </div>
                      <div className="text-center">
                        <p className="text-orange-500">{meal.f}</p>
                        <p className="text-[8px] text-zinc-500">F</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* COLUMNA DERECHA: MACROS & SUPPLEMENTS */}
        <div className="col-span-3 space-y-6">
          <section className="bg-zinc-900/30 border border-white/5 rounded-3xl p-6">
            <h3 className="font-black italic uppercase text-xs mb-6">
              Macro Summary
            </h3>
            <div className="flex justify-between mb-4">
              {/* Aquí irían los círculos de progreso (puedes usar librerías como Recharts o puro CSS) */}
              {[79, 84, 80].map((val, i) => (
                <div
                  key={i}
                  className="w-16 h-16 rounded-full border-4 border-zinc-800 flex items-center justify-center relative"
                >
                  <span className="text-[10px] font-black italic">{val}%</span>
                  <div className="absolute -bottom-4 text-[7px] font-bold text-zinc-500 uppercase">
                    {i === 0 ? "Protein" : i === 1 ? "Carbs" : "Fats"}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-zinc-900/30 border border-white/5 rounded-3xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black italic uppercase text-xs">
                Supplements
              </h3>
              <span className="text-[8px] text-zinc-500 font-bold uppercase cursor-pointer hover:text-white">
                Manage ›
              </span>
            </div>
            <div className="space-y-3">
              {["Whey Protein", "Creatine", "Fish Oil"].map((sup, i) => (
                <div
                  key={i}
                  className="bg-black/40 border border-white/5 p-3 rounded-xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center">
                      <CheckCircle2 size={14} className="text-orange-500" />
                    </div>
                    <span className="text-[10px] font-bold uppercase">
                      {sup}
                    </span>
                  </div>
                  <CheckCircle2 size={14} className="text-orange-500" />
                </div>
              ))}
              <button className="w-full py-2 border border-dashed border-white/10 rounded-xl text-[8px] font-black uppercase text-zinc-500 hover:border-white/30 transition-all flex items-center justify-center gap-2">
                <Plus size={10} /> Add Supplement
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
