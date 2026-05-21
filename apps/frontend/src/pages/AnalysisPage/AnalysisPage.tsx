import { useLocation } from "react-router";

import type { Analysis } from "../../api/analysis.types";

export const AnalysisPage = () => {
  const location = useLocation();

  const analysis = location.state as Analysis;

  console.log(analysis);

  return (
    <div>
      <div>Here will be analysis data</div>
    </div>
  );
};