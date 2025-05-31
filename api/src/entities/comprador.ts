import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Compra } from './compra';

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

  @OneToMany(() => Compra, (compra) => compra.comprador)
  compras: Compra[];
}
