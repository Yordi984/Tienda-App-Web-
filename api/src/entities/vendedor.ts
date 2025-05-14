import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class vendedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  telefono: string;

  @Column()
  correo: string;

  @Column()
  password: string;
}
