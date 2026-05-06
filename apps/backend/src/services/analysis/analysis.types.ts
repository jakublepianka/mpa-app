export type ArticleFeatures = {
  id: string;
  publicationTypes: string[];
  publicationDate?: string;
  sampleSize?: number;
  sampleType?: string[];
  keywords: string[];
};

export type AnalysisResult = {
  totalArticles: number;
  byDate: Record<string, number>;
  publicationTypes: Record<string, number>;
  keywords: Record<string, number>;
  sampleSizes: {
    average?: number;
    min?: number;
    max?: number;
  };
  sampleTypes: Record<string, number>;
};