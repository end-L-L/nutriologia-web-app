export interface Macros {
  calorias: number;
  caloriasMax: number;
  proteinas: number;
  proteinasMax: number;
  carbohidratos: number;
  carbohidratosMax: number;
  grasas: number;
  grasasMax: number;
}

export interface ConsumedFood {
  alimento: string;
  cantidad: number;
  calorias: number;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
  id: number;
  unit: 'g' | 'u';
}

export interface dailyFood {
  fecha: string;
  calorias: number;
  objetivoCumplido: string;
  detalles: string;
  id: number;
}
