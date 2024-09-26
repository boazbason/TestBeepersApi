import express, { Application } from "express";
import beeperRouter from "./routes/beeperRouter.js";
import dotenv from "dotenv";

dotenv.config();
const PORT: number | string = process.env.PORT || 3000;
const app: Application = express();

app.use(express.json()); 

app.use("/beeper", beeperRouter); 

app.listen(PORT, () => {
  console.log("server is on");
}); 
