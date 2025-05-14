import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class comprador {
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
