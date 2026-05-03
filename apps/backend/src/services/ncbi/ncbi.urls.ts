import { config } from "../../config/index.config";

export const buildESearchUrl = (term: string): URL => {
  const { baseUrl, apiKey, db } = config.ncbi;
  const url = new URL("esearch.fcgi", baseUrl);

  url.searchParams.set("db", db);
  url.searchParams.set("term", term + "[tiab]");
  url.searchParams.set("retmax", "1000");
  url.searchParams.set("retmode", "json");
  url.searchParams.set("api_key", apiKey);

  return url;
};