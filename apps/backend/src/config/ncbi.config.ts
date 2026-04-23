import { env } from "./env.config";

export const ncbiConfig = {
  baseUrl: "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/",
  apiKey: env.NCBI_API_KEY,
  db: "pubmed",
};
