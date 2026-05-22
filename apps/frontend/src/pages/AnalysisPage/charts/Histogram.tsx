import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import type { Analysis } from "../../../api/analysis.types";

export const Histogram = ({ analysis }: { analysis: Analysis }) => {
  const dateChartData = Object.entries(analysis.analysis.dateCounts)
    .map(([date, count]) => ({
      name: date,
      value: count,
    }))
    .filter((record) => record.name !== "unknown");

  return (
    <BarChart width={500} height={300} data={dateChartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" />
    </BarChart>
  );
};
