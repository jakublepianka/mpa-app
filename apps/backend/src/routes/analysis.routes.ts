import { Router } from "express";
import rateLimit from "express-rate-limit";
import { getHealthStatus, getAnalysisResults } from "../controllers/analysis.controller";

const analysisRouter = Router();

const searchLimiter = rateLimit({
  windowMs: 2000,
  max: 1,
});

analysisRouter.get("/health", getHealthStatus);

analysisRouter.get("/search", searchLimiter, getAnalysisResults);



export { analysisRouter };


