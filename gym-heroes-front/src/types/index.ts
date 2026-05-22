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
  color: string;
  rango: string;
  imagen: string;
  stats: HeroStats;
}
