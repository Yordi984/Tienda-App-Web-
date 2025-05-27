import { DataSource } from "typeorm";
import { vendedor } from "./entities/vendedor";
import { comprador } from "./entities/comprador";
import { Compra } from "./entities/compra";
import { producto } from "./entities/producto";
import { Opciones } from "./entities/opciones";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "base123",
  database: "Tienda",
  synchronize: true,
  logging: true,
  entities: [comprador, vendedor, Compra, producto, Opciones],
  subscribers: [],
  migrations: [],
});
