import type { ArticleFeatures, SampleSizeAccumulator } from "./analysis.types";
import type { AnalysisResult } from "../../../../../packages/shared/analysisResult.types";

export const aggregateData = (
  processedArticles: ArticleFeatures[] /*, query*/,
): AnalysisResult => {
  const initSampleSize: SampleSizeAccumulator = {
    count: 0,
    sum: 0,
    min: Infinity,
    max: -Infinity,
  };
  const initAnalysis = {
    dateCounts: {},
    publicationTypeCounts: {},
    keywordCounts: {},
    sampleSizeSummary: {},
    sampleTypeCounts: {},
  };

  const {
    dateCounts,
    publicationTypeCounts,
    keywordCounts,
    sampleSizeAcc,
    sampleTypeCounts,
  } = processedArticles.reduce(
    (acc, article) => {
      aggregateDates(acc.dateCounts, article.publicationDate);
      aggregateArray(acc.publicationTypeCounts, article.publicationTypes);
      aggregateArray(acc.keywordCounts, article.keywords);
      aggregateArray(
        acc.sampleTypeCounts,
        article.sampleTypes?.map((type) => type.label) ?? [],
      );
      aggregateSampleSize(acc.sampleSizeAcc, article.sampleSize);
      return acc;
    },
    { ...initAnalysis, sampleSizeAcc: initSampleSize },
  );
  const sampleSizeSummary =
    sampleSizeAcc.count > 0
      ? {
          average: Math.floor(sampleSizeAcc.sum / sampleSizeAcc.count),
          min: sampleSizeAcc.min,
          max: sampleSizeAcc.max,
        }
      : undefined;

  return {
    totalArticles: processedArticles.length,
    dateCounts: dateCounts,
    publicationTypeCounts: publicationTypeCounts,
    keywordCounts: keywordCounts,
    sampleSizeSummary: sampleSizeSummary,
    sampleTypeCounts: sampleTypeCounts,
  };
};

const aggregateDates = (
  record: Record<string, number>,
  date: string | undefined,
): Record<string, number> => {
  const key = date ?? "unknown";
  const exists = record[key];

  if (exists) {
    record[key]++;
    return record;
  } else {
    record[key] = 1;
    return record;
  }
};

const aggregateArray = (
  record: Record<string, number>,
  arr: string[],
): Record<string, number> => {
  if (!arr) return record;

  for (const key of arr) {
    const exists = record[key];

    if (exists) {
      record[key]++;
    } else {
      record[key] = 1;
    }
  }

  return record;
};

const aggregateSampleSize = (
  acc: SampleSizeAccumulator,
  sampleSize?: number,
): SampleSizeAccumulator => {
  if (typeof sampleSize === "undefined") return acc;

  acc.count++;
  acc.sum += sampleSize;
  acc.min = Math.min(acc.min, sampleSize);
  acc.max = Math.max(acc.max, sampleSize);

  return acc;
};
