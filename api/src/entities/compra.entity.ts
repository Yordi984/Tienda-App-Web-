import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Producto } from './producto.entity';

@Entity()
export class Compra {
  @PrimaryGeneratedColumn()
  id: number;


  @ManyToOne(() => Producto, (producto) => producto.compras)
  producto: Producto;

  @Column()
  cantidad: number;

  @CreateDateColumn()
  fecha: Date;
}
