import { useLocation } from "react-router";
import type { Analysis } from "../../api/analysis.types";
import { Histogram } from "./charts/Histogram";

export const AnalysisPage = () => {
  const location = useLocation();

  const analysis = location.state as Analysis;

  const getTopKeys = (record: Record<string, number>, limit = 5): string[] => {
    return Object.entries(record)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([key]) => key);
  };
  const unknownDateCount = analysis.analysis.dateCounts["unknown"];
  const totalArticles = analysis.analysis.totalArticles;
  const getEmptyDatesProportion = () =>
    (unknownDateCount / totalArticles) * 100;

  return (
    <div>
      <h1>{analysis.query} - Analysis</h1>
      <p>
        {analysis.createdAt.toDateString()} | Articles:{" "}
        {analysis.analysis.totalArticles}
      </p>
      <div style={{ display: "flex", gap: "2rem" }}>
        <div>
          <h2>Sample sizes</h2>
          <p>Average: {analysis.analysis.sampleSizeSummary?.average}</p>
          <p>Min: {analysis.analysis.sampleSizeSummary?.min}</p>
          <p>Max: {analysis.analysis.sampleSizeSummary?.max}</p>
        </div>
        <div>
          <h2>Most frequently occuring keywords</h2>
          <ul>
            {getTopKeys(analysis.analysis.keywordCounts).map((key, i) => (
              <li key={i}>{key}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Most frequently occuring sample types</h2>
          <ul>
            {getTopKeys(analysis.analysis.sampleTypeCounts).map((key, i) => (
              <li key={i}>{key}</li>
            ))}
          </ul>
        </div>
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div>
          <h2>Number of publications by date</h2>
          <p>
            % of Articles with no publication date:{" "}
            {getEmptyDatesProportion().toFixed(2)}%
          </p>
          <Histogram
            analysis={analysis}
            analysisKey={"dateCounts"}
            isDate={true}
            limit={Infinity}
          />
        </div>
        <div>
          <h2>Types of studies</h2>
          <Histogram
            analysis={analysis}
            analysisKey={"publicationTypeCounts"}
            isDate={false}
            limit={10}
          />
        </div>
      </div>
    </div>
  );
};
