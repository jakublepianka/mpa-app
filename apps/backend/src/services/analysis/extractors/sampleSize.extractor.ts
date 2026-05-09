import { EFetchArticle } from "../../../types/efetch.response";
import { SAMPLE_SIZE_PATTERNS } from "../rules/sampleSize.rules";

export const getSampleSize = (article: EFetchArticle): number | undefined => {
  const abstract = article.abstract ?? "";
  if (!abstract) return undefined;
    
  for (const pattern of SAMPLE_SIZE_PATTERNS) {
    const match = pattern.exec(abstract);

    const rawValue = match?.[1];

    if (!rawValue) continue;

    const parsed = Number(
      rawValue.replace(/,/g, "")
    );

    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }

  return undefined;
};

