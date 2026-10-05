import type { ReactNode } from "react";
import { Link } from "react-router";
import { Card } from "../../components/Card";
import { BookIcon, CalendarIcon } from "../../components/icons";
import { Spinner } from "../../components/Spinner";
import { StatusMessage } from "../../components/StatusMessage";
import {
  bucketDatesByYear,
  getTopEntries,
  getUnknownDateShare,
} from "./analysis.selectors";
import { BarList } from "./charts/BarList";
import { YearHistogram } from "./charts/YearHistogram";
import { RankedList } from "./RankedList";
import { useAnalysis } from "./useAnalysis";

const PageContainer = ({ children }: { children: ReactNode }) => (
  <div className="w-full px-margin-mobile sm:px-margin pt-space-lg pb-space-xl flex flex-col gap-gutter-lg">
    {children}
  </div>
);

const StatTile = ({
  label,
  value,
}: {
  label: string;
  value: number | undefined;
}) => (
  <div className="bg-surface-container-low p-space-md rounded-sm">
    <span className="text-label-sm text-on-surface-variant block mb-1">
      {label}
    </span>
    <span className="font-mono text-base text-on-surface font-semibold">
      {value?.toLocaleString("en-US") ?? "—"}
    </span>
  </div>
);

export const AnalysisPage = () => {
  const result = useAnalysis();

  if (result.status === "loading") {
    return (
      <PageContainer>
        <div className="flex items-center gap-space-md text-body-sm text-on-surface-variant">
          <Spinner label="Loading analysis" />
          Loading analysis…
        </div>
      </PageContainer>
    );
  }

  if (result.status === "error") {
    return (
      <PageContainer>
        <StatusMessage
          title="Analysis not found"
          tone="error"
          action={
            <Link to="/" className="text-label-md text-primary hover:underline">
              Run a new analysis
            </Link>
          }
        >
          It may have been removed, or the link is incorrect.
        </StatusMessage>
      </PageContainer>
    );
  }

  const { query, createdAt, analysis } = result.analysis;
  const { totalArticles, sampleSizeSummary } = analysis;
  const unknownDateShare = getUnknownDateShare(
    analysis.dateCounts,
    totalArticles,
  );

  return (
    <PageContainer>
      <section className="flex flex-col gap-space-xs border-b border-outline-variant/30 pb-space-md">
        <h1 className="text-headline-lg-mobile sm:text-headline-lg text-on-surface break-words">
          {query} — Analysis
        </h1>
        <div className="flex flex-wrap items-center gap-x-space-md gap-y-space-xs font-mono text-metric-sm text-on-surface-variant">
          <div className="flex items-center gap-space-xs">
            <CalendarIcon className="w-4 h-4 text-outline" />
            <span>
              Created:{" "}
              <strong className="text-on-surface font-medium">
                {createdAt.toDateString()}
              </strong>
            </span>
          </div>
          <span className="text-outline-variant">•</span>
          <div className="flex items-center gap-space-xs">
            <BookIcon className="w-4 h-4 text-outline" />
            <span>
              Articles analyzed:{" "}
              <strong className="text-on-surface font-medium">
                {totalArticles.toLocaleString("en-US")}
              </strong>
            </span>
          </div>
        </div>
      </section>

      {totalArticles === 0 ? (
        <StatusMessage title="No articles found">
          PubMed returned no articles for this topic, so there is nothing to
          summarize.
        </StatusMessage>
      ) : (
        <>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            <Card>
              <h2 className="text-headline-sm text-on-surface pb-space-sm">
                Sample sizes
              </h2>
              {sampleSizeSummary ? (
                <div className="flex flex-col gap-space-md pt-space-xs">
                  <div className="bg-surface-container-low p-space-md rounded-sm">
                    <span className="text-body-sm text-on-surface-variant block mb-1">
                      Average sample size
                    </span>
                    <span className="font-mono text-metric-lg text-primary font-semibold">
                      {sampleSizeSummary.average?.toLocaleString("en-US") ?? "—"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-space-md">
                    <StatTile label="Minimum" value={sampleSizeSummary.min} />
                    <StatTile label="Maximum" value={sampleSizeSummary.max} />
                  </div>
                </div>
              ) : (
                <p className="text-body-sm text-outline">
                  No sample sizes found in abstracts.
                </p>
              )}
            </Card>
            <Card>
              <h2 className="text-headline-sm text-on-surface pb-space-sm">
                Most frequent keywords
              </h2>
              <RankedList
                entries={getTopEntries(analysis.keywordCounts)}
                highlightClass="bg-primary-fixed text-on-primary-fixed"
              />
            </Card>
            <Card>
              <h2 className="text-headline-sm text-on-surface pb-space-sm">
                Most frequent sample types
              </h2>
              <RankedList
                entries={getTopEntries(analysis.sampleTypeCounts)}
                highlightClass="bg-secondary-fixed text-on-secondary-fixed"
              />
            </Card>
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-12 gap-gutter">
            <Card className="xl:col-span-7 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-space-xs pb-space-md border-b border-outline-variant/20 mb-space-md">
                <h2 className="text-headline-md text-on-surface">
                  Number of publications by year
                </h2>
                {unknownDateShare !== null && (
                  <div className="text-body-sm text-on-surface-variant">
                    Articles with no publication date:{" "}
                    <span className="font-mono font-semibold text-secondary">
                      {unknownDateShare.toFixed(2)}%
                    </span>
                  </div>
                )}
              </div>
              <YearHistogram data={bucketDatesByYear(analysis.dateCounts)} />
            </Card>
            <Card className="xl:col-span-5 min-w-0">
              <div className="flex items-center justify-between pb-space-md border-b border-outline-variant/20 mb-space-md">
                <h2 className="text-headline-md text-on-surface">
                  Types of studies
                </h2>
                <span className="font-mono text-metric-sm bg-surface-container px-space-xs py-0.5 rounded-sm text-on-surface-variant">
                  Top 10
                </span>
              </div>
              <BarList
                entries={getTopEntries(analysis.publicationTypeCounts, 10)}
              />
            </Card>
          </section>
        </>
      )}
    </PageContainer>
  );
};
