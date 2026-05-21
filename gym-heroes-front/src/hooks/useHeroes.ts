import { useState, useEffect } from "react";
import type { Hero } from "../types/hero_types";

export function useHeroes() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const API_URL = "http://localhost:3000/api/heroes";

    setLoading(true);
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al conectar con el servidor logístico");
        }
        return res.json();
      })
      .then((data) => {
        setHeroes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { heroes, loading, error };
}
