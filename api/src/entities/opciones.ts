import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Opciones {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;
}
