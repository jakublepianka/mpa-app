import dotenv from "dotenv";
dotenv.config();
import express from "express";

const app = express();
import { analysisRouter } from "./routes/analysis.routes";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", analysisRouter);

export { app };