import { XMLParser } from "fast-xml-parser";
import { ESearchResponse } from "../../types/esearch.response";

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
