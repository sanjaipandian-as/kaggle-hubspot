// Source/sendToHubspot.ts
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const sendToHubspot = async (name: string, sex: string) => {
  const token = process.env.HUBSPOT_ACCESS_TOKEN!;
  const url = "https://api.hubapi.com/crm/v3/objects/contacts";

  const properties = {
    firstname: name,
    gender: sex,
    email: `${name.toLowerCase()}_${Date.now()}@example.com`, 
  };

  try {
    await axios.post(
      url,
      { properties },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(`Sent to HubSpot: ${name}`);
  } catch (err) {
    console.error(`Failed to send ${name} to HubSpot:`, err);
  }
};
