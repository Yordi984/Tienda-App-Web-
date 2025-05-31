import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Compra } from './compra';
import { vendedor } from './vendedor';
import { Opciones } from './opciones';

@Entity()
export class producto {
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

  @ManyToOne(() => vendedor, (vendedor) => vendedor.productos)
  vendedor: vendedor;

  @OneToMany(() => Opciones, (opcion) => opcion.producto)
  opciones: Opciones[];

  @OneToMany(() => Compra, (compra) => compra.producto)
  compras: Compra[];
}
