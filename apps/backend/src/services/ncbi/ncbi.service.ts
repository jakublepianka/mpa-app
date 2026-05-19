import type { ESearchResponse } from "../../types/esearch.response";
import type { EFetchResponse } from "../../types/efetch.response";
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
  const batchSize = 100;
  const articles: any[] = [];
  let nextAllowedTime = Date.now();

  for (let i = 0; i < ids.length; i += batchSize) {
    const now = Date.now();

    if (now < nextAllowedTime) {
      await sleep(nextAllowedTime - now);
    }

    nextAllowedTime += 110;

    const batch: string = ids.slice(i, i + batchSize).join(",");
    const url = buildEFetchUrl();
    const maxRetries = 3;

    let success = false;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `id=${batch}`,
        });

        if (!res.ok) {
          throw new Error(`EFetch failed: ${res.status} ${res.statusText}`);
        }

        const xml = await res.text();

        if (!xml.includes("<PubmedArticle")) {
          console.warn(
            `EFetch batch of invalid retmode at indices ${i}-${i + batchSize}`,
          );

          success = true;
          break;
        }

        const parsed = parseEFetchXML(xml);

        articles.push(...parsed.articles);

        success = true;
        break;
      } catch (error) {
        console.error(
          `Batch failed (attempt ${attempt}/${maxRetries})`,
          error,
        );

        if (attempt < maxRetries) {
          await sleep(500 * attempt);
        }
      }
    }
    if (!success) {
      console.error(
        `Skipping permanently failing batch starting at index ${i}`,
      );
    }
  }

  return { articles: articles };
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
