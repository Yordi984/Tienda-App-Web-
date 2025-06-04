import type { Vendedor } from './vendedor';

export interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  disponibilidad: string;
  precio: number;
  whatsapp: number;
  imagen?: string;
  vendedoresFavoritos: Vendedor[];
  vendedor: Vendedor;
}
