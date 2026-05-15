export interface HeroStats {
  peso: number;
  pecho: number;
  cintura: number;
  grasa_pct: number;
}

export interface Hero {
  id_p: number;
  nombre: string;
  alias: string;
  imagen_url: string;
  serie_titulo: string;
  color_hex: string;
  estatus_salud: string;
  permite_entrenar: "Si" | "No"; // Literal type para evitar el error anterior
  tipo_cuerpo: string;
  faccion: string;
  rango: string;
  stats: {
    peso: number;
    pecho: number;
    cintura: number;
    grasa_pct: number;
  };
}
