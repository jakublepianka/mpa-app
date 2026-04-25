import { ESearchResponse } from "../../types/esearch.response";
import { parseESearchXML } from "./ncbi.parser";
import { buildESearchUrl } from "./ncbi.urls";

export const fetchESearch = async (term: string): Promise<ESearchResponse> => {
  const url = buildESearchUrl(term);
  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(`NCBI error: ${res.status}`);
  }

  const xml = await res.text();

  return parseESearchXML(xml);
};
