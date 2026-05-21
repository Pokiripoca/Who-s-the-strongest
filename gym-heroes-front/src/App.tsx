import { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { UniverseSelection } from "./views/UniverseSelection";
import { HeroCatalog } from "./views/HeroCatalog";
import { HeroProfile } from "./views/HeroProfile";
import { NutritionDashboard } from "./views/NutritionDashboard";
import { GymFacility } from "./views/GymFacility";

import type { Hero } from "./types/hero_types";
import type { EquipamientoSQL, UsoEquipamientoSQL } from "./views/GymFacility";

type View =
  | "home"
  | "universes"
  | "catalog"
  | "profile"
  | "facility"
  | "nutrition";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [selectedSerieId, setSelectedSerieId] = useState<number | null>(null);
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);

  const [backendAlimentos, setBackendAlimentos] = useState<any[]>([]);
  const [backendSuplementos, setBackendSuplementos] = useState<any[]>([]);
  const [isNutritionLoading, setIsNutritionLoading] = useState<boolean>(false);

  const [backendEquipamiento, setBackendEquipamiento] = useState<
    EquipamientoSQL[]
  >([]);
  const [backendUsoLogs, setBackendUsoLogs] = useState<UsoEquipamientoSQL[]>(
    [],
  );
  const [isFacilityLoading, setIsFacilityLoading] = useState<boolean>(false);
  //  CARGA GLOBAL DE HÉROES
  useEffect(() => {
    const fetchGlobalHeroes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/heroes");
        if (response.ok) {
          const data = await response.json();
          setHeroes(data);
        }
      } catch (error) {
        console.error(" Error cargando héroes desde SQL:", error);
      }
    };
    fetchGlobalHeroes();
  }, []);

  // CARGA REAL DE NUTRICIÓN DESDE TU DB
  useEffect(() => {
    if (currentView === "nutrition") {
      const fetchNutritionData = async () => {
        setIsNutritionLoading(true);
        try {
          const [resAlimentos, resSuplementos] = await Promise.all([
            fetch("http://localhost:5000/api/nutrition/all"),
            fetch("http://localhost:5000/api/nutrition/supplements"),
          ]);

          if (resAlimentos.ok) {
            const dataAlimentos = await resAlimentos.json();
            setBackendAlimentos(dataAlimentos);
          }
          if (resSuplementos.ok) {
            const dataSuplementos = await resSuplementos.json();
            setBackendSuplementos(dataSuplementos);
          }
        } catch (error) {
          console.error(
            " Error consultando base de datos de nutrición:",
            error,
          );
        } finally {
          setIsNutritionLoading(false);
        }
      };
      fetchNutritionData();
    }
  }, [currentView]);

  //  CARGA DE DATOS DEL GIMNASIO
  useEffect(() => {
    if (currentView === "facility") {
      const fetchFacilityData = async () => {
        setIsFacilityLoading(true);
        try {
          const resEquipamiento = await fetch(
            "http://localhost:5000/api/facility/equipment",
          );
          const resUso = await fetch(
            "http://localhost:5000/api/facility/usage",
          );

          if (resEquipamiento.ok)
            setBackendEquipamiento(await resEquipamiento.json());
          if (resUso.ok) setBackendUsoLogs(await resUso.json());
        } catch (error) {
          console.error(" Error consultando logs de infraestructura:", error);
        } finally {
          setIsFacilityLoading(false);
        }
      };
      fetchFacilityData();
    }
  }, [currentView]);

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white selection:bg-cyan-500 selection:text-black antialiased">
      <Sidebar
        activeView={currentView}
        onGoHome={() => setCurrentView("home")}
        onGoUniverses={() => setCurrentView("universes")}
        onGoFacility={() => setCurrentView("facility")}
        onGoNutrition={() => setCurrentView("nutrition")}
      />

      <main className="flex-1 min-h-screen pl-20 overflow-y-auto transition-all duration-300">
        {/* VISTA 1: HOME */}
        {currentView === "home" && (
          <div className="relative min-h-screen flex flex-col items-center justify-center text-center p-6 md:p-12 overflow-hidden select-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            <div className="relative z-10 max-w-5xl space-y-6 my-auto">
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.9] text-white">
                FORJAMOS{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-600">
                  LEYENDAS.
                </span>
                <br />
                <span className="text-cyan-400 text-2xl md:text-4xl font-mono tracking-[0.2em] not-italic block my-4 uppercase">
                  CENTRALIZAMOS TU PROGRESO.
                </span>
                DOMINA TU POTENCIAL HÉROE.
              </h1>

              <div className="pt-6">
                <button
                  onClick={() => setCurrentView("universes")}
                  className="relative group px-8 py-3 bg-cyan-950/20 border border-cyan-500/40 text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase transition-all duration-300 hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]"
                >
                  <span className="relative z-10 flex items-center gap-2 justify-center">
                    INITIALIZE_SYSTEM_{" "}
                    <span className="font-sans font-bold">→</span>
                  </span>
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
            heroesData={heroes}
            onSelectSerie={(id) => {
              setSelectedSerieId(id);
              setCurrentView("catalog");
            }}
          />
        )}

        {/* VISTA 3: CATÁLOGO DE HÉROES */}
        {currentView === "catalog" && (
          <HeroCatalog
            heroes={heroes}
            selectedSerieId={selectedSerieId}
            onViewProfile={(id: number) => {
              const targetHero = heroes.find((h) => h.id_p === id) || null;
              setSelectedHero(targetHero);
              setCurrentView("profile");
            }}
          />
        )}

        {/* VISTA 4: PERFIL DEL HÉROE */}
        {currentView === "profile" && selectedHero && (
          <HeroProfile
            hero={selectedHero}
            onBack={() => {
              setSelectedHero(null);
              setCurrentView("catalog");
            }}
          />
        )}

        {/* VISTA 5: MONITOREO DE INFRAESTRUCTURA */}
        {currentView === "facility" && (
          <GymFacility
            equipamientoData={backendEquipamiento}
            usoData={backendUsoLogs}
            loading={isFacilityLoading}
          />
        )}

        {/* VISTA 6: CONTROL DE DIETAS */}
        {currentView === "nutrition" && (
          <NutritionDashboard
            alimentosData={backendAlimentos}
            suplementosData={backendSuplementos}
            heroesData={heroes}
            loading={isNutritionLoading}
          />
        )}
      </main>
    </div>
  );
}
