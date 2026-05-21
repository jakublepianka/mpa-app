import { useState, useEffect } from "react";
import { getAnalyses } from "../../api/analysis.api";
import type { Analysis } from "../../api/analysis.types";

export const useAnalyses = () => {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  useEffect(() => {
    const getData = async () => {
      const fatchedAnalyses = await getAnalyses();
      setAnalyses(fatchedAnalyses);
    };

    getData();
  }, []);

  return analyses;
};
