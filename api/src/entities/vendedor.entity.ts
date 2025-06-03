import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
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
  @ManyToMany(() => Producto)
  @JoinTable()
  favoritos: Producto[];
}
