import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { UniverseSelection } from "./views/UniverseSelection";
import { HeroCatalog } from "./views/HeroCatalog";
import { HeroProfile } from "./views/HeroProfile";
import { Home } from "./views/Home"; // <--- Asegúrate de que la ruta sea correcta

function App() {
  // 1. Todos los estados dentro de la función
  const [showHome, setShowHome] = useState(true);
  const [selectedSerieId, setSelectedSerieId] = useState<number | null>(null);
  const [viewingHeroId, setViewingHeroId] = useState<number | null>(null);

  // Funciones de navegación
  const goToCatalog = (id: number) => {
    setSelectedSerieId(id);
    setViewingHeroId(null);
    setShowHome(false); // Por si acaso
  };

  const goToProfile = (id: number) => {
    setViewingHeroId(id);
  };

  const goBackToUniverses = () => {
    setSelectedSerieId(null);
    setViewingHeroId(null);
    setShowHome(false);
  };

  // Función para resetear todo al Landing
  const resetToHome = () => {
    setShowHome(true);
    setSelectedSerieId(null);
    setViewingHeroId(null);
  };

  return (
    <div className="flex bg-zinc-950 min-h-screen text-white">
      {/* 2. El Sidebar solo aparece si no estamos en el Home (opcional) o le pasamos resetToHome */}
      {!showHome && <Sidebar onGoHome={resetToHome} />}

      <main
        className={`flex-1 transition-all duration-300 ${!showHome ? "ml-20" : "ml-0"}`}
      >
        {/* 3. Lógica de Pantallas */}

        {/* PANTALLA 1: LANDING */}
        {showHome && <Home onStart={() => setShowHome(false)} />}

        {/* PANTALLA 2: SELECCIÓN DE UNIVERSO */}
        {!showHome && !selectedSerieId && (
          <UniverseSelection onSelectSerie={goToCatalog} />
        )}

        {/* PANTALLA 3: CATÁLOGO DE HÉROES */}
        {!showHome && selectedSerieId && !viewingHeroId && (
          <HeroCatalog
            serieId={selectedSerieId}
            onSelectHero={goToProfile}
            onBack={goBackToUniverses}
          />
        )}

        {/* PANTALLA 4: PERFIL DEL HÉROE */}
        {!showHome && viewingHeroId && (
          <HeroProfile
            heroId={viewingHeroId}
            onBack={() => setViewingHeroId(null)}
          />
        )}
      </main>
    </div>
  );
}

export default App;
