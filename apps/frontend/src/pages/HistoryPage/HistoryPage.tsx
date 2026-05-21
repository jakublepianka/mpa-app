import { AnalysisSummary } from "./AnalysisSummary";
import { useAnalyses } from "./useAnalyses";

export const HistoryPage = () => {
  const analyses = useAnalyses();
  return (
    <>
      {analyses.map((analysis) => (
        <AnalysisSummary key={analysis.id} analysis={analysis} />
      ))}
    </>
  );
};
