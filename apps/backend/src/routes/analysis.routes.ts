import { Router } from "express";
import { getHealthStatus } from "../controllers/analysis.controller";

const analysisRouter = Router();

analysisRouter.get("/health", getHealthStatus);

export { analysisRouter };


