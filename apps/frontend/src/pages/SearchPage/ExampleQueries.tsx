const EXAMPLE_QUERIES = [
  "Vitamin D supplementation",
  "Metformin longevity",
  "GLP-1 receptor agonists",
];

export const ExampleQueries = ({
  onSelect,
  disabled,
}: {
  onSelect: (query: string) => void;
  disabled: boolean;
}) => (
  <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
    <span className="text-outline uppercase tracking-wider text-[11px] mr-1">
      Try searching:
    </span>
    {EXAMPLE_QUERIES.map((query) => (
      <button
        key={query}
        type="button"
        disabled={disabled}
        onClick={() => onSelect(query)}
        className="bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/40 text-on-surface-variant hover:text-on-surface px-3 py-1 rounded-pill text-body-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {query}
      </button>
    ))}
  </div>
);
