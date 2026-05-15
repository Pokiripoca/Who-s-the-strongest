import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { UniverseSelection } from "./views/UniverseSelection";
import { HeroCatalog } from "./views/HeroCatalog";
import { HeroProfile } from "./views/HeroProfile"; // Importamos el componente de arriba
import type { Hero } from "./types/hero_types";

type View =
  | "home"
  | "universes"
  | "catalog"
  | "profile"
  | "facility"
  | "nutrition";

// MOCK DATA (Fuera del componente)
const MOCK_HEROES: Hero[] = [
  {
    id_p: 3,
    nombre: "Red Riot",
    alias: "Eijiro Kirishima",
    imagen_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz6u3L-16S_vF_SOfG0pL0Y9m_EInT-F3o_g&s",
    serie_titulo: "Cape Doctrine",
    color_hex: "#ff0000",
    estatus_salud: "Óptimo",
    permite_entrenar: "Si",
    tipo_cuerpo: "Endo-mesomorfo",
    faccion: "U.A. HIGH",
    rango: "A",
    stats: { peso: 72, pecho: 105, cintura: 78, grasa_pct: 12 },
  },
];

function App() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [selectedHeroId, setSelectedHeroId] = useState<number | null>(null);

  return (
    <div className="flex bg-zinc-950 min-h-screen text-white">
      <Sidebar
        activeView={currentView}
        onGoHome={() => setCurrentView("home")}
        onGoUniverses={() => setCurrentView("universes")}
        onGoNutrition={function (): void {
          throw new Error("Function not implemented.");
        }}
        onGoFacility={function (): void {
          throw new Error("Function not implemented.");
        }}
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
          <UniverseSelection onSelectSerie={() => setCurrentView("catalog")} />
        )}

        {currentView === "catalog" && (
          <HeroCatalog
            heroesData={MOCK_HEROES}
            onSelectHero={(id) => {
              setSelectedHeroId(id);
              setCurrentView("profile");
            }}
            onBack={() => setCurrentView("universes")}
            serieId={0}
          />
        )}

        {currentView === "profile" && selectedHeroId && (
          <HeroProfile
            hero={MOCK_HEROES.find((h) => h.id_p === selectedHeroId)!}
            onBack={() => setCurrentView("catalog")}
          />
        )}
      </main>
    </div>
  );
}

export default App;
