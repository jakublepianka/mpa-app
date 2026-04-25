import { Router } from "express";
import { getHealthStatus, getAnalysisResults } from "../controllers/analysis.controller";

const analysisRouter = Router();

analysisRouter.get("/health", getHealthStatus);

analysisRouter.get("/search", getAnalysisResults);



export { analysisRouter };


