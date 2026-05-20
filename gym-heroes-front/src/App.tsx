// src/App.tsx
import { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { UniverseSelection } from "./views/UniverseSelection";
import { HeroCatalog } from "./views/HeroCatalog";
import { HeroProfile } from "./views/HeroProfile";
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
      <Sidebar
        activeView={currentView}
        onGoHome={() => setCurrentView("home")}
        onGoUniverses={() => setCurrentView("universes")}
        onGoNutrition={() => setCurrentView("nutrition")}
        onGoFacility={() => setCurrentView("facility")}
      />

      <main className="flex-1 ml-20">
        {currentView === "home" && (
          <h1 className="text-[12vw] p-12 font-black italic leading-[0.8]">
            ENTRENA.
            <br />
            <span className="text-cyan-400">SUPÉRATE.</span>
          </h1>
        )}

        {currentView === "universes" && (
          <UniverseSelection
            heroesData={heroesData} // <-- ESTA LÍNEA ES LA QUE FALTA PASARLE AQUÍ
            onSelectSerie={(id: number) => {
              setSelectedSerieId(id);
              setCurrentView("catalog");
            }}
          />
        )}

        {currentView === "catalog" &&
          (loading ? (
            <div className="p-12 font-mono text-cyan-400 animate-pulse text-2xl">
              Cargando base de datos...
            </div>
          ) : (
            <HeroCatalog
              heroesData={heroesData}
              onSelectHero={(id) => {
                setSelectedHeroId(id);
                setCurrentView("profile");
              }}
              onBack={() => setCurrentView("universes")}
              serieId={selectedSerieId}
            />
          ))}

        {currentView === "profile" && selectedHeroId && (
          <HeroProfile
            hero={
              heroesData.find((h) => h.id_p === selectedHeroId) || heroesData[0]
            }
            onBack={() => setCurrentView("catalog")}
          />
        )}

        {currentView === "nutrition" && (
          <div className="p-12">
            <h2 className="text-4xl font-bold text-cyan-400 mb-4">
              Sección de Nutrición
            </h2>
            <p className="text-zinc-400 font-mono">
              Aquí se gestionarán los suplementos y dietas de los héroes de la
              base de datos.
            </p>
          </div>
        )}

        {currentView === "facility" && (
          <div className="p-12">
            <h2 className="text-4xl font-bold text-cyan-400 mb-4">
              Instalaciones e Infraestructura
            </h2>
            <p className="text-zinc-400 font-mono">
              Panel de control de zonas de entrenamiento y bitácoras de
              equipamiento.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
