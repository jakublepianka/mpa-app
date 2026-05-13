export type ArticleFeatures = {
  id: string;
  publicationTypes: string[];
  publicationDate?: string;
  sampleSize?: number;
  sampleTypes?: SampleType[];
  keywords: string[];
};

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

export type SampleType = {
  label: string;
  source: "title" | "abstract";
};

export type SampleSizeAccumulator = {
  count: number;
  sum: number;
  min: number;
  max: number;
};