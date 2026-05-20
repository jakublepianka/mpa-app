import { httpClient } from "../client/http/http.client";
import { createRequest } from "../client/http/http.request";
import { mapAnalysisDto } from "./analysis.mapper";
import type { Analysis, AnalysisRecordDto } from "./analysis.types";

export const createAnalysis = async (query: string): Promise<Analysis> => {
  const queryObj = { term: query };
  const analysisDto: AnalysisRecordDto = await httpClient(
    "/api/analyses",
    createRequest("POST", queryObj),
  );
  return mapAnalysisDto(analysisDto);
};

export const getAnalyses = async (): Promise<Analysis[]> => {
  const dtoArray: AnalysisRecordDto[] = await httpClient(
    "/api/analyses",
    createRequest("GET"),
  );
  return dtoArray.map(mapAnalysisDto);
};

export const getAnalysisById = async (
  analysisId: string,
): Promise<Analysis> => {
  const analysisDto: AnalysisRecordDto = await httpClient(
    `/api/analyses/${analysisId}`,
    createRequest("GET"),
  );
  return mapAnalysisDto(analysisDto);
};

export const deleteAnalysisById = async (
  analysisId: string,
): Promise<boolean> => {
  const analysisDto: boolean = await httpClient(
    `/api/analyses/${analysisId}`,
    createRequest("DELETE"),
  );
  return analysisDto;
};
