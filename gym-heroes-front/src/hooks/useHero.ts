import type { Hero } from "../types/index";
export const useHero = (_id: number) => {
  const mockHero: Hero = {
    id: 1,
    nombre: "All Might",
    rol: "Símbolo de la Paz",
    serie: "My Hero Academia",
    color: "#00FFFF",
    rango: "SSS",
    imagen: "allmight_profile.png",
    stats: {
      imc: 28.5,
      grasa: "8.7%",
      metabolismo: 2450,
      peso_actual: 255,
      diferencia_peso: -2.4,
    },
  };

  return { hero: mockHero, loading: false };
};
