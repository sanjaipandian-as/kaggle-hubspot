import { testConnection } from "./DataBase/DBconnection";

const startServer = async () => {
  console.log("Starting backend server...");

  
  await testConnection();
};

startServer();
