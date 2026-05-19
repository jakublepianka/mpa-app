export type AnalysisResult = {
  totalArticles: number;
  dateCounts: Record<string, number>;
  publicationTypeCounts: Record<string, number>;
  keywordCounts: Record<string, number>;
  sampleSizeSummary?: {
    average?: number;
    min?: number;
    max?: number;
  };
  sampleTypeCounts: Record<string, number>;
};