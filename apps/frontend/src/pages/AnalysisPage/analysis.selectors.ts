export type CountEntry = [key: string, count: number];

export type YearCount = { year: string; count: number };

const UNKNOWN_DATE_KEY = "unknown";

// Stored analyses come back from JSONB, so key order carries no meaning.
export const getTopEntries = (
  record: Record<string, number>,
  limit = 5,
): CountEntry[] => {
  return Object.entries(record)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit);
};

// dateCounts keys are full dates (YYYY-MM-DD) plus the literal "unknown".
export const bucketDatesByYear = (
  dateCounts: Record<string, number>,
): YearCount[] => {
  const countsByYear = new Map<string, number>();

  for (const [date, count] of Object.entries(dateCounts)) {
    if (!/^\d{4}/.test(date)) continue;

    const year = date.slice(0, 4);
    countsByYear.set(year, (countsByYear.get(year) ?? 0) + count);
  }

  return [...countsByYear.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([year, count]) => ({ year, count }));
};

export const getUnknownDateShare = (
  dateCounts: Record<string, number>,
  totalArticles: number,
): number | null => {
  if (totalArticles === 0) return null;

  return ((dateCounts[UNKNOWN_DATE_KEY] ?? 0) / totalArticles) * 100;
};
