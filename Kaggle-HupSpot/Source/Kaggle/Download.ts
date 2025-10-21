import fs from "fs";          // ✅ Needed for file system operations
import path from "path"; 
import { exec } from "child_process";
import AdmZip from "adm-zip";
import dotenv from "dotenv";

dotenv.config();

export const downloadKaggleData = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const downloadPath = path.join(__dirname, "../../downloads");
    const cmd = `kaggle datasets download -d thedevastator/us-baby-names-by-year-of-birth -f babyNamesUSYOB-full.csv -p "${downloadPath}" --force`;

    exec(
      cmd,
      {
        env: {
          ...process.env,
          KAGGLE_USERNAME: process.env.KAGGLE_USERNAME!,
          KAGGLE_KEY: process.env.KAGGLE_KEY!,
        },
      },
      (err, stdout, stderr) => {
        if (err) {
          console.error("Error downloading:", stderr || err);
          return reject(err);
        }
        console.log("Kaggle CSV downloaded successfully!");
        resolve(path.join(downloadPath, "babyNamesUSYOB-full.csv.zip"));
      }
    );
  });
};

export const unzipCSV = (zipPath: string): string => {
  if (!fs.existsSync(zipPath)) throw new Error("ZIP file not found!");
  const zip = new AdmZip(zipPath);
  const downloadPath = path.dirname(zipPath);
  zip.extractAllTo(downloadPath, true);
  const csvPath = path.join(downloadPath, "babyNamesUSYOB-full.csv");
  console.log("CSV extracted:", csvPath);
  return csvPath;
};