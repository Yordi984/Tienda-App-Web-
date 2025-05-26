import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { producto } from "./producto";

@Entity()
export class Opciones {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  // Muchas opciones pertenecen a un producto
  @ManyToOne(() => producto, (producto) => producto.opciones)
  producto: producto;
}
