import type { EFetchArticle } from "../../../types/efetch.response";
import type { SampleType } from "../analysis.types";
import { SAMPLE_TYPE_PATTERNS } from "../rules/sampleType.rules";

export const getSampleType = (article: EFetchArticle): SampleType[] => {
  const title = article.title.toLowerCase();
  for (const pattern of SAMPLE_TYPE_PATTERNS) {
    const matches = pattern.exec(title);

    const rawValue = matches?.groups?.sampleType.trim();

    if (!rawValue) continue;

    return [
      {
        label: rawValue,
        source: "title",
      },
    ];
  }

  return [];
};
