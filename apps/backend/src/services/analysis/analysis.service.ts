import { EFetchResponse } from "../../types/efetch.response";
import { ArticleFeatures } from "./analysis.types";
import { getPublicationTypes } from "./extractors/publicationType.extractor";
import { getSampleSize } from "./extractors/sampleSize.extractor";
import { getSampleType } from "./extractors/sampleType.extractor";

export const processArticles = (data: EFetchResponse): ArticleFeatures[] => {
  return data.articles.map((article) => {
    const publicationTypes = getPublicationTypes(article);
    const sampleSize = getSampleSize(article);
    const sampleType = getSampleType(article);

    return {
      id: article.id,
      publicationTypes: publicationTypes,
      publicationDate: article.publicationDate,
      sampleSize: sampleSize,
      sampleType: sampleType,
      keywords: article.keywords,
    };
  });
};
