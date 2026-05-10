import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { UniverseSelection } from "./views/UniverseSelection";
import { HeroCatalog } from "./views/HeroCatalog";
import { HeroProfile } from "./views/HeroProfile";
import { Home } from "./views/Home";
import { NutritionDashboard } from "./views/NutritionDashboard";
import { GymFacility } from "./views/GymFacility"; // <-- No olvides importar la nueva vista

function App() {
  const [showHome, setShowHome] = useState(true);
  const [selectedSerieId, setSelectedSerieId] = useState<number | null>(null);
  const [viewingHeroId, setViewingHeroId] = useState<number | null>(null);
  const [viewingFacility, setViewingFacility] = useState(false);
  const [viewingNutrition, setViewingNutrition] = useState(false);

  // --- FUNCIONES DE NAVEGACIÓN ---

  const goToFacility = () => {
    setViewingFacility(true);
    setViewingNutrition(false);
    setViewingHeroId(null);
    setSelectedSerieId(null);
    setShowHome(false);
  }; // <-- Aquí faltaba esta llave

  const goToUniverses = () => {
    setViewingFacility(false); // Limpiamos gimnasio
    setViewingNutrition(false);
    setSelectedSerieId(null);
    setViewingHeroId(null);
    setShowHome(false);
  };

  const goToCatalog = (id: number) => {
    setViewingFacility(false); // Limpiamos gimnasio
    setViewingNutrition(false);
    setSelectedSerieId(id);
    setViewingHeroId(null);
    setShowHome(false);
  };

  const goToProfile = (id: number) => {
    setViewingFacility(false); // Limpiamos gimnasio
    setViewingHeroId(id);
    setViewingNutrition(false);
  };

  const goToNutrition = () => {
    setViewingNutrition(true);
    setViewingFacility(false); // Limpiamos gimnasio
    setViewingHeroId(null);
    setSelectedSerieId(null);
    setShowHome(false);
  };

  const resetToHome = () => {
    setShowHome(true);
    setSelectedSerieId(null);
    setViewingHeroId(null);
    setViewingNutrition(false);
    setViewingFacility(false);
  };

  return (
    <div className="flex bg-zinc-950 min-h-screen text-white">
      {!showHome && (
        <Sidebar
          onGoHome={resetToHome}
          onGoNutrition={goToNutrition}
          onGoUniverses={goToUniverses}
          onGoFacility={goToFacility}
        />
      )}

      <main
        className={`flex-1 transition-all duration-300 ${!showHome ? "ml-20" : "ml-0"}`}
      >
        {/* LANDING */}
        {showHome && <Home onStart={() => setShowHome(false)} />}

        {/* UNIVERSOS */}
        {!showHome &&
          !selectedSerieId &&
          !viewingNutrition &&
          !viewingFacility && <UniverseSelection onSelectSerie={goToCatalog} />}

        {/* CATÁLOGO */}
        {!showHome &&
          selectedSerieId &&
          !viewingHeroId &&
          !viewingNutrition &&
          !viewingFacility && (
            <HeroCatalog
              serieId={selectedSerieId}
              onSelectHero={goToProfile}
              onBack={() => setSelectedSerieId(null)}
            />
          )}

        {/* GIMNASIO (FACILITY) */}
        {!showHome && viewingFacility && <GymFacility />}

        {/* PERFIL */}
        {!showHome &&
          viewingHeroId &&
          !viewingNutrition &&
          !viewingFacility && (
            <HeroProfile
              heroId={viewingHeroId}
              onBack={() => setViewingHeroId(null)}
            />
          )}

        {/* NUTRICIÓN */}
        {!showHome && viewingNutrition && !viewingFacility && (
          <NutritionDashboard />
        )}
      </main>
    </div>
  );
}

export default App;
