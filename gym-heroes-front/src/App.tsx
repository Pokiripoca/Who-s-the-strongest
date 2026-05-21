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

const MOCK_HEROES: Hero[] = [
  {
    id_p: 3,
    nombre: "Red Riot (Respaldo)",
    alias: "Eijiro Kirishima",
    imagen_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz6u3L-16S_vF_SOfG0pL0Y9m_EInT-F3o_g&s",
    id_serie: 1,
    serie_titulo: "Boku No Hero Academia",
    color_hex: "#ff0000",
    estatus_salud: "Óptimo",
    permite_entrenar: "Sí",
    tipo_cuerpo: "Endo-mesomorfo",
    faccion: "U.A. HIGH",
    rango: "A",
    stats: { peso: 72, pecho: 105, cintura: 78, grasa_pct: 12 },
  } as unknown as Hero,
];

function App() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [selectedHeroId, setSelectedHeroId] = useState<number | null>(null);
  const [selectedSerieId, setSelectedSerieId] = useState<number>(0);
  const [heroesData, setHeroesData] = useState<Hero[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/heroes")
      .then((res) => {
        if (!res.ok) throw new Error("Error en el servidor");
        return res.json();
      })
      .then((data) => {
        setHeroesData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Usando MOCK_HEROES como respaldo:", err);
        setHeroesData(MOCK_HEROES);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex bg-zinc-950 min-h-screen text-white">
      {/* SIDEBAR ORIGINAL */}
      <Sidebar
        activeView={currentView}
        onGoHome={() => setCurrentView("home")}
        onGoUniverses={() => setCurrentView("universes")}
        onGoNutrition={() => setCurrentView("nutrition")}
        onGoFacility={() => setCurrentView("facility")}
      />

      {/* CONTENEDOR PRINCIPAL */}
      <main className="flex-1 ml-20">
        {/* VISTA: HOME */}
        {currentView === "home" && (
          <h1 className="text-[12vw] p-12 font-black italic leading-[0.8]">
            ENTRENA.
            <br />
            <span className="text-cyan-400">SUPÉRATE.</span>
          </h1>
        )}

        {/* VISTA: SELECCIÓN DE UNIVERSOS */}
        {currentView === "universes" && (
          <UniverseSelection
            heroesData={heroesData}
            onSelectSerie={(id: number) => {
              setSelectedSerieId(id);
              setCurrentView("catalog");
            }}
          />
        )}

        {/* VISTA: CATÁLOGO DE HÉROES */}
        {currentView === "catalog" &&
          (loading ? (
            <div className="p-12 font-mono text-cyan-400 animate-pulse text-2xl">
              Cargando base de datos...
            </div>
          ) : (
            <HeroCatalog
              heroesData={heroesData}
              onSelectHero={(id: number) => {
                setSelectedHeroId(id);
                setCurrentView("profile");
              }}
              onBack={() => setCurrentView("universes")}
              serieId={selectedSerieId}
            />
          ))}

        {/* VISTA: PERFIL DETALLADO */}
        {currentView === "profile" && selectedHeroId && (
          <HeroProfile
            hero={
              heroesData.find((h) => h.id_p === selectedHeroId) || heroesData[0]
            }
            onBack={() => setCurrentView("catalog")}
          />
        )}

        {/* VISTA: CONTROL DE BIOCOMBUSTIBLE & SUPLEMENTOS */}
        {currentView === "nutrition" && (
          <NutritionDashboard heroesData={heroesData} />
        )}

        {/* VISTA: INFRAESTRUCTURA Y COMPONENTES (FACILITY) */}
        {currentView === "facility" && <GymFacility />}
      </main>
    </div>
  );
}

export default App;
