import { DataSource } from 'typeorm';
import { Compra, Opciones, Producto, Vendedor } from './entities';

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
  entities: [Vendedor, Compra, Producto, Opciones],
  subscribers: [],
  migrations: [],
});
