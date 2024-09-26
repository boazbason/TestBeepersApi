import express from "express";
import beeperRouter from "./routes/beeperRouter.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json()); // Body parser
app.use("/beeper", beeperRouter);
app.listen(PORT, () => {
    console.log("server is on");
}); // Listning for requests
