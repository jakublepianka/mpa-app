import { useNavigate } from "react-router";
import React, { useRef, useState } from "react";
import { createAnalysis } from "../../api/analysis.api";
import type { Analysis } from "../../api/analysis.types";
import { ArrowRightIcon, FlaskIcon, SearchIcon } from "../../components/icons";
import { Spinner } from "../../components/Spinner";
import { StatusMessage } from "../../components/StatusMessage";
import { ExampleQueries } from "./ExampleQueries";

type SearchStatus = "idle" | "loading" | "error";

const getErrorMessage = (error: unknown): string =>
  error instanceof Error && error.message === "HTTP error 429"
    ? "Too many requests. Please wait a moment and try again."
    : "The analysis could not be completed. Please try again.";

export const SearchPage = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isLoading = status === "loading";

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const term = query.trim();

    if (term === "" || isLoading) return;

    setStatus("loading");

    try {
      const analysis: Analysis = await createAnalysis(term);

      navigate(`/analyses/${analysis.id}`, {
        state: analysis,
      });
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
      setStatus("error");
    }
  };

  const handleExampleSelect = (example: string) => {
    setQuery(example);
    inputRef.current?.focus();
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <div className="relative w-full max-w-4xl mx-auto px-margin-mobile sm:px-margin py-space-xl flex flex-col items-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[640px] h-[360px] bg-gradient-to-b from-primary-fixed-dim/30 via-secondary-fixed/15 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-1 rounded-pill shadow-sm border border-outline-variant/40 mb-space-md">
          <FlaskIcon className="w-[15px] h-[15px] text-primary" />
          <span className="font-mono text-metric-sm text-primary font-medium tracking-wide uppercase">
            PubMed literature analysis
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl text-on-surface font-semibold tracking-tight text-center max-w-2xl mb-space-sm">
          Analyze the published literature on a medical topic
        </h1>
        <p className="text-body-md sm:text-body-lg text-on-surface-variant max-w-xl text-center mb-8">
          Search PubMed and get a reproducible, rule-based summary of up to
          1,000 articles: study types, sample sizes, keywords and publication
          dates.
        </p>

        <div className="w-full max-w-2xl bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/30 p-2 transition-all duration-200 focus-within:shadow-xl focus-within:border-primary/40">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
          >
            <label htmlFor="search-term" className="sr-only">
              Medical topic
            </label>
            <div className="flex items-center flex-1 bg-surface-container-low rounded-lg px-space-md py-1">
              <SearchIcon className="w-5 h-5 text-outline mr-2.5 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                id="search-term"
                name="query"
                placeholder="Vitamin D supplementation"
                autoComplete="off"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isLoading}
                className="w-full bg-transparent text-on-surface text-body-md placeholder:text-outline focus:outline-none py-2.5 disabled:opacity-60"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-space-xs bg-primary hover:bg-primary-container text-on-primary text-label-md px-6 py-3 rounded-lg shadow-sm hover:shadow transition-all active:scale-[0.98] shrink-0 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span>Analyze</span>
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </form>
        </div>

        <ExampleQueries onSelect={handleExampleSelect} disabled={isLoading} />

        {isLoading && (
          <div className="mt-8 w-full max-w-2xl bg-surface-container-lowest p-space-md rounded-xl shadow-md border border-outline-variant/30 flex items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-md">
              <Spinner label="Analyzing" />
              <div className="flex flex-col">
                <span className="text-label-md text-on-surface">
                  Analyzing PubMed results…
                </span>
                <span className="text-body-sm text-outline">
                  Fetching and parsing articles. This can take several seconds.
                </span>
              </div>
            </div>
            <div className="font-mono text-metric-sm text-primary font-medium truncate max-w-[40%]">
              {query.trim()}
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="mt-8 w-full max-w-2xl">
            <StatusMessage title="Analysis failed" tone="error">
              {errorMessage}
            </StatusMessage>
          </div>
        )}
      </div>
    </div>
  );
};
