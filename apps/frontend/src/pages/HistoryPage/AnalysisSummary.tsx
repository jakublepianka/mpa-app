import { Link } from "react-router";
import type { Analysis } from "../../api/analysis.types";
import {
  ArrowRightIcon,
  ArticleIcon,
  CalendarIcon,
} from "../../components/icons";

export const AnalysisSummary = ({ analysis }: { analysis: Analysis }) => {
  return (
    <li className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 hover:border-primary/40 shadow-sm hover:shadow transition-all duration-150 p-space-lg flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
      <div className="flex flex-col gap-space-xs min-w-0">
        <h2 className="text-headline-md text-on-surface break-words">
          {analysis.query}
        </h2>
        <div className="flex items-center gap-x-space-md gap-y-space-xs text-body-sm text-on-surface-variant flex-wrap">
          <span className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4 text-outline" />
            {analysis.createdAt.toDateString()}
          </span>
          <span className="text-outline-variant">•</span>
          <span className="flex items-center gap-1">
            <ArticleIcon className="w-4 h-4 text-outline" />
            {analysis.analysis.totalArticles.toLocaleString("en-US")} articles analyzed
          </span>
        </div>
      </div>
      <Link
        to={`/analyses/${analysis.id}`}
        state={analysis}
        className="inline-flex items-center gap-space-xs self-end sm:self-center shrink-0 px-space-md py-space-sm bg-primary text-on-primary hover:bg-primary-container transition-colors rounded-sm text-label-md shadow-sm"
      >
        <span>View Analysis</span>
        <ArrowRightIcon className="w-4 h-4" />
      </Link>
    </li>
  );
};
