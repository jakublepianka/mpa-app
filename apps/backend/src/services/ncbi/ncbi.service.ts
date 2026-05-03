import { ESearchResponse } from "../../types/esearch.response";
import { EFetchResponse } from "../../types/efetch.response";
import { mapESearchResponse, parseEFetchXML } from "./ncbi.parser";
import { buildESearchUrl, buildEFetchUrl } from "./ncbi.urls";

export const fetchESearch = async (term: string): Promise<ESearchResponse> => {
  const url = buildESearchUrl(term);
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`NCBI error: ${res.status}`);
  }

  const data = await res.json();

  return mapESearchResponse(data);
};

export const fetchEFetch = async (ids: string[]): Promise<EFetchResponse> => {
  const batchSize = 200;
  const articles: any[] = [];
  let nextAllowedTime = Date.now();

  console.time("efetch");
  for (let i = 0; i < ids.length; i += batchSize) {
    const now = Date.now();

    if (now < nextAllowedTime) {
      await sleep(nextAllowedTime - now);
    }

    nextAllowedTime += 110;

    const batch: string = ids.slice(i, i + batchSize).join(",");
    const url = buildEFetchUrl();

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `id=${batch}`,
    });

    if (!res.ok) {
      let errorBody;
      try {
        errorBody = await res.json();
      } catch {
        errorBody = await res.text();
      }

      throw new Error(
        `EFetch failed: ${res.status} ${res.statusText} - ${JSON.stringify(errorBody)}`,
      );
    }

    const xml = await res.text();
    const parsed = parseEFetchXML(xml);

    articles.push(...parsed.articles);
  }
  console.timeEnd("efetch");

  return { articles: articles };
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
