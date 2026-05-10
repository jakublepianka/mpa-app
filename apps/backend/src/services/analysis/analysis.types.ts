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
  byDate: Record<string, number>;
  publicationTypes: Record<string, number>;
  keywords: Record<string, number>;
  sampleSizes?: {
    average?: number;
    min?: number;
    max?: number;
  };
  sampleTypes: Record<string, number>;
};

export type SampleType = {
  label: string;
  source: "title" | "abstract";
};