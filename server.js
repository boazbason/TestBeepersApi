import express from "express";
import beeperRouter from "./routes/beeperRouter.js";
import dotenv from "dotenv";
import cors from 'cors';
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/beepers", beeperRouter);
app.listen(PORT, () => {
    console.log("server is on");
});
