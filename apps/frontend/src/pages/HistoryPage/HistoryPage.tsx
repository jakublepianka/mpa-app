import { useAnalyses } from "./useAnalyses";

export const HistoryPage = () => {
  const analyses = useAnalyses();
  console.log(analyses);
  return <div>Here will be all of the users' analyses</div>;
};
