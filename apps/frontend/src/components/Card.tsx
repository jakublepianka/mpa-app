import type { ReactNode } from "react";

export const Card = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-surface-container-lowest rounded-sm p-space-lg shadow-sm border border-outline-variant/20 ${className}`}
  >
    {children}
  </div>
);
