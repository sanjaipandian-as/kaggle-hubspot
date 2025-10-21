// Source/downloadRunner.ts
import { downloadKaggleData, unzipCSV } from "./Kaggle/Download";
import { storeNamesInDB } from "./storeNames";
import { BabyName } from "./DataBase/models/BabyName"
import { sendToHubspot } from "./sendToHubspot"
import dotenv from "dotenv";

import path from "path";
dotenv.config();

(async () => {
  try {
    console.log("📥 Downloading data from Kaggle...");
    await downloadKaggleData();

    const csvPath = path.join(__dirname, "../downloads/babyNamesUSYOB-full.csv");

    console.log("💾 Storing data in MySQL...");
    await storeNamesInDB(csvPath);

    console.log("✅ All done!");
  } catch (err) {
    console.error("❌ Error:", err);
  }
})();