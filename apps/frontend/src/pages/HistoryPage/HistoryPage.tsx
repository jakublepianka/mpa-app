import { useState } from "react";
import { Link } from "react-router";
import { SearchIcon } from "../../components/icons";
import { Spinner } from "../../components/Spinner";
import { StatusMessage } from "../../components/StatusMessage";
import { AnalysisSummary } from "./AnalysisSummary";
import { useAnalyses } from "./useAnalyses";

export const HistoryPage = () => {
  const { analyses, status } = useAnalyses();
  const [filter, setFilter] = useState("");

  const term = filter.trim().toLowerCase();
  const visibleAnalyses = analyses.filter((analysis) =>
    analysis.query.toLowerCase().includes(term),
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-margin-mobile sm:px-margin py-space-xl flex flex-col gap-space-lg">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-md border-b border-surface-container pb-space-lg">
        <div className="flex flex-col">
          <h1 className="text-headline-lg sm:text-display text-on-surface">
            Analysis History
          </h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            Review and reopen analyses you have run in this browser.
          </p>
        </div>
        <div className="w-full sm:w-72 relative">
          <SearchIcon className="w-[18px] h-[18px] absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
          <input
            type="text"
            aria-label="Filter history"
            placeholder="Filter history..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full h-9 pl-9 pr-3 bg-surface-container-lowest border border-outline-variant/60 rounded-sm text-on-surface text-body-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-outline transition-colors"
          />
        </div>
      </div>

      {status === "loading" && (
        <div className="flex items-center gap-space-md text-body-sm text-on-surface-variant">
          <Spinner label="Loading history" />
          Loading history…
        </div>
      )}

      {status === "error" && (
        <StatusMessage title="History could not be loaded" tone="error">
          Check that the server is running, then reload the page.
        </StatusMessage>
      )}

      {status === "ready" && analyses.length === 0 && (
        <StatusMessage
          title="No analyses yet"
          action={
            <Link
              to="/"
              className="text-label-md text-primary hover:underline"
            >
              Run your first analysis
            </Link>
          }
        >
          Analyses you run will be listed here.
        </StatusMessage>
      )}

      {status === "ready" && analyses.length > 0 && (
        <>
          {visibleAnalyses.length === 0 ? (
            <StatusMessage title="No matching analyses">
              Nothing in your history matches this filter.
            </StatusMessage>
          ) : (
            <ul className="flex flex-col gap-space-sm">
              {visibleAnalyses.map((analysis) => (
                <AnalysisSummary key={analysis.id} analysis={analysis} />
              ))}
            </ul>
          )}
          <p className="text-body-sm text-outline">
            Showing{" "}
            <span className="font-medium text-on-surface">
              {visibleAnalyses.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-on-surface">
              {analyses.length}
            </span>{" "}
            analyses
          </p>
        </>
      )}
    </div>
  );
};
