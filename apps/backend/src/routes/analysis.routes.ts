import { Router } from "express";
import rateLimit from "express-rate-limit";
import {
  getHealthStatus,
  createOrGetAnalysis,
  getAnalysis
} from "../controllers/analysis.controller";
import { validateClientId } from "../middleware/clientId.middleware";
import { validateQuery } from "../middleware/query.middleware";

const analysisRouter = Router();

const searchLimiter = rateLimit({
  windowMs: 2000,
  max: 1,
});

analysisRouter.get("/health", getHealthStatus);

analysisRouter.post(
  "/analyses",
  searchLimiter,
  validateClientId,
  validateQuery,
  createOrGetAnalysis,
);

analysisRouter.get(
  "/analyses/:analysisId",
  getAnalysis
);

export { analysisRouter };
