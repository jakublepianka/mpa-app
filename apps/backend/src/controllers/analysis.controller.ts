import { Request, Response } from "express";
import { getOrCreateAnalysis } from "../services/analysis/analysis.service";
import {
  getAnalysisById,
  getUserAnalyses,
  deleteAnalysisById,
} from "../repos/analysis.repo";

export const getHealthStatus = async (req: Request, res: Response) => {
  res.json({ status: "okey" });
};

export const createOrGetAnalysis = async (req: Request, res: Response) => {
  const term = req.body.term as string;
  const clientId = req.headers["client-id"] as string;

  try {
    const analysis = await getOrCreateAnalysis(clientId, term);
    return res.status(200).json(analysis);
  } catch (error) {
    console.error("TOP LEVEL FAILURE", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const getAnalysis = async (req: Request, res: Response) => {
  const analysisId = req.params.analysisId as string;

  try {
    const analysis = await getAnalysisById(analysisId);

    if (!analysis) {
      return res.status(404).json({
        error: "Analysis not found",
      });
    }

    return res.status(200).json(analysis);
  } catch (error) {
    console.error("Analysis fetch failure", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const getAnalyses = async (req: Request, res: Response) => {
  const clientId = req.headers["client-id"] as string;

  try {
    const analyses = await getUserAnalyses(clientId);
    return res.status(200).json(analyses);
  } catch (error) {
    console.error("Analyses fetch failure", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const deleteAnalysis = async (req: Request, res: Response) => {
  const analysisId = req.params.analysisId as string;
  const clientId = req.headers["client-id"] as string;

  try {
    const success = await deleteAnalysisById(analysisId, clientId);

    if (success === false) {
      return res.status(404).json({
        error: "Analysis not found",
      });
    }

    return res.status(204).json({ success: success });
  } catch (error) {
    console.error("Analysis deletion failure", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
