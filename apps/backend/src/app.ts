import express from "express";
const app = express();
import { analysisRouter } from "./routes/analysis.routes";

app.use("/api", analysisRouter);

export { app };