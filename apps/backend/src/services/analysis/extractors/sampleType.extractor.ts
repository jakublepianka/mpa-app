import { EFetchArticle } from "../../../types/efetch.response";
import { SampleType } from "../analysis.types";
import { SAMPLE_TYPE_PATTERNS } from "../rules/sampleType.rules";

export const getSampleType = (article: EFetchArticle): SampleType[] => {
  const title = article.title.toLowerCase();
  // go over sampletype patterns with title and then abstract
  // extract HUMAN_GROUP
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

// const extractSampleType = (title: string): string => {
//   return "";
// };

