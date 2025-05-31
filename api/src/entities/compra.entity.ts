import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comprador } from './comprador.entity';
import { Producto } from './producto.entity';

@Entity()
export class Compra {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Comprador, (comprador) => comprador.compras)
  comprador: Comprador;

  @ManyToOne(() => Producto, (producto) => producto.compras)
  producto: Producto;

  @Column()
  cantidad: number;

  @CreateDateColumn()
  fecha: Date;
}
