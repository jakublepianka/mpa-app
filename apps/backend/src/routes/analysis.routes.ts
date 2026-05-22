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

/**
 * @openapi
 * /analyses/{analysisId}:
 *   get:
 *     summary: Retrieve analysis by ID
 *     description: |
 *       Returns a previously computed analysis identified by its unique analysisId.
 *       The analysis is scoped per client via the required `client-id` header.
 *
 *       If the analysis does not exist, a 404 response is returned.
 *     parameters:
 *       - in: header
 *         name: client-id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique client identifier used for scoping analyses
 *       - in: path
 *         name: analysisId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the analysis to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved analysis
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AnalysisRecord'
 *       400:
 *         description: Missing or invalid client-id header
 *       404:
 *         description: Analysis not found
 *       500:
 *         description: Internal server error
 */
analysisRouter.get("/analyses/:analysisId", getAnalysis);

/**
 * @openapi
 * /analyses:
 *   get:
 *     summary: Retrieve all analyses for a client
 *     description: |
 *       Returns a list of analyses associated with the authenticated client.
 *       Each analysis is scoped by the required `client-id` header.
 *     parameters:
 *       - in: header
 *         name: client-id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique client identifier used for scoping analyses
 *     responses:
 *       200:
 *         description: List of analyses for the client
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AnalysisRecord'
 *
 *       400:
 *         description: Missing client-id header
 *       500:
 *         description: Internal server error
 */
analysisRouter.get("/analyses", validateClientId, getAnalyses);

/**
 * @openapi
 * /analyses/{analysisId}:
 *   delete:
 *     summary: Delete analysis by ID
 *     description: |
 *       Deletes a specific analysis identified by `analysisId`, scoped to the authenticated client via `client-id` header.
 *       Returns 404 if the analysis does not exist or does not belong to the client.
 *     parameters:
 *       - in: header
 *         name: client-id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique client identifier used for scoping analyses
 *       - in: path
 *         name: analysisId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the analysis to delete
 *     responses:
 *       204:
 *         description: Analysis successfully deleted
 *
 *       400:
 *         description: Missing client-id header
 *
 *       404:
 *         description: Analysis not found
 *
 *       500:
 *         description: Internal server error
 */
analysisRouter.delete(
  "/analyses/:analysisId",
  validateClientId,
  deleteAnalysis,
);

export { analysisRouter };
