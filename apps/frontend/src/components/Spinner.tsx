export const Spinner = ({ label = "Loading" }: { label?: string }) => (
  <div
    role="status"
    aria-label={label}
    className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin shrink-0"
  />
);
