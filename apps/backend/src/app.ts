import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger/swagger.config";
import dotenv from "dotenv";
dotenv.config();
import express from "express";

const app = express();
import { analysisRouter } from "./routes/analysis.routes";

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/openapi.json", (_, res) => res.json(swaggerSpec));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", analysisRouter);

export { app };
