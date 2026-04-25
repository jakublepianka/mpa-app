import { XMLParser } from "fast-xml-parser";
import { ESearchResponse } from "../../types/esearch.response";

export const parseESearchXML = async (
  xml: string,
): Promise<ESearchResponse> => {
  const options = { ignoreAttributes: true };
  const parser = new XMLParser(options);
  const { eSearchResult: result } = parser.parse(xml);

  return {
    count: Number(result.Count),
    retMax: Number(result.RetMax),
    ids: result.IdList,
    translations: result.TranslationSet,
    queryTranslation: result.QueryTranslation,
  };
};
