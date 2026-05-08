import {
  LayoutDashboard,
  Dumbbell,
  Users,
  Apple,
  LineChart,
  LogOut,
} from "lucide-react";

export const Sidebar = () => {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", ref: "home" },
    { icon: <Dumbbell size={20} />, label: "Sectores", ref: "gym" },
    { icon: <Users size={20} />, label: "Héroes", ref: "heroes" },
    { icon: <Apple size={20} />, label: "Nutrición", ref: "food" },
    { icon: <LineChart size={20} />, label: "Progreso", ref: "stats" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 hover:w-64 bg-black border-r border-white/10 transition-all duration-300 group z-50 flex flex-col justify-between py-8 overflow-hidden">
      {/* LOGO SUPERIOR */}
      <div className="px-6 flex items-center gap-4">
        <div className="min-w-[32px] h-8 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
          <span className="text-black font-black text-xs">GH</span>
        </div>
        <span className="opacity-0 group-hover:opacity-100 text-white font-black italic tracking-tighter text-xl transition-opacity whitespace-nowrap">
          GYM HEROES
        </span>
      </div>

      {/* MENÚ CENTRAL */}
      <nav className="flex flex-col gap-2 px-4">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href={`#${item.ref}`}
            className="flex items-center gap-4 p-3 rounded-xl text-zinc-500 hover:text-cyan-400 hover:bg-white/5 transition-all group/item"
          >
            <div className="min-w-[24px] group-hover/item:scale-110 transition-transform">
              {item.icon}
            </div>
            <span className="opacity-0 group-hover:opacity-100 font-bold uppercase text-[10px] tracking-widest transition-opacity whitespace-nowrap">
              {item.label}
            </span>
          </a>
        ))}
      </nav>

      {/* LOGIN / PERFIL ABAJO */}
      <div className="px-4 border-t border-white/5 pt-6">
        <button className="flex items-center gap-4 p-3 w-full text-zinc-500 hover:text-red-500 transition-colors">
          <LogOut size={20} />
          <span className="opacity-0 group-hover:opacity-100 font-bold uppercase text-[10px] tracking-widest transition-opacity">
            Salir
          </span>
        </button>
      </div>
    </aside>
  );
};
