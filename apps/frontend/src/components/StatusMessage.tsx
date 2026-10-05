import type { ReactNode } from "react";

export const StatusMessage = ({
  title,
  children,
  tone = "neutral",
  action,
}: {
  title: string;
  children?: ReactNode;
  tone?: "neutral" | "error";
  action?: ReactNode;
}) => {
  const isError = tone === "error";

  return (
    <div
      role={isError ? "alert" : undefined}
      className={`w-full rounded-xl border p-space-lg flex flex-col items-start gap-space-xs ${
        isError
          ? "bg-error-container/40 border-error/30"
          : "bg-surface-container-lowest border-outline-variant/30"
      }`}
    >
      <p
        className={`text-headline-sm font-heading ${
          isError ? "text-on-error-container" : "text-on-surface"
        }`}
      >
        {title}
      </p>
      {children && (
        <p className="text-body-sm text-on-surface-variant">{children}</p>
      )}
      {action && <div className="mt-space-sm">{action}</div>}
    </div>
  );
};
