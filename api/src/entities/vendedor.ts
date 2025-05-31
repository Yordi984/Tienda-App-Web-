import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { producto } from './producto';

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

  // Un vendedor tiene muchos productos
  @OneToMany(() => producto, (producto) => producto.vendedor)
  productos: producto[];
}
