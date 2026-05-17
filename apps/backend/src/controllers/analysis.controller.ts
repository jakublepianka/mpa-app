import { Request, Response } from "express";
import { getOrCreateAnalysis } from "../services/analysis/analysis.service";

export const getHealthStatus = (req: Request, res: Response) => {
  res.json({ status: "okey" });
};

export const createOrGetAnalysis = async (req: Request, res: Response) => {
  const term = req.body.term as string;
  const clientId = req.headers["client-id"] as string;

  try {
    const analysis = await getOrCreateAnalysis(clientId, term);
    return res.status(200).json(analysis);
  } catch (err) {
    console.error("TOP LEVEL FAILURE", err);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
