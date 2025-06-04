import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Compra } from './compra.entity';
import { Opciones } from './opciones.entity';
import { Vendedor } from './vendedor.entity';

enum categoria {
  comida = 'comida',
  ropa = 'ropa',
  tecnologia = 'tecnologia',
  accesorios = 'accesorios',
  otros = 'otros',
}

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre!: string;

  @Column()
  descripcion!: string;

  @Column()
  disponibilidad!: string;

  @Column()
  precio!: number;

  @Column({nullable: true})
  whatsapp:string;

  @Column()
  imagen?: string;

  @Column({
    type: 'enum',
    enum: categoria, 
    default: categoria.otros,})
  categoria: categoria;

  @Column({nullable: true, default:false})
  favoritos?:boolean;
  

  @ManyToOne(() => Vendedor, (vendedor) => vendedor.productos)
  vendedor: Vendedor;

  @OneToMany(() => Opciones, (opcion) => opcion.producto)
  opciones: Opciones[];

  @OneToMany(() => Compra, (compra) => compra.producto)
  compras: Compra[];
}
