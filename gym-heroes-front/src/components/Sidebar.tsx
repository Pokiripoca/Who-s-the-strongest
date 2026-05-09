import { Home, LayoutGrid, Settings } from "lucide-react";

export const Sidebar = ({ onGoHome }: { onGoHome: () => void }) => {
  return (
    <aside className="w-20 fixed left-0 h-full bg-zinc-900 border-r border-white/5 flex flex-col items-center py-8 gap-10 z-50">
      <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center font-black italic text-black">
        HF
      </div>

      <nav className="flex flex-col gap-6">
        {/* BOTÓN HOME: Al darle clic, resetea todo en App.tsx */}
        <button
          onClick={onGoHome}
          className="p-3 text-zinc-500 hover:text-orange-500 hover:bg-white/5 rounded-xl transition-all"
        >
          <Home size={24} />
        </button>

        <button className="p-3 text-zinc-500 hover:text-orange-500 hover:bg-white/5 rounded-xl transition-all">
          <LayoutGrid size={24} />
        </button>
      </nav>

      <div className="mt-auto">
        <Settings className="text-zinc-700 hover:text-white cursor-pointer" />
      </div>
    </aside>
  );
};
