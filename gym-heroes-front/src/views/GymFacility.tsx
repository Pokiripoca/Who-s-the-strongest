// src/views/GymFacility.tsx
import React, { useState, useEffect } from "react";

type GymEquipment = {
  id_equipo: number;
  nombre: string;
  ubicacion: string;
  condicion: string;
};

export const GymFacility: React.FC = () => {
  const [equipos, setEquipos] = useState<GymEquipment[]>([]);
  const [selectedEquipo, setSelectedEquipo] = useState<number | "">("");
  const [idHeroe, setIdHeroe] = useState<number | "">("");
  const [duracion, setDuracion] = useState<number>(30);
  const [estadoFinal, setEstadoFinal] = useState("Excelente");
  const [notas, setNotas] = useState("");
  const [errorBackend, setErrorBackend] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/equipos")
      .then((res) => res.json())
      .then((data) => setEquipos(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorBackend(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/equipos/registrar-uso",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_equipo: selectedEquipo,
            id_heroe: idHeroe,
            duracion,
            estado_ini:
              equipos.find((eq) => eq.id_equipo === selectedEquipo)
                ?.condicion || "Excelente",
            estado_final: estadoFinal,
            limpio: true,
            notas,
          }),
        },
      );

      const resData = await response.json();

      if (!response.ok) {
        // Aquí capturamos de manera reactiva el SIGNAL SQLSTATE '45000' del backend
        throw new Error(resData.message || "Error en el registro");
      }

      alert("¡Uso registrado y estatus de maquinaria actualizado!");
      // Resetear formulario...
    } catch (err: any) {
      setErrorBackend(err.message);
    }
  };

  return (
    <div className="p-6 bg-slate-950 text-slate-100 min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Formulario de Registro Transaccional */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4 lg:col-span-1 h-fit">
        <h2 className="text-xl font-black text-amber-400 tracking-wide">
          LOG DE ENTRENAMIENTO
        </h2>

        {errorBackend && (
          <div className="bg-rose-500/10 border border-rose-500 text-rose-400 p-3 rounded-lg text-xs font-semibold animate-shake">
            {errorBackend}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs text-slate-400 mb-1">
              Maquinaria / Artefacto
            </label>
            <select
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-sm focus:outline-none text-slate-200"
              value={selectedEquipo}
              onChange={(e) => setSelectedEquipo(Number(e.target.value))}
              required
            >
              <option value="">Selecciona equipo...</option>
              {equipos.map((eq) => (
                <option key={eq.id_equipo} value={eq.id_equipo}>
                  {eq.nombre} ({eq.condicion})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">
              ID del Atleta / Héroe
            </label>
            <input
              type="number"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-sm focus:outline-none"
              value={idHeroe}
              onChange={(e) => setIdHeroe(Number(e.target.value))}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Minutos
              </label>
              <input
                type="number"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-sm"
                value={duracion}
                onChange={(e) => setDuracion(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Condición de Entrega
              </label>
              <select
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-sm text-slate-200"
                value={estadoFinal}
                onChange={(e) => setEstadoFinal(e.target.value)}
              >
                <option value="Excelente">Excelente</option>
                <option value="Operativo">Operativo</option>
                <option value="Desgastado">Desgastado</option>
                <option value="Falla Técnica">Falla Técnica</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">
              Reporte Operativo (Notas)
            </label>
            <textarea
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-sm h-20 resize-none"
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              placeholder="Ej. Dejó marcas de quemaduras por ráfagas de ki..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2 rounded-lg text-sm transition-all shadow-md"
          >
            Registrar e Inyectar Datos
          </button>
        </form>
      </div>

      {/* Monitor del Inventario Completo */}
      <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-5 rounded-xl">
        <h2 className="text-xl font-black text-slate-300 tracking-wide mb-4">
          ESTADO DE INFRAESTRUCTURA
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-xs tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3">Equipo</th>
                <th className="p-3">Ubicación</th>
                <th className="p-3 text-center">Condición</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {equipos.map((eq) => (
                <tr key={eq.id_equipo} className="hover:bg-slate-850/40">
                  <td className="p-3 font-semibold text-slate-200">
                    {eq.nombre}
                  </td>
                  <td className="p-3 text-xs text-slate-400">{eq.ubicacion}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-bold ${
                        ["Excelente", "Operativo"].includes(eq.condicion)
                          ? "bg-emerald-500/10 text-emerald-400"
                          : ["Bueno", "Desgastado"].includes(eq.condicion)
                            ? "bg-amber-500/10 text-amber-400"
                            : "bg-rose-500/10 text-rose-400"
                      }`}
                    >
                      {eq.condicion}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
