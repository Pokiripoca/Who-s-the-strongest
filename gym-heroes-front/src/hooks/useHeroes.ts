import { useState, useEffect } from "react";
import type { Hero } from "../types/hero_types";

export const useHero = (id: number) => {
  const [hero, setHero] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const mockData: Hero[] = [
        {
          id_p: 1,
          nombre: "All Might",
          alias: "Symbol of Peace",
          imagen_url:
            "https://static.wikia.nocookie.net/bokunoheroacademia/images/5/55/All_Might_Hero_Costume_B_Full_Body_Action.png", // URL de ejemplo
          serie_titulo: "My Hero Academia",
          color_hex: "#FFD700",
          estatus_salud: "Recuperación",
          permite_entrenar: "No",
          tipo_cuerpo: "Ectomorfo",
          faccion: "U.A. High",
          rango: "S+",
          stats: {
            peso: 255,
            pecho: 130,
            cintura: 90,
            grasa_pct: 12,
          },
        },
        {
          id_p: 2,
          nombre: "Goku",
          alias: "El Guerrero Legendario",
          imagen_url: "goku.png",
          serie_titulo: "Dragon Ball Z",
          color_hex: "#ff6600",
          estatus_salud: "Excelente",
          permite_entrenar: "Si",
          tipo_cuerpo: "Mesomorfo",
          faccion: "Guerreros Z",
          rango: "S",
          stats: {
            peso: 80,
            pecho: 115,
            cintura: 80,
            grasa_pct: 8,
          },
        },
      ];

      // Buscamos el héroe específico por ID
      const found = mockData.find((h) => h.id_p === id);
      setHero(found || null);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [id]);

  return { hero, loading };
};
