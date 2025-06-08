import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Training } from "../entities/Training";

export const DataBase = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [User, Training],
  migrations: [],
  subscribers: [],
});
