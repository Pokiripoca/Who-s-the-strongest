import React, { useState, useEffect } from "react";

interface NutritionProps {
  heroId: number;
}

interface NutritionData {
  plan_nombre: string;
  objetivo: string;
  calorias: string;
  ratio_proteina: string;
  descripcion: string;
  alimento_nombre: string;
  alimento_categoria: string;
  porcion: number;
  frecuencia: string;
}

export const HeroNutrition: React.FC<NutritionProps> = ({ heroId }) => {
  const [nutrition, setNutrition] = useState<NutritionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!heroId) return;
    setLoading(true);
    fetch(`http://localhost:5000/api/nutrition/${heroId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setNutrition(data[0] || null);
        } else {
          setNutrition(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [heroId]);

  if (loading)
    return (
      <div className="p-4 text-white font-mono text-xs animate-pulse">
        Cargando...
      </div>
    );
  if (!nutrition)
    return <div className="p-4 text-red-400 font-mono text-xs">Sin datos.</div>;

  return (
    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl text-white font-mono">
      <h2 className="text-2xl font-black text-amber-400 mb-2 uppercase italic">
        {nutrition.plan_nombre}
      </h2>
      <p className="text-zinc-400 text-xs mb-4">{nutrition.descripcion}</p>
      <div className="grid grid-cols-3 gap-2 text-xs mb-4">
        <div className="bg-zinc-950 p-2 rounded">🎯 {nutrition.objetivo}</div>
        <div className="bg-zinc-950 p-2 rounded">
          🔥 {nutrition.calorias} kcal
        </div>
        <div className="bg-zinc-950 p-2 rounded">
          💪 Proteína: {nutrition.ratio_proteina}
        </div>
      </div>
    </div>
  );
};
