import { Request, Response } from "express";
import { fetchESearch, fetchEFetch } from "../services/ncbi/ncbi.service";
import { processArticles } from "../services/analysis/analysis.service";
import { aggregateData } from "../services/analysis/analysis.aggregator";
import { createAnalysis, getAnalysisByQuery } from "../repos/analysis.repo";

export const getHealthStatus = (req: Request, res: Response) => {
  res.json({ status: "okey" });
};

export const getAnalysisResults = async (req: Request, res: Response) => {
  const { term } = req.query;
  const clientId = req.headers["client-id"];

  if (typeof clientId !== "string") {
    return res.status(400).json({
      error: "Missing client-id header",
    });
  }

  if (typeof term !== "string") {
    return res.status(400).json({ error: "term must be a string" });
  }

  try {
    const existingAnalysis = await getAnalysisByQuery(clientId, term); 
    if (existingAnalysis) return res.status(200).json(existingAnalysis);
    const esearch = await fetchESearch(term);
    const efetch = await fetchEFetch(esearch.ids);
    const processedArticles = processArticles(efetch);
    const aggregatedData = aggregateData(processedArticles);
    const createdAnalysis = await createAnalysis(
      clientId,
      term,
      aggregatedData,
    );

    return res.status(200).json(createdAnalysis);
  } catch (err) {
    console.error("TOP LEVEL FAILURE", err);
  
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
