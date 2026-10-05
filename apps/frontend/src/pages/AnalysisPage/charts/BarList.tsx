import type { CountEntry } from "../analysis.selectors";

export const BarList = ({ entries }: { entries: CountEntry[] }) => {
  if (entries.length === 0) {
    return <p className="text-body-sm text-outline">None found.</p>;
  }

  const maxCount = Math.max(...entries.map(([, count]) => count));

  return (
    <ol className="flex flex-col gap-space-sm">
      {entries.map(([name, count]) => (
        <li key={name} className="flex flex-col gap-1">
          <div className="flex justify-between items-center gap-space-sm text-body-sm">
            <span
              className="block text-on-surface truncate first-letter:uppercase"
              title={name}
            >
              {name}
            </span>
            <span className="font-mono text-metric-sm text-on-surface-variant shrink-0">
              {count.toLocaleString("en-US")}
            </span>
          </div>
          <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary h-full rounded-full"
              style={{ width: `${(count / maxCount) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ol>
  );
};
