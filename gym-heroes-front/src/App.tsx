import { Sidebar } from "./components/Sidebar"; // Asegúrate que el archivo se llame Sidebar.tsx
import { Home } from "./views/Home"; // Asegúrate que el archivo se llame Home.tsx

function App() {
  return (
    <div className="flex bg-black min-h-screen text-white">
      <Sidebar />
      <main className="flex-1 ml-20 transition-all duration-300">
        <Home />
      </main>
    </div>
  );
}

export default App;
