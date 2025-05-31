import { DataSource } from 'typeorm';
import { Compra } from './entities/compra.entity';
import { Comprador } from './entities/comprador';
import { Opciones } from './entities/opciones.entity';
import { Producto } from './entities/producto.entity';
import { Vendedor } from './entities/vendedor.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'base123',
  database: 'Tienda',
  synchronize: true,
  logging:
    process.env.DB_LOGGING !== undefined
      ? process.env.DB_LOGGING === 'true'
      : true,
  entities: [Comprador, Vendedor, Compra, Producto, Opciones],
  subscribers: [],
  migrations: [],
});
