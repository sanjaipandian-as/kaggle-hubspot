import fs from "fs";
import csv from "csv-parser";
import { BabyName } from "./DataBase/models/BabyName"
import { sequelize, testConnection } from "./DataBase/DBconnection"

export const storeNamesInDB = async (csvPath: string) => {
    if (!fs.existsSync(csvPath)) throw new Error("CSV file not found!");

    await testConnection();          
    await BabyName.sync({ alter: true }); 

    const results: { name: string; sex: string }[] = [];

    return new Promise<void>((resolve, reject) => {
        fs.createReadStream(csvPath)
            .pipe(csv())
            .on("data", (data) => {
                const name = data["Name"] || data["name"];
                const sex = data["Gender"] || data["gender"]; 
                if (name && sex) results.push({ name, sex });
            })

            .on("end", async () => {
                try {
                    await BabyName.bulkCreate(results);
                    console.log(`✅ Inserted ${results.length} rows into MySQL`);
                    resolve();
                } catch (err) {
                    reject(err);
                }
            })
            .on("error", reject);
    });
};
