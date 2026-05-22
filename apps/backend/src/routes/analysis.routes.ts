import { Router } from "express";
import rateLimit from "express-rate-limit";
import {
  getHealthStatus,
  createOrGetAnalysis,
  getAnalysis,
  getAnalyses,
  deleteAnalysis,
} from "../controllers/analysis.controller";
import { validateClientId } from "../middleware/clientId.middleware";
import { validateQuery } from "../middleware/query.middleware";

const analysisRouter = Router();

const searchLimiter = rateLimit({
  windowMs: 2000,
  max: 1,
});

analysisRouter.get("/health", getHealthStatus);

/**
 * @openapi
 * /analyses:
 *   post:
 *     summary: Create or retrieve analysis for a query term
 *     description: |
 *       Returns an existing analysis for a given client and query term,
 *       or creates a new one if it does not exist.
 *     parameters:
 *       - in: header
 *         name: client-id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique client identifier used for scoping analyses
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - term
 *             properties:
 *               term:
 *                 type: string
 *                 description: Search term for PubMed analysis
 *     responses:
 *       200:
 *         description: Existing or newly created analysis
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AnalysisRecord'
 *       400:
 *         description: Invalid request (missing client-id or term)
 *       500:
 *         description: Internal server error
 */
analysisRouter.post(
  "/analyses",
  searchLimiter,
  validateClientId,
  validateQuery,
  createOrGetAnalysis,
);

analysisRouter.get("/analyses/:analysisId", getAnalysis);

analysisRouter.get("/analyses", getAnalyses);

analysisRouter.delete(
  "/analyses/:analysisId",
  validateClientId,
  deleteAnalysis,
);

export { analysisRouter };
