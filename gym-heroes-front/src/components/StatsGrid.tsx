import type { HeroStats } from "../types/index";
interface Props {
  stats: HeroStats;
  themeColor: string;
}

export const StatsGrid = ({ stats, themeColor }: Props) => {
  const statItems = [
    { label: "IMC", value: stats.imc },
    { label: "% Grasa", value: stats.grasa },
    { label: "Metabolismo", value: `${stats.metabolismo} kcal` },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      {statItems.map((item) => (
        <div
          key={item.label}
          className="bg-zinc-900/50 border border-white/5 p-4 rounded-xl backdrop-blur-md"
        >
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">
            {item.label}
          </p>
          <p
            className="text-xl font-black italic"
            style={{ color: themeColor }}
          >
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
};
