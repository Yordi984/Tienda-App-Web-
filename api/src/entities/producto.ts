import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { vendedor } from "./vendedor";

@Entity()
export class producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripciom: string;

  // @Column(()= opciones = {id: number} )
  // opciones: string;

  @Column()
  disponibilidad: [];

  @Column()
  precio: number;
}
