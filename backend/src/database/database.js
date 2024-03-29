import { Sequelize } from "sequelize";
import {
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  STATE,
} from "../config/config.js";

export const sequelize =
  STATE === "DEV"
    ? new Sequelize("database", "user", "password", {
        port: "localhost",
        dialect: "sqlite",
        logging: false,
        storage: "src/data/database.sqlite",
      })
    : new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
        host: POSTGRES_HOST,
        port: POSTGRES_PORT,
        dialect: "postgres",
        logging: false,
      });
