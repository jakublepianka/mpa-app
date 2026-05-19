import { getAnalysisByQuery } from "../../repos/analysis.repo";
import { fetchEFetch } from "../ncbi/ncbi.service";
import { fetchESearch } from "../ncbi/ncbi.service";
import { processArticles } from "./analysis.processor";
import { aggregateData } from "./analysis.aggregator";
import { createAnalysis } from "../../repos/analysis.repo";
import type { AnalysisRecord } from "../../types/analysis.record";

export const getOrCreateAnalysis = async (
  clientId: string,
  term: string,
): Promise<AnalysisRecord> => {
  const existingAnalysis = await getAnalysisByQuery(clientId, term);
  if (existingAnalysis) return existingAnalysis;
  const esearch = await fetchESearch(term);
  const efetch = await fetchEFetch(esearch.ids);
  const processedArticles = processArticles(efetch);
  const aggregatedData = aggregateData(processedArticles);
  const createdAnalysis = await createAnalysis(clientId, term, aggregatedData);
  return createdAnalysis;
};
