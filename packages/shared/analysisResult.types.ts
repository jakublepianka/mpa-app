/**
 * Represents aggregated statistical output of full analysis process.
 *
 * This structure is returned after processing a set of articles and contains:
 * - global counters (total articles)
 * - time-based distribution (dateCounts)
 * - categorical distributions (publicationTypeCounts, keywordCounts, sampleTypeCounts)
 * - optional statistical summary of extracted sample sizes
 *
 * All fields are derived from raw article-level data via aggregation layer.
 */
export type AnalysisResult = {
  totalArticles: number;
  dateCounts: Record<string, number>;
  publicationTypeCounts: Record<string, number>;
  keywordCounts: Record<string, number>;
  sampleSizeSummary?: {
    average?: number;
    min?: number;
    max?: number;
  };
  sampleTypeCounts: Record<string, number>;
};
