import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import type { Analysis } from "../../../api/analysis.types";

export const Histogram = ({
  analysis,
  analysisKey,
  isDate,
  limit,
}: {
  analysis: Analysis;
  analysisKey:
    | "dateCounts"
    | "publicationTypeCounts"
    | "keywordCounts"
    | "sampleTypeCounts";
  isDate: boolean;
  limit: number;
}) => {
    const chartData = Object.entries(analysis.analysis[analysisKey])
      .map(([name, count]) => ({
        name,
        value: count,
      }))
      .filter((record) => record.name !== "unknown");

    const limitedData = isDate
      ? chartData.slice(0, limit)
      : [...chartData]
          .sort((a, b) => b.value - a.value)
          .slice(0, limit);

  return (
    <BarChart width={500} height={300} data={limitedData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" />
    </BarChart>
  );
};
