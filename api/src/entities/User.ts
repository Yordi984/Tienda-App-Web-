import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";


@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;
}

