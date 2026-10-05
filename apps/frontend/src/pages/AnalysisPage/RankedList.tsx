import type { CountEntry } from "./analysis.selectors";

export const RankedList = ({
  entries,
  highlightClass,
}: {
  entries: CountEntry[];
  highlightClass: string;
}) => {
  if (entries.length === 0) {
    return <p className="text-body-sm text-outline">None found.</p>;
  }

  return (
    <ol className="flex flex-col divide-y divide-outline-variant/20">
      {entries.map(([name, count], i) => (
        <li
          key={name}
          className="flex items-center justify-between gap-space-sm py-2.5"
        >
          <span className="text-body-sm text-on-surface truncate" title={name}>
            {name}
          </span>
          <span
            className={`px-space-xs py-0.5 rounded-sm font-mono text-metric-sm shrink-0 ${
              i === 0
                ? `${highlightClass} font-medium`
                : "bg-surface-container text-on-surface-variant"
            }`}
          >
            {count.toLocaleString("en-US")}
          </span>
        </li>
      ))}
    </ol>
  );
};
