import { useState, useEffect } from "react";
import { getAnalyses } from "../../api/analysis.api";
import type { Analysis } from "../../api/analysis.types";

type AnalysesStatus = "loading" | "ready" | "error";

export const useAnalyses = () => {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [status, setStatus] = useState<AnalysesStatus>("loading");
  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedAnalyses = await getAnalyses();
        setAnalyses(fetchedAnalyses);
        setStatus("ready");
      } catch {
        setStatus("error");
      }
    };

    getData();
  }, []);

  return { analyses, status };
};
