export type ESearchResponse = {
  count: number;
  retMax: number;
  ids: string[];
  translations?: {
    from: string;
    to: string;
  }[];
  queryTranslation?: string;
};