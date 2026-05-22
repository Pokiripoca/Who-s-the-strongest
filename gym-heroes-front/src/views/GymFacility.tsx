import React, { useState } from "react";

export interface EquipamientoSQL {
  id_equipo: number;
  nombre: string;
  categoria: string;
  condicion: string;
  ultimo_mantenimineto: string;
  ubicacion: string;
}

export interface UsoEquipamientoSQL {
  id_uso: number;
  id_equipo: number;
  id_heroe: number;
  fecha: string;
  duracion_min: number;
  estado_ini: string;
  estado_final: string;
  limpio: number;
  notas_adicionales: string;
  heroe_nombre?: string;
}

interface GymFacilityProps {
  equipamientoData: EquipamientoSQL[];
  usoData: UsoEquipamientoSQL[];
  loading?: boolean;
}

export const GymFacility: React.FC<GymFacilityProps> = ({
  equipamientoData = [],
  usoData = [],
}) => {
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>("TODOS");

  const categoriasUnicas = [
    "TODOS",
    ...new Set(
      equipamientoData
        .map((e) => e?.categoria?.toUpperCase() || "GENERAL")
        .filter(Boolean),
    ),
  ];

  const equiposFiltrados = equipamientoData.filter((e) => {
    if (!e) return false;
    const cat = e.categoria?.toUpperCase() || "GENERAL";
    return categoriaFiltro === "TODOS" || cat === categoriaFiltro;
  });

  const incidenciasCriticas = usoData.filter((log) => {
    if (!log) return false;
    const estadoFinal = log.estado_final?.toLowerCase() || "";
    return estadoFinal === "desgastado" || log.limpio === 0;
  });

  return (
    <div className="p-12 space-y-8 bg-zinc-950 text-white min-h-screen selection:bg-orange-500 selection:text-black">
      {/* HEADWR  */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/60 pb-6">
        <div>
          <h1 className="text-4xl font-black italic tracking-tight uppercase mt-1">
            Nuestro Gimnasio{" "}
          </h1>
        </div>
        <div className="flex items-center gap-4 font-mono text-xs">
          <div className="text-right"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center font-mono text-xs">
            <span className="flex items-center gap-2 text-white font-bold">
              <span className="text-orange-500">⚄</span> EQUIPAMINETO_INVENTARIO
              ({equiposFiltrados.length})
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

          {equiposFiltrados.length === 0 ? (
            <div className="p-8 border border-zinc-900 bg-zinc-900/10 text-center font-mono text-xs text-zinc-600 uppercase tracking-widest"></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {equiposFiltrados.map((equipo) => {
                const mantenimientoStr =
                  equipo.ultimo_mantenimineto ||
                  (equipo as any).ultimo_mantenimiento ||
                  "No registrado";
                const condicionStr = equipo.condicion || "Operativo";

                return (
                  <div
                    key={equipo.id_equipo}
                    className="bg-zinc-900/40 border border-zinc-800/80 p-5 flex flex-col justify-between group relative"
                  >
                    <div className="space-y-4 font-mono">
                      <div className="flex justify-between items-start text-[9px] text-zinc-500">
                        <span>ID_EQ: #{equipo.id_equipo}</span>
                        <span
                          className="uppercase tracking-widest text-zinc-400 truncate max-w-[120px]"
                          title={equipo.ubicacion}
                        >
                          {equipo.ubicacion || "Zona General"}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-md font-black uppercase text-white tracking-wide group-hover:text-cyan-400 transition-colors duration-200">
                          {equipo.nombre}
                        </h4>
                        <p className="text-[9px] text-zinc-500 uppercase tracking-widest mt-1">
                          [{equipo.categoria || "General"}]
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-zinc-850/60 font-mono flex items-center justify-between text-[10px] gap-2">
                      <span
                        className="text-zinc-500 truncate"
                        title={mantenimientoStr}
                      >
                        MNT: {mantenimientoStr}
                      </span>
                      <span
                        className={`flex items-center gap-1 font-bold shrink-0 ${
                          condicionStr.toLowerCase() === "mantenimiento" ||
                          condicionStr.toLowerCase() === "falla"
                            ? "text-rose-500"
                            : condicionStr.toLowerCase() === "excelente" ||
                                condicionStr.toLowerCase() === "indestructible"
                              ? "text-emerald-400"
                              : "text-orange-400"
                        }`}
                      >
                        *{condicionStr.toUpperCase()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* BITÁCORA EN VIVO DE LA TABLA USO_EQUIPAMIENTO */}
          <div className="pt-6 space-y-4">
            <div className="font-mono text-xs text-white font-bold flex items-center gap-2">
              USO_EQUIPAMIENTO
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800/80 overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono text-xs">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500 uppercase tracking-wider text-[10px]">
                    <th className="p-4">ID_EQ</th>
                    <th className="p-4">Timestamp_SQL</th>
                    <th className="p-4 text-center">Duración</th>
                    <th className="p-4 text-center">Sanidad</th>
                    <th className="p-4">Notas Adicionales</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-850/40 text-zinc-300">
                  {usoData.length === 0 ? (
                    <tr></tr>
                  ) : (
                    usoData.map((log) => (
                      <tr
                        key={log.id_uso}
                        className="hover:bg-zinc-900/30 transition-colors"
                      >
                        <td className="p-4 font-bold text-cyan-400">
                          #{log.id_equipo}
                        </td>
                        <td className="p-4 text-zinc-500 text-[11px]">
                          {log.fecha}
                        </td>
                        <td className="p-4 text-center font-bold text-white">
                          {log.duracion_min} MIN
                        </td>
                        <td className="p-4 text-center">
                          <span
                            className={`px-2 py-0.5 text-[9px] font-bold ${
                              log.limpio === 1
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            }`}
                          >
                            {log.limpio === 1 ? "CLEAN" : "DIRTY"}
                          </span>
                        </td>
                        <td
                          className="p-4 text-zinc-400 text-[11px] max-w-xs truncate"
                          title={log.notas_adicionales}
                        >
                          {log.notas_adicionales}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: ALERTAS Y UBICACIONES AUTOMATIZADAS */}
        <div className="space-y-4 font-mono">
          <div className="text-xs text-white font-bold flex items-center gap-2">
            <span className="text-orange-500"></span> INCIDENTES_Y_REPORTES
          </div>

          {incidenciasCriticas.length === 0 ? (
            <div className="bg-zinc-900/20 border border-zinc-800/60 p-4 text-[11px] text-zinc-500 uppercase tracking-widest text-center">
              SIN_ALERTAS
            </div>
          ) : (
            incidenciasCriticas.map((inc) => (
              <div
                key={inc.id_uso}
                className="bg-orange-950/20 border border-orange-900/40 p-4 text-[11px] text-orange-400 space-y-1"
              >
                <p className="font-bold uppercase tracking-wider">
                  ¡REGISTRO_CRÍTICO! # {inc.id_uso}
                </p>
                <p className="leading-relaxed text-zinc-300 text-[10px]">
                  El equipo{" "}
                  <span className="text-cyan-400 font-bold">
                    #{inc.id_equipo}
                  </span>{" "}
                  terminó el entrenamiento con estatus{" "}
                  <span className="text-rose-400 font-bold">
                    "{inc.estado_final || "Desgastado"}"
                  </span>
                  .
                </p>
                {inc.notas_adicionales && (
                  <p className="text-[10px] text-orange-500/90 italic pt-1 border-t border-orange-900/20">
                    Ref: {inc.notas_adicionales}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
