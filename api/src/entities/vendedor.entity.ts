import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Producto } from './producto.entity';

@Entity()
export class Vendedor {
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

  @OneToMany(() => Producto, (producto) => producto.vendedor)
  productos: Producto[];

  // 🧡 Relación muchos a muchos con productos favoritos
  @ManyToMany(() => Producto, (producto) => producto.vendedoresFavoritos)
  @JoinTable()
  favoritos: Producto[];
}
