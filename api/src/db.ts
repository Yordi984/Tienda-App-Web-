import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "base123",
  database: "Tienda",
  synchronize: true,
  logging: true,
  entities: [],
  subscribers: [],
  migrations: [],
});
