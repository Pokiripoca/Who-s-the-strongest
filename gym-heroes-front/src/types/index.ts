// src/types/index.ts
export interface HeroStats {
  imc: number;
  grasa: string;
  metabolismo: number;
  peso_actual: number;
  diferencia_peso: number;
}

export interface Hero {
  id: number;
  nombre: string;
  rol: string;
  serie: string;
  color: string; // El Color_Hex de la DB
  rango: string;
  imagen: string;
  stats: HeroStats;
}
