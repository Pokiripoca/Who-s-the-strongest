import React, { useState, useEffect } from "react";
import type { Hero } from "../types/hero_types";
import { HeroNutrition } from "./HeroNutrition";

interface NutritionProps {
  heroesData: Hero[];
}

interface NutritionRow {
  id_p: number;
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

const MOCK_SUPLEMENTOS = [
  {
    id: 1,
    nombre: "Proteína de Suero All-Might (Smash Powder)",
    categoria: "Proteínas",
    stock: "45 kg",
    dosis: "1 scoop post-entreno",
    estado: "Estable",
  },
  {
    id: 2,
    nombre: "Pre-Entreno Nitro-Endeavor (Hellfire Spark)",
    categoria: "Pre-Workout",
    stock: "12 botes",
    dosis: "1/2 scoop antes de combate",
    estado: "Crítico",
  },
  {
    id: 3,
    nombre: "Creatina Monohidratada Súper Saiyan",
    categoria: "Fuerza/Rendimiento",
    stock: "85 kg",
    dosis: "5g diarios en ayunas",
    estado: "Estable",
  },
  {
    id: 4,
    nombre: "Cápsulas de Regeneración / Sangre de Fénix",
    categoria: "Recuperación",
    stock: "320 caps",
    dosis: "2 caps con cena",
    estado: "Óptimo",
  },
];

export const NutritionDashboard: React.FC<NutritionProps> = ({
  heroesData,
}) => {
  const [globalNutrition, setGlobalNutrition] = useState<NutritionRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"dietas" | "suplementos">(
    "dietas",
  );

  // Estado interno para ver la dieta específica de un héroe sin romper la vista global
  const [focusedHeroId, setFocusedHeroId] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/nutrition/all")
      .then((res) => {
        if (!res.ok) throw new Error("Buscando alternativa");
        return res.json();
      })
      .then((data) => {
        setGlobalNutrition(data);
        setLoading(false);
      })
      .catch(async () => {
        try {
          const promises = heroesData.slice(0, 15).map((h) =>
            fetch(`http://localhost:5000/api/nutrition/${h.id_p}`)
              .then((res) => res.json())
              .then((data) => ({ ...data, id_p: h.id_p })),
          );
          const results = await Promise.all(promises);
          const validDietas = results.filter(
            (r) => r.plan_nombre !== "Sin Plan Asignado",
          );
          setGlobalNutrition(validDietas);
        } catch (err) {
          console.error(err);
        }
        setLoading(false);
      });
  }, [heroesData]);

  const getHeroName = (id: number) => {
    const hero = heroesData.find((h) => h.id_p === id);
    return hero ? `${hero.nombre} (${hero.alias})` : `Héroe ID #${id}`;
  };

  const uniqueAlimentos = Array.from(
    new Map(
      globalNutrition.map((item) => [item.alimento_nombre, item]),
    ).values(),
  ).filter((a) => a.alimento_nombre);

  // Si se ha seleccionado un héroe para ver a detalle, mostramos su ficha específica
  if (focusedHeroId) {
    return (
      <div className="p-8 max-w-7xl mx-auto space-y-4">
        <button
          onClick={() => setFocusedHeroId(null)}
          className="px-4 py-2 bg-zinc-900 border border-zinc-800 hover:border-amber-400 text-zinc-400 hover:text-amber-400 rounded-lg font-mono text-xs transition-all flex items-center gap-2"
        >
          &larr; Volver al Control de Biocombustible Central
        </button>
        <HeroNutrition heroId={focusedHeroId} />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-800 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white uppercase italic">
            Control de{" "}
            <span className="text-amber-400">Biocombustible & Suplementos</span>
          </h1>
          <p className="text-zinc-400 font-mono text-xs mt-1">
            Módulo central de auditoría metabólica global.
          </p>
        </div>

        <div className="flex bg-zinc-900 border border-zinc-800 rounded-lg p-1 font-mono text-sm">
          <button
            onClick={() => setActiveTab("dietas")}
            className={`px-4 py-2 rounded-md font-bold transition-all ${activeTab === "dietas" ? "bg-amber-400 text-black shadow-lg" : "text-zinc-400"}`}
          >
            Dietas y Alimentos
          </button>
          <button
            onClick={() => setActiveTab("suplementos")}
            className={`px-4 py-2 rounded-md font-bold transition-all ${activeTab === "suplementos" ? "bg-amber-400 text-black shadow-lg" : "text-zinc-400"}`}
          >
            Inventario de Suplementos
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 font-mono text-amber-400 animate-pulse">
          Sincronizando registros...
        </div>
      ) : activeTab === "dietas" ? (
        <div className="space-y-10">
          {/* TABLA 1: CATÁLOGO EXCLUSIVO DE ALIMENTOS BASE */}
          <div>
            <h2 className="text-sm font-bold font-mono text-zinc-500 mb-4 uppercase tracking-widest border-l-4 border-cyan-400 pl-3">
              01 / Catálogo de Alimentos Base Registrados
            </h2>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-950/60 text-zinc-400 font-mono text-xs uppercase border-b border-zinc-800">
                    <th className="p-4">Nombre del Alimento</th>
                    <th className="p-4">Categoría Nutricional</th>
                    <th className="p-4 text-right">Estatus de Almacén</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 font-mono text-sm text-zinc-300">
                  {uniqueAlimentos.map((alimento, idx) => (
                    <tr key={idx} className="hover:bg-zinc-850/40">
                      <td className="p-4 font-bold text-white uppercase">
                        {alimento.alimento_nombre}
                      </td>
                      <td className="p-4 text-cyan-400">
                        {alimento.alimento_categoria}
                      </td>
                      <td className="p-4 text-right text-emerald-500 font-bold text-xs">
                        Disponible
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* TABLA 2: ASIGNACIÓN DE DIETAS A HÉROES */}
          <div>
            <h2 className="text-sm font-bold font-mono text-zinc-500 mb-4 uppercase tracking-widest border-l-4 border-amber-400 pl-3">
              02 / Historial de Asignaciones y Planes Activos
            </h2>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-950/60 text-zinc-400 font-mono text-xs uppercase border-b border-zinc-800">
                    <th className="p-4">Héroe</th>
                    <th className="p-4">Plan Nutricional</th>
                    <th className="p-4">Objetivo</th>
                    <th className="p-4">Dieta Base</th>
                    <th className="p-4 text-center">Porción</th>
                    <th className="p-4 text-right">Frecuencia</th>
                    <th className="p-4 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 font-mono text-sm text-zinc-300">
                  {globalNutrition.map((row, index) => (
                    <tr key={index} className="hover:bg-zinc-850/40">
                      <td className="p-4 font-bold text-white border-l-2 border-amber-400 pl-4">
                        {getHeroName(row.id_p)}
                      </td>
                      <td className="p-4">
                        <span className="text-amber-300 font-bold block">
                          {row.plan_nombre}
                        </span>
                        <span className="text-xs text-zinc-500 block truncate max-w-xs">
                          {row.descripcion}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-zinc-800 text-zinc-300">
                          {row.objetivo}
                        </span>
                      </td>
                      <td className="p-4 text-zinc-400">
                        {row.alimento_nombre}
                      </td>
                      <td className="p-4 text-center text-cyan-400 font-bold">
                        {row.porcion}g
                      </td>
                      <td className="p-4 text-right text-zinc-400">
                        {row.frecuencia}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setFocusedHeroId(row.id_p)}
                          className="px-3 py-1 bg-zinc-800 hover:bg-amber-400 hover:text-black rounded text-xs font-bold transition-all"
                        >
                          Ver Dieta
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* TABLA 3: INVENTARIO DE SUPLEMENTOS */
        <div>
          <h2 className="text-sm font-bold font-mono text-zinc-500 mb-4 uppercase tracking-widest border-l-4 border-purple-400 pl-3">
            03 / Inventario General de Suplementación Quirúrgica
          </h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-950/60 text-zinc-400 font-mono text-xs uppercase border-b border-zinc-800">
                  <th className="p-4">ID</th>
                  <th className="p-4">Suplemento</th>
                  <th className="p-4">Categoría</th>
                  <th className="p-4">Dosis Clínicas</th>
                  <th className="p-4 text-center">Stock Registrado</th>
                  <th className="p-4 text-right">Estado de Alerta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 font-mono text-sm text-zinc-300">
                {MOCK_SUPLEMENTOS.map((sup) => (
                  <tr key={sup.id} className="hover:bg-zinc-850/40">
                    <td className="p-4 text-zinc-500">{sup.id}</td>
                    <td className="p-4 font-bold text-white">{sup.nombre}</td>
                    <td className="p-4 text-zinc-400">{sup.categoria}</td>
                    <td className="p-4 text-cyan-400 text-xs">{sup.dosis}</td>
                    <td className="p-4 text-center font-bold text-white">
                      {sup.stock}
                    </td>
                    <td className="p-4 text-right">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-bold ${
                          sup.estado === "Estable" || sup.estado === "Óptimo"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {sup.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
