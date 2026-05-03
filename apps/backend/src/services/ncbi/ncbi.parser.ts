import { XMLParser } from "fast-xml-parser";
import { ESearchResponse } from "../../types/esearch.response";
import { EFetchResponse } from "../../types/efetch.response";

export const mapESearchResponse = (data: any): ESearchResponse => {
  const result = data.esearchresult;

  return {
    count: Number(result.count),
    retMax: Number(result.retmax),
    ids: result.idlist,
    translations: result.translationset,
    queryTranslation: result.querytranslation,
  };
};

export const parseEFetchXML = (xml: string): EFetchResponse => {
  const options = {
    ignoreAttributes: false,
  };
  const parser = new XMLParser(options);
  const res = parser.parse(xml);
  
  const articles = ensureArray(res.PubmedArticleSet.PubmedArticle).map(
    (a: any) => {
      const article = a.MedlineCitation.Article;
      const date = article.ArticleDate;
      const publicationDate = date
        ? `${date.Year}-${padDate(String(date.Month))}-${padDate(String(date.Day))}`
        : undefined;
      const doi = findByAttr(article.ELocationID, "EIdType", "doi");
      const publicationType = findByAttr(
        article.PublicationTypeList.PublicationType,
        "UI",
        "D000078182",
      );
      const authorList = ensureArray(article.AuthorList?.Author);
      const abstract = ensureArray(article.Abstract?.AbstractText)
        .map(extractText)
        .join(" ");

      return {
        id: a.MedlineCitation.PMID["#text"],
        title: article.ArticleTitle,
        publicationDate: publicationDate,
        journal: {
          journalId: article.Journal.ISSN?.["#text"],
          journalTitle: article.Journal.Title,
        },
        abstract: abstract,
        doi: doi,
        publicationType: publicationType,
        authors: authorList.map((author) => {
          return {
            foreName: author.ForeName ?? "",
            lastName: author.LastName,
            initials: author.Initials ?? "",
            orcid: findByAttr(author.Identifier, "Source", "ORCID"),
          };
        }),
        language: article.Language,
        keywords: ensureArray(a.MedlineCitation.KeywordList?.Keyword).map(
          (keyword) => keyword["#text"],
        ),
      };
    },
  );
  return {
    articles: articles,
  };
};

const ensureArray = <T>(value: T | T[] | undefined): T[] => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

const findByAttr = (nodes: any, attr: string, val: string): string => {
  const arr = ensureArray(nodes);
  return arr.find((n) => n?.[`@_${attr}`] === val)?.["#text"];
};

const padDate = (dateNum: string): string => dateNum.padStart(2, "0");

const extractText = (node: any): string => {
  if (node == null) return "";

  if (typeof node === "string") return node;

  if (Array.isArray(node)) {
    return node.map(extractText).join("");
  }

  if (typeof node === "object") {
    if ("#text" in node) return node["#text"];

    return Object.values(node).map(extractText).join("");
  }

  return "";
};
