import { AnalysisResult } from "../../../../packages/shared/analysisResult.types";

export type AnalysisRecord = {
  id: string;
  user_id: string;
  query: string;
  analysis: AnalysisResult;
  created_at: Date;
};