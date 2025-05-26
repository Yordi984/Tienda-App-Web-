import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from "typeorm";
import { comprador } from "./comprador";
import { producto } from "./producto";

@Entity()
export class Compra {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => comprador, (comprador) => comprador.compras)
  comprador: comprador;

  @ManyToOne(() => producto, (producto) => producto.compras)
  producto: producto;

  @Column()
  cantidad: number;

  @CreateDateColumn()
  fecha: Date;
}
