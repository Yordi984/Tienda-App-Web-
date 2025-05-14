import { DataSource } from "typeorm";
import { vendedor } from "./entities/vendedor";
import { comprador } from "./entities/comprador";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "base123",
  database: "Tienda",
  synchronize: true,
  logging: true,
  entities: [comprador, vendedor],
  subscribers: [],
  migrations: [],
});
