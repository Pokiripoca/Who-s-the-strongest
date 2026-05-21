import { useState, useEffect } from "react";
import type { Hero } from "../types/hero_types";

export const useHeroes = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHeroes = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/heroes");

      if (!response.ok) {
        throw new Error("Error al conectar con el servidor de la Arena");
      }

      const data = await response.json();
      setHeroes(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  return {
    heroes,
    loading,
    error,
    refetch: fetchHeroes, // Por si necesitas recargar tras un cambio antropométrico
  };
};
