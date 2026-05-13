import { Request, Response } from "express";
import { fetchESearch, fetchEFetch } from "../services/ncbi/ncbi.service";
import { processArticles } from "../services/analysis/analysis.service";
import { aggregateData } from "../services/analysis/analysis.aggregator";

export const getHealthStatus = (req: Request, res: Response) => {
  res.json({ status: "okey" });
};

export const getAnalysisResults = async (req: Request, res: Response) => {
  const { term } = req.query;

  if (typeof term !== "string") {
    return res.status(400).json({ error: "term must be a string" });
  }

  const esearch = await fetchESearch(term);
  const efetch = await fetchEFetch(esearch.ids);
  const processedArticles = processArticles(efetch);
  const aggregatedData = aggregateData(processedArticles);

  res.status(200).json(aggregatedData);
};
