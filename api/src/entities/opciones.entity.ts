import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Producto } from './producto.entity';

@Entity()
export class Opciones {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  // Muchas opciones pertenecen a un producto
  @ManyToOne(() => Producto, (producto) => producto.opciones)
  producto: Producto;
}
