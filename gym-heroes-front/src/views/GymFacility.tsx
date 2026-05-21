import React, { useState, useEffect } from "react";
import { Database, ShieldAlert, ShieldCheck, MapPin } from "lucide-react";

interface RealEquipment {
  id_equipo: number;
  nombre: string;
  categoria: string;
  condicion: string;
  ultimo_mantenimineto: string;
  ubicacion: string;
}

export const GymFacility: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"areas" | "inventario">("areas");
  const [equipment, setEquipment] = useState<RealEquipment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    fetch("http://localhost:5000/api/facility/equipment")
      .then((res) => {
        if (!res.ok) throw new Error("Error al consultar el servidor");
        return res.json();
      })
      .then((data) => {
        setEquipment(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error leyendo infraestructura de la DB:", err);
        setLoading(false);
      });
  }, []);

  const ubicacionesUnicas = Array.from(
    new Set(equipment.map((e) => e.ubicacion || "Área General Master")),
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* CABECERA */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white uppercase italic">
            Sistemas de <span className="text-cyan-400">Infraestructura</span>
          </h1>
          <p className="text-zinc-500 font-mono text-xs mt-1 flex items-center gap-1">
            <Database size={12} /> Datos sincronizados en vivo desde la tabla
            `equipamineto`.
          </p>
        </div>

        {/* SELECTOR DE PESTAÑAS */}
        <div className="flex bg-[#0a0a0a] border border-white/5 rounded-xl p-1 font-mono text-sm">
          <button
            onClick={() => setActiveTab("areas")}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${activeTab === "areas" ? "bg-cyan-500 text-black shadow-lg" : "text-zinc-400"}`}
          >
            Sectores Operativos
          </button>
          <button
            onClick={() => setActiveTab("inventario")}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${activeTab === "inventario" ? "bg-cyan-500 text-black shadow-lg" : "text-zinc-400"}`}
          >
            Inventario de Maquinaria
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 font-mono text-cyan-400 animate-pulse text-sm">
          CONSULTANDO RED DE SENSORES HARDWARE...
        </div>
      ) : activeTab === "areas" ? (
        <div className="space-y-6">
          <h2 className="text-xs font-bold font-mono text-zinc-600 uppercase tracking-widest border-l-4 border-cyan-400 pl-3">
            Estatus por Cuadrantes de Entrenamiento Real
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ubicacionesUnicas.map((zona, idx) => {
              const equiposEnZona = equipment.filter(
                (e) => e.ubicacion === zona,
              );

              const enMantenimiento = equiposEnZona.filter(
                (e) =>
                  e.condicion.toLowerCase().includes("mantenimiento") ||
                  e.condicion.toLowerCase().includes("critico") ||
                  e.condicion.toLowerCase().includes("dañado"),
              ).length;

              return (
                <div
                  key={idx}
                  className="bg-[#0c0c0e] border border-white/5 rounded-2xl p-6 relative group overflow-hidden hover:border-cyan-500/20 transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/[0.02] rounded-full blur-2xl pointer-events-none" />

                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400/70 uppercase tracking-wider font-bold mb-1">
                    <MapPin size={10} /> Sector Registrado
                  </div>

                  <h3 className="text-lg font-black text-white uppercase tracking-tight mb-4 group-hover:text-cyan-400 transition-colors">
                    {zona}
                  </h3>

                  <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4 font-mono text-xs text-zinc-400">
                    <div>
                      <span className="block text-zinc-600 font-bold uppercase text-[9px]">
                        Hardware Activo
                      </span>
                      <span className="text-base font-bold text-white">
                        {equiposEnZona.length}{" "}
                        {equiposEnZona.length === 1 ? "Unidad" : "Unidades"}
                      </span>
                    </div>
                    <div>
                      <span className="block text-zinc-600 font-bold uppercase text-[9px]">
                        Estado Crítico
                      </span>
                      <span
                        className={`text-base font-bold ${enMantenimiento > 0 ? "text-red-400 animate-pulse" : "text-emerald-400"}`}
                      >
                        {enMantenimiento} Alertas
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xs font-bold font-mono text-zinc-600 mb-4 uppercase tracking-widest border-l-4 border-cyan-400 pl-3">
            Hardware y Herramientas Quirúrgicas del Ecosistema
          </h2>
          <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono text-xs">
                <thead>
                  <tr className="bg-[#0c0c0e] text-zinc-500 uppercase tracking-wider border-b border-white/5">
                    <th className="p-4 w-20">ID</th>
                    <th className="p-4">Dispositivo</th>
                    <th className="p-4">Categoría</th>
                    <th className="p-4">Ubicación Actual</th>
                    <th className="p-4">Último Mantenimiento</th>
                    <th className="p-4 text-right">Estatus Físico</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300">
                  {equipment.map((eq) => {
                    const condLower = eq.condicion.toLowerCase();
                    const esOptimo =
                      condLower.includes("excelente") ||
                      condLower.includes("operativo") ||
                      condLower.includes("bueno") ||
                      condLower.includes("indestructible");

                    return (
                      <tr
                        key={eq.id_equipo}
                        className="hover:bg-white/[0.01] transition-colors group"
                      >
                        <td className="p-4 text-zinc-600 font-bold">
                          #{eq.id_equipo}
                        </td>
                        <td className="p-4 font-bold text-white uppercase tracking-wide group-hover:text-cyan-400 transition-colors">
                          {eq.nombre}
                        </td>
                        <td className="p-4 text-zinc-400">{eq.categoria}</td>
                        <td className="p-4 text-zinc-400">
                          <span className="bg-zinc-900/50 px-2 py-1 rounded border border-white/5 text-zinc-300">
                            {eq.ubicacion}
                          </span>
                        </td>
                        <td className="p-4 text-zinc-500">
                          {eq.ultimo_mantenimineto
                            ? eq.ultimo_mantenimineto.split("T")[0]
                            : "Sin Registro"}
                        </td>
                        <td className="p-4 text-right">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase border ${
                              esOptimo
                                ? "bg-emerald-500/5 text-emerald-400 border-emerald-500/10"
                                : "bg-red-500/5 text-red-400 border-red-500/10 animate-pulse"
                            }`}
                          >
                            {esOptimo ? (
                              <ShieldCheck size={10} />
                            ) : (
                              <ShieldAlert size={10} />
                            )}
                            {eq.condicion}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
