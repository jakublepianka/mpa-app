import type { AnalysisResult } from "../../../../packages/shared/analysisResult.types";

export type AnalysisRecordDto = {
  id: string;
  user_id: string;
  query: string;
  analysis: AnalysisResult;
  created_at: string;
};

export type Analysis = {
  id: string;
  query: string;
  analysis: AnalysisResult;
  createdAt: Date;
};