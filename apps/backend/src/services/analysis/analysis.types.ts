export type ArticleFeatures = {
  id: string;
  publicationTypes: string[];
  publicationDate?: string;
  sampleSize?: number;
  sampleTypes?: SampleType[];
  keywords: string[];
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