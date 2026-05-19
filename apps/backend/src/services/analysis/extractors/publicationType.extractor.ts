import type { EFetchArticle } from "../../../types/efetch.response";
import { PUBLICATION_TYPE_PATTERNS } from "../rules/publicationType.rules";

export const getPublicationTypes = (article: EFetchArticle): string[] => {
  const fetchedTypes =
    article.publicationTypes
      ?.map((type) => type.toLowerCase().trim())
      .filter((type) => type.toLowerCase() !== "journal article") ?? [];

  const title = article.title.toLowerCase();
  // const abstract = article.abstract?.toLowerCase();
  // (FOR LATER) check for publication type in abstract

  const titleTypes = PUBLICATION_TYPE_PATTERNS.map((typePattern) => {
    const foundType = typePattern.patterns.find((pattern) =>
      pattern.test(title),
    );
    if (foundType) return typePattern.type;
  }).filter((type): type is string => type !== undefined);

  return [...new Set([...fetchedTypes, ...titleTypes])];
};
