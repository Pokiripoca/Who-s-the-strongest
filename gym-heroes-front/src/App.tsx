import { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { UniverseSelection } from "./views/UniverseSelection";
import { HeroCatalog } from "./views/HeroCatalog";
import { HeroProfile } from "./views/HeroProfile";
import { NutritionDashboard } from "./views/NutritionDashboard";
import { GymFacility } from "./views/GymFacility";
import type { Hero } from "./types/hero_types";

type View =
  | "home"
  | "universes"
  | "catalog"
  | "profile"
  | "facility"
  | "nutrition";

function App() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [selectedHeroId, setSelectedHeroId] = useState<number | null>(null);
  // 1. Añadido el estado que faltaba para guardar la serie seleccionada
  const [selectedSerieId, setSelectedSerieId] = useState<number | null>(null);
  const [heroesData, setHeroesData] = useState<Hero[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/heroes")
      .then((res) => {
        if (!res.ok) throw new Error("Error de conexión al ecosistema API");
        return res.json();
      })
      .then((data) => {
        setHeroesData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Falla crítica al conectar con el backend:", err);
        setLoading(false);
      });
  }, [currentView]);

  return (
    <div className="flex bg-zinc-950 min-h-screen text-white">
      {/* SIDEBAR OPERATIVO */}
      <Sidebar
        activeView={currentView}
        onGoHome={() => setCurrentView("home")}
        onGoUniverses={() => setCurrentView("universes")}
        onGoNutrition={() => setCurrentView("nutrition")}
        onGoFacility={() => setCurrentView("facility")}
      />

      {/* CONTENEDOR DE RENDERS DINÁMICOS */}
      <main className="flex-1 ml-20">
        {/* Agregamos esto para consumir el estado loading de forma productiva */}
        {loading && (
          <div className="fixed top-4 right-4 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs px-3 py-1.5 rounded-full font-mono animate-pulse z-50">
            Sincronizando Base de Datos...
          </div>
        )}

        {/* VISTA 1: HERO CANVAS HOME */}
        {currentView === "home" && (
          <div className="relative min-h-[calc(screen-100px)] flex flex-col items-center justify-center text-center p-12 overflow-hidden select-none">
            {/* Fondo Técnico Sutil (Líneas de Escaneo / Cuadrícula en CSS) */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            {/* Contenedor Central con la Frase Imponente */}
            <div className="relative z-10 max-w-5xl space-y-6">
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.9] text-white">
                FORJAMOS{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-600">
                  LEYENDAS.
                </span>
                <br />
                <span className="text-cyan-400 text-3xl md:text-4xl font-mono tracking-[0.2em] not-italic block my-4 uppercase">
                  CENTRALIZAMOS TU PROGRESO.
                </span>
                DOMINA TU POTENCIAL HÉROE.
              </h1>

              <p className="font-mono text-xs md:text-sm text-zinc-550 max-w-xl mx-auto tracking-widest uppercase leading-relaxed">
                The ultimate data platform to track and optimize your physical
                and nutritional evolution.
              </p>

              {/* Botón Estilo Neón Reactivo */}
              <div className="pt-8">
                <button
                  onClick={() => setCurrentView("universes")}
                  className="relative group px-8 py-3 bg-cyan-950/20 border border-cyan-500/40 text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase transition-all duration-300 hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]"
                >
                  <span className="relative z-10 flex items-center gap-2 justify-center">
                    INITIALIZE_SYSTEM_{" "}
                    <span className="font-sans font-bold">→</span>
                  </span>
                  {/* Esquinas decorativas de interfaz táctica */}
                  <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t-2 border-l-2 border-cyan-400" />
                  <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b-2 border-r-2 border-cyan-400" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VISTA 2: SELECCIÓN DE UNIVERSOS */}
        {currentView === "universes" && (
          <UniverseSelection
            heroesData={heroesData}
            onSelectSerie={(id: number) => {
              setSelectedSerieId(id); // ¡Ahora sí existe!
              setCurrentView("catalog");
            }}
          />
        )}

        {/* VISTA 3: ROSTER COMPLETO FILTRABLE */}
        {currentView === "catalog" && (
          <HeroCatalog
            selectedSerieId={selectedSerieId} // Se lo pasamos por si quieres filtrar el catálogo por el universo clickeado
            onViewProfile={(id: number) => {
              setSelectedHeroId(id);
              setCurrentView("profile");
            }}
          />
        )}

        {/* VISTA 4: EXPEDIENTE CLÍNICO INDIVIDUAL */}
        {currentView === "profile" && selectedHeroId !== null && (
          <HeroProfile
            hero={
              heroesData.find((h) => h.id_p === selectedHeroId) || heroesData[0]
            }
            onBack={() => setCurrentView("catalog")}
          />
        )}

        {/* VISTA 5: MONITOREO ENERGÉTICO Y SUPLEMENTOS */}
        {currentView === "nutrition" && (
          <NutritionDashboard heroesData={heroesData} />
        )}

        {/* VISTA 6: LOGS DE LOGÍSTICA Y MAQUINARIA */}
        {currentView === "facility" && <GymFacility />}
      </main>
    </div>
  );
}

export default App;
