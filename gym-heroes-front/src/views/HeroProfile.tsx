import React from "react";
import type { Hero } from "../types/hero_types";

interface HeroProfileProps {
  hero: Hero;
  onBack: () => void;
}

export const HeroProfile: React.FC<HeroProfileProps> = ({ hero, onBack }) => {
  const {
    nombre,
    alias,
    rango,
    text_titulo,
    color_hex,
    estatus_salud,
    permite_entrenar,
    tipo_cuerpo,
    faccion,
    peso,
    pecho,
    cintura,
    grasa_pct,
    imagen_url,
  } = hero;

  return (
    <div className="p-12 space-y-6 bg-zinc-950 text-white">
      <div className="flex justify-between items-center border-b border-zinc-800/60 pb-6">
        <div>
          <h2 className="text-xs font-mono tracking-[0.4em] text-zinc-500 uppercase"></h2>
          <h1 className="text-4xl font-black italic tracking-tight uppercase mt-1">
            Expediente Médico
          </h1>
        </div>
        <button
          onClick={onBack}
          className="font-mono text-xs tracking-wider text-zinc-400 hover:text-white transition-colors bg-zinc-900 border border-zinc-800 px-4 py-2 uppercase"
        >
          - VOLVER
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* COMPONENTE IDENTIDAD */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 relative flex flex-col justify-between">
          <div
            style={{ backgroundColor: color_hex }}
            className="absolute top-0 left-0 right-0 h-[3px]"
          />

          <div className="space-y-4">
            <div className="aspect-square bg-zinc-950/80 border border-zinc-850 relative overflow-hidden flex items-center justify-center">
              {imagen_url ? (
                <img
                  src={imagen_url}
                  alt={nombre}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                />
              ) : (
                <span className="text-zinc-600 font-mono text-[10px] tracking-widest">
                  NO_RENDER_DATA
                </span>
              )}
              <span className="absolute top-3 right-3 bg-zinc-900 border border-zinc-800 font-mono text-[10px] px-2 py-0.5 text-zinc-400 uppercase tracking-widest">
                RANK_{rango}
              </span>
            </div>

            <div>
              <span
                style={{ color: color_hex }}
                className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase"
              >
                {text_titulo} {/* */}
              </span>
              <h2 className="text-3xl font-black italic tracking-tight uppercase mt-1">
                {nombre}
              </h2>
              <p className="text-xs font-mono text-zinc-500 lowercase">
                {alias || "no_alias"}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-850/60 space-y-2 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-zinc-550 uppercase">FACCCIÓN</span>
              <span className="text-zinc-300 font-bold uppercase">
                {faccion}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-550 uppercase">BIOTIPO</span>
              <span className="text-zinc-300 font-bold uppercase">
                {tipo_cuerpo}
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-zinc-900/40 border border-zinc-800/80 p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
                ANTROPOMETRÍA_DETALLADA_
              </h3>
              <p className="text-lg font-bold uppercase mt-1">
                Métricas Biológicas en Tiempo Real
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-zinc-950/60 border border-zinc-850 p-4 font-mono">
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
                  MASA CORPO.
                </p>
                <p className="text-2xl font-black tracking-tight text-white mt-1">
                  {peso}{" "}
                  <span className="text-xs font-normal text-zinc-500">KG</span>
                </p>
              </div>
              <div className="bg-zinc-950/60 border border-zinc-850 p-4 font-mono">
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
                  C. PECHO
                </p>
                <p className="text-2xl font-black tracking-tight text-white mt-1">
                  {pecho}{" "}
                  <span className="text-xs font-normal text-zinc-500">CM</span>
                </p>
              </div>
              <div className="bg-zinc-950/60 border border-zinc-850 p-4 font-mono">
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
                  C. CINTURA
                </p>
                <p className="text-2xl font-black tracking-tight text-white mt-1">
                  {cintura}{" "}
                  <span className="text-xs font-normal text-zinc-500">CM</span>
                </p>
              </div>
              <div className="bg-zinc-950/60 border border-zinc-850 p-4 font-mono">
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
                  PCT_GRASA
                </p>
                <p className="text-2xl font-black tracking-tight text-cyan-400 mt-1">
                  {grasa_pct}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-850 p-4 mt-6 flex items-center justify-between font-mono text-xs">
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
                ESTADO DE SALUD
              </p>
              <p className="text-sm font-bold text-zinc-200 mt-0.5 uppercase">
                {estatus_salud}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                AUTORIZACIÓN_GYM
              </p>
              <span
                className={`flex items-center gap-1.5 font-bold uppercase text-xs ${
                  permite_entrenar === "Sí"
                    ? "text-emerald-500"
                    : "text-rose-500"
                }`}
              >
                <span className="text-sm">*</span>{" "}
                {permite_entrenar === "Sí" ? "CLEAR TO TRAIN" : "RESTRICTED"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
