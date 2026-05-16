import { AnalysisResult } from "../services/analysis/analysis.types";

export type AnalysisRecord = {
  id: string;
  user_id: string;
  query: string;
  analysis: AnalysisResult;
  created_at: Date;
};