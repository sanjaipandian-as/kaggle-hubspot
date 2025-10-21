import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME!,       
  process.env.DB_USER!,       
  process.env.DB_PASSWORD!,   
  {
    host: process.env.DB_HOST!,
    dialect: "mysql",
    logging: false,           
  }
);


export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to MySQL successfully!");
  } catch (error) {
    console.error("Unable to connect to MySQL:", error);
  }
};
