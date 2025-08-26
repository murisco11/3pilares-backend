import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Training } from "../entities/Training";
import { DayTraining } from "../entities/DayTraining";
import { DBExercise } from "../entities/DBExercise";
import { Exercise } from "../entities/Exercise";

export const DataBase = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [User, Training, DayTraining, DBExercise, Exercise],
  migrations: [],
  subscribers: [],
});
