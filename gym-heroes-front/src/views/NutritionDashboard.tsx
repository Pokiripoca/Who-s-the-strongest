// src/views/NutritionDashboard.tsx
import React, { useState, useMemo } from "react";

export interface AlimentoSQL {
  id_p: number;
  plan_nombre: string;
  objetivo: string;
  aliento_nombre: string;
  aliento_categoria: string;
  calorias: number;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
  porcion: number;
  frecuencia: string;
}

export interface SuplementoSQL {
  id_p: number;
  nombre: string;
  marca: string;
  tipo: string;
  contenido: string;
  costo: number;
  objetivo: string;
  porcion: string;
  timing: string;
}

export interface HeroeSQL {
  id_p: number;
  nombre: string;
  alias: string;
}

interface NutritionDashboardProps {
  alimentosData: AlimentoSQL[];
  suplementosData: SuplementoSQL[];
  heroesData: HeroeSQL[];
  loading?: boolean;
}

export const NutritionDashboard: React.FC<NutritionDashboardProps> = ({
  alimentosData = [],
  suplementosData = [],
  heroesData = [],
  loading = false,
}) => {
  const [selectedHeroId, setSelectedHeroId] = useState<number | string>("");
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>("TODOS");

  // 1. Catálogo General de Alimentos (Valores Únicos)
  const listaAlimentosUnicos = useMemo(() => {
    const vistos = new Set();
    return alimentosData.filter((item) => {
      const duplicado = vistos.has(item.aliento_nombre.toUpperCase());
      vistos.add(item.aliento_nombre.toUpperCase());
      return !duplicado;
    });
  }, [alimentosData]);

  // Generación dinámica de categorías para el selector
  const categoriasUnicas = useMemo(() => {
    return [
      "TODOS",
      ...new Set(
        listaAlimentosUnicos.map((a) => a.aliento_categoria.toUpperCase()),
      ),
    ];
  }, [listaAlimentosUnicos]);

  // Alimentos filtrados por el selector del Frontend
  const alimentosFiltrados = useMemo(() => {
    return listaAlimentosUnicos.filter(
      (a) =>
        categoriaFiltro === "TODOS" ||
        a.aliento_categoria.toUpperCase() === categoriaFiltro,
    );
  }, [listaAlimentosUnicos, categoriaFiltro]);

  // 2. Catálogo General de Suplementos (Valores Únicos)
  const listaSuplementosUnicos = useMemo(() => {
    const vistos = new Set();
    return suplementosData.filter((item) => {
      const duplicado = vistos.has(item.nombre.toUpperCase());
      vistos.add(item.nombre.toUpperCase());
      return !duplicado;
    });
  }, [suplementosData]);

  // 3. Auditoría en tiempo real del Héroe seleccionado
  const dietaDelHeroe = useMemo(() => {
    if (!selectedHeroId) return null;
    const comidas = alimentosData.filter(
      (a) => a.id_p === Number(selectedHeroId),
    );
    const suplementos = suplementosData.filter(
      (s) => s.id_p === Number(selectedHeroId),
    );

    if (comidas.length === 0 && suplementos.length === 0) return null;

    return {
      planNombre: comidas[0]?.plan_nombre || "PLAN GENERAL ASIGNADO",
      objetivo: comidas[0]?.objetivo || "ACONDICIONAMIENTO",
      comidas,
      suplementos,
    };
  }, [selectedHeroId, alimentosData, suplementosData]);

  if (loading) {
    return (
      <div className="p-12 bg-zinc-950 text-zinc-500 font-mono text-xs tracking-widest uppercase animate-pulse">
        Executing_Nutrition_Queries... // Fetching_Live_SQL_Feed
      </div>
    );
  }

  return (
    <div className="p-12 space-y-8 bg-zinc-950 text-white min-h-screen selection:bg-cyan-500 selection:text-black">
      {/* HEADER LOGÍSTICO */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/60 pb-6">
        <div>
          <h2 className="text-xs font-mono tracking-[0.4em] text-zinc-500 uppercase">
            REAL_TIME_NUTRITION_DIET_LOGS_
          </h2>
          <h1 className="text-4xl font-black italic tracking-tight uppercase mt-1">
            Logística de Macronutrientes
          </h1>
        </div>
        <div className="flex items-center gap-4 font-mono text-xs">
          <div className="text-right">
            <p className="text-[10px] text-zinc-500 uppercase">
              SISTEMA_ESTADO
            </p>
            <p className="text-cyan-400 font-bold flex items-center gap-1.5 justify-end">
              <span className="animate-ping text-[6px]">●</span> LIVE_DIET_FEED
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PANEL IZQUIERDO Y CENTRAL: TABLAS MAESTRAS DE ALMACÉN */}
        <div className="lg:col-span-2 space-y-8">
          {/* SECCIÓN 1: ALIMENTOS EN ALMACÉN */}
          <div className="space-y-4">
            <div className="flex justify-between items-center font-mono text-xs">
              <span className="flex items-center gap-2 text-white font-bold">
                [ ] CAT_ALIMENTOS_REGISTRADOS ({alimentosFiltrados.length})
              </span>
              <select
                className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-zinc-400 focus:outline-none focus:border-zinc-700 uppercase font-mono text-xs"
                value={categoriaFiltro}
                onChange={(e) => setCategoriaFiltro(e.target.value)}
              >
                {categoriasUnicas.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800/80 overflow-x-auto max-h-64 overflow-y-auto">
              <table className="w-full text-left border-collapse font-mono text-xs">
                <thead className="sticky top-0 bg-zinc-950 z-10">
                  <tr className="border-b border-zinc-800 text-zinc-500 uppercase tracking-wider text-[10px]">
                    <th className="p-4">Alimento</th>
                    <th className="p-4">Categoría</th>
                    <th className="p-4 text-center">Calorías</th>
                    <th className="p-4 text-center">Proteínas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-850/40 text-zinc-300">
                  {alimentosFiltrados.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="p-8 text-center text-zinc-600 uppercase tracking-widest"
                      >
                        No_Aliments_Stored_In_Database
                      </td>
                    </tr>
                  ) : (
                    alimentosFiltrados.map((al, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-zinc-900/30 transition-colors"
                      >
                        <td className="p-4 font-bold text-white uppercase">
                          {al.aliento_nombre}
                        </td>
                        <td className="p-4 text-zinc-500 text-[11px] uppercase">
                          [{al.aliento_categoria}]
                        </td>
                        <td className="p-4 text-center font-bold text-cyan-400">
                          {al.calorias} KCAL
                        </td>
                        <td className="p-4 text-center font-bold text-zinc-400">
                          {al.proteinas}G
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* SECCIÓN 2: SUPLEMENTOS AMPLILADOS EN ACADEMIA */}
          <div className="space-y-4">
            <div className="font-mono text-xs text-white font-bold flex items-center gap-2">
              [ ] CAT_SUPLEMENTOS_DISPONIBLES ({listaSuplementosUnicos.length})
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800/80 overflow-x-auto max-h-64 overflow-y-auto">
              <table className="w-full text-left border-collapse font-mono text-xs">
                <thead className="sticky top-0 bg-zinc-950 z-10">
                  <tr className="border-b border-zinc-800 text-zinc-500 uppercase tracking-wider text-[10px]">
                    <th className="p-4">Suplemento</th>
                    <th className="p-4">Marca</th>
                    <th className="p-4">Tipo</th>
                    <th className="p-4">Contenido</th>
                    <th className="p-4 text-right">Costo</th>
                    <th className="p-4">Objetivo Suministro</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-850/40 text-zinc-300">
                  {listaSuplementosUnicos.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="p-8 text-center text-zinc-600 uppercase tracking-widest"
                      >
                        No_Supplements_Stored_In_Database
                      </td>
                    </tr>
                  ) : (
                    listaSuplementosUnicos.map((suple, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-zinc-900/30 transition-colors"
                      >
                        <td className="p-4 font-bold text-cyan-400 uppercase">
                          {suple.nombre}
                        </td>
                        <td className="p-4 text-zinc-400 uppercase text-[11px]">
                          {suple.marca}
                        </td>
                        <td className="p-4 text-zinc-500 text-[11px]">
                          <span className="border border-zinc-800 px-1.5 py-0.5 bg-zinc-900 uppercase">
                            {suple.tipo}
                          </span>
                        </td>
                        <td className="p-4 text-zinc-400 text-[11px]">
                          {suple.contenido}
                        </td>
                        <td className="p-4 text-right font-bold text-emerald-400 font-mono">
                          ${Number(suple.costo || 0).toFixed(2)}
                        </td>
                        <td className="p-4 text-zinc-500 text-[11px] uppercase">
                          {suple.objetivo}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: SELECCIÓN E INFORME PERSONALIZADO */}
        <div className="space-y-6 font-mono">
          {/* APARTADO SELECCIÓN */}
          <div className="space-y-2">
            <div className="text-xs text-white font-bold uppercase tracking-wider">
              Auditoría Individual de Sujeto
            </div>
            <select
              value={selectedHeroId}
              onChange={(e) => setSelectedHeroId(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 p-3 text-zinc-300 focus:outline-none focus:border-zinc-700 uppercase font-mono text-xs"
            >
              <option value="">-- SELECCIONAR HÉROE --</option>
              {heroesData.map((heroe) => (
                <option key={heroe.id_p} value={heroe.id_p}>
                  {heroe.nombre.toUpperCase()} [{heroe.alias.toUpperCase()}]
                </option>
              ))}
            </select>
          </div>

          {/* TARJETA ADYACENTE: DIETA ESPECÍFICA DETALLADA */}
          <div className="space-y-2">
            <div className="text-xs text-white font-bold uppercase tracking-wider">
              Asignación Nutricional Específica
            </div>

            {dietaDelHeroe ? (
              <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 space-y-4 text-xs">
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest">
                    PLAN_MAESTRO
                  </p>
                  <p className="font-black text-sm text-white uppercase tracking-wide">
                    {dietaDelHeroe.planNombre}
                  </p>
                  <p className="text-[10px] text-cyan-400 uppercase tracking-wider mt-0.5">
                    META: {dietaDelHeroe.objetivo}
                  </p>
                </div>

                {/* Comidas específicas del ID seleccionado */}
                {dietaDelHeroe.comidas.length > 0 && (
                  <div className="space-y-1.5">
                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">
                      REGISTRO_COMIDAS
                    </p>
                    <div className="bg-zinc-950 border border-zinc-800/60 p-3 space-y-2">
                      {dietaDelHeroe.comidas.map((c, i) => (
                        <div
                          key={i}
                          className="flex justify-between text-[11px] border-b border-zinc-900/60 pb-1 last:border-0 last:pb-0"
                        >
                          <span className="text-zinc-300 font-bold uppercase">
                            {c.aliento_nombre}
                          </span>
                          <span className="text-cyan-400 font-mono">
                            {c.porcion}G / {c.frecuencia.toUpperCase()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suplementos específicos asignados al ID seleccionado */}
                {dietaDelHeroe.suplementos.length > 0 && (
                  <div className="space-y-1.5">
                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">
                      SUPLEMENTACIÓN_ASIGNADA
                    </p>
                    <div className="bg-zinc-950 border border-zinc-800/60 p-3 space-y-2">
                      {dietaDelHeroe.suplementos.map((s, i) => (
                        <div
                          key={i}
                          className="flex flex-col text-[11px] border-b border-zinc-900/60 pb-2 last:border-0 last:pb-0 gap-0.5"
                        >
                          <div className="flex justify-between font-bold">
                            <span className="text-purple-400 uppercase">
                              {s.nombre}
                            </span>
                            <span className="text-zinc-400 font-mono">
                              {s.porcion}
                            </span>
                          </div>
                          <div className="flex justify-between text-[10px] text-zinc-500">
                            <span className="uppercase">
                              TIMING: {s.timing || "POST-ENTRENO"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-zinc-900/20 border border-zinc-800/60 p-8 text-[11px] text-zinc-600 uppercase tracking-widest text-center">
                Awaiting_Hero_Selection_For_Diet_Audit
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
