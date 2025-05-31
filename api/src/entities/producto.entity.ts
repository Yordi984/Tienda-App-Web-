import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Compra } from './compra.entity';
import { Opciones } from './opciones.entity';
import { Vendedor } from './vendedor.entity';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripciom: string;

  @Column()
  disponibilidad: string;

  @Column()
  precio: number;

  @ManyToOne(() => Vendedor, (vendedor) => vendedor.productos)
  vendedor: Vendedor;

  @OneToMany(() => Opciones, (opcion) => opcion.producto)
  opciones: Opciones[];

  @OneToMany(() => Compra, (compra) => compra.producto)
  compras: Compra[];
}
