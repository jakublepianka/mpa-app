import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { getAnalysisById } from "../../api/analysis.api";
import type { Analysis } from "../../api/analysis.types";

type AnalysisState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; analysis: Analysis };

type FetchResult = { id: string; analysis: Analysis | null };

export const useAnalysis = (): AnalysisState => {
  const { analysisId } = useParams();
  const location = useLocation();
  const [fetched, setFetched] = useState<FetchResult | null>(null);

  // Navigation from Search and History passes the record along; a direct
  // visit (new tab, reload after storage was lost) has to fetch it.
  const routerAnalysis = location.state as Analysis | null;
  const stateAnalysis =
    routerAnalysis?.id === analysisId ? routerAnalysis : null;
  const needsFetch = stateAnalysis === null;

  useEffect(() => {
    if (!needsFetch || !analysisId) return;

    let isCancelled = false;

    const getData = async () => {
      try {
        const analysis = await getAnalysisById(analysisId);
        if (!isCancelled) setFetched({ id: analysisId, analysis });
      } catch {
        if (!isCancelled) setFetched({ id: analysisId, analysis: null });
      }
    };

    getData();

    return () => {
      isCancelled = true;
    };
  }, [analysisId, needsFetch]);

  if (stateAnalysis) return { status: "ready", analysis: stateAnalysis };
  if (!fetched || fetched.id !== analysisId) return { status: "loading" };
  if (!fetched.analysis) return { status: "error" };

  return { status: "ready", analysis: fetched.analysis };
};
