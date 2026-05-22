import { useNavigate } from "react-router";
import type { Analysis } from "../../api/analysis.types";

export const AnalysisSummary = ({ analysis }: { analysis: Analysis }) => {
  const navigate = useNavigate();

  const handleNav = () => {
    navigate(`/analyses/${analysis.id}`, {
      state: analysis,
    });
  };

  return (
    <li>
      <h2>{analysis.query}</h2>
      <p>Date of creation: {analysis.createdAt.toDateString()}</p>
      <p>Total articles analyzed: {analysis.analysis.totalArticles}</p>
      <button onClick={handleNav}>Go to</button>
    </li>
  );
};
