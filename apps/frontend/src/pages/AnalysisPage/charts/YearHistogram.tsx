import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { YearCount } from "../analysis.selectors";

const tickStyle = {
  fontFamily: "var(--font-mono)",
  fontSize: 13,
  fill: "var(--color-on-surface-variant)",
};

export const YearHistogram = ({ data }: { data: YearCount[] }) => {
  if (data.length === 0) {
    return (
      <p className="text-body-sm text-outline">
        No articles with a publication date.
      </p>
    );
  }

  return (
    <div className="relative flex-1 min-h-64">
      <div className="absolute inset-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="var(--color-surface-container)"
            />
            <XAxis
              dataKey="year"
              tick={tickStyle}
              tickLine={false}
              axisLine={{ stroke: "var(--color-surface-container-high)" }}
              minTickGap={8}
            />
            <YAxis
              tick={tickStyle}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
              width={40}
            />
            <Tooltip
              cursor={{ fill: "var(--color-surface-container-low)" }}
              contentStyle={{
                background: "var(--color-surface-container-lowest)",
                border: "1px solid var(--color-outline-variant)",
                borderRadius: 4,
                fontSize: 12,
              }}
              labelStyle={{ color: "var(--color-on-surface)", fontWeight: 600 }}
              itemStyle={{
                color: "var(--color-primary)",
                fontFamily: "var(--font-mono)",
              }}
            />
            <Bar
              dataKey="count"
              name="Articles"
              fill="var(--color-primary)"
              radius={[2, 2, 0, 0]}
              isAnimationActive={false}
              maxBarSize={44}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
