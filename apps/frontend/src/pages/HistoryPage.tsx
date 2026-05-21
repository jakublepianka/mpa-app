import { useEffect } from "react";
import { getAnalyses } from "../api/analysis.api";
// import type { Analysis } from "../api/analysis.types";

export const HistoryPage = () => {
  useEffect(() => {
    const getData = async () => {
      const analyses = await getAnalyses();

      console.log(analyses);
    };

    getData();
  }, []);
  return <div>Here will be all of the users' analyses</div>;
};
