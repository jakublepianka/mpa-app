import { useLocation } from "react-router";
import type { Analysis } from "../../api/analysis.types";
import { Histogram } from "./charts/Histogram";

export const AnalysisPage = () => {
  const location = useLocation();

  const analysis = location.state as Analysis;

  return (
    <div>
      <h1>{analysis.query} - Analysis</h1>
      <p>
        {analysis.createdAt.toDateString()} | Articles:{" "}
        {analysis.analysis.totalArticles}
      </p>
      <div>
        <Histogram analysis={analysis} />
      </div>
    </div>
  );
};
