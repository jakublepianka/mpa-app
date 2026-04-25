import { config } from "../../config/index.config";

export const buildESearchUrl = (term: string): URL => {
  const { baseUrl, apiKey, db } = config.ncbi;
  const url = new URL("esearch.fcgi", baseUrl);

  url.searchParams.set("db", db);
  url.searchParams.set("term", term);
  url.searchParams.set("api_key", apiKey);

  return url;
};