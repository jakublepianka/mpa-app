import type { Analysis, AnalysisRecordDto } from "./analysis.types";

export const mapAnalysisDto = (dto: AnalysisRecordDto): Analysis => {
  return {
    id: dto.id,
    query: dto.query,
    analysis: dto.analysis,
    createdAt: new Date(dto.created_at),
  };
};
