import type { ReactNode } from "react";

type IconProps = { className?: string };

const Icon = ({
  className,
  children,
}: IconProps & { children: ReactNode }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const SearchIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Icon>
);

export const ArrowRightIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </Icon>
);

export const CalendarIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </Icon>
);

export const BookIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M12 7v13" />
    <path d="M3 5h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6v13h-6a3 3 0 0 0-3 2 3 3 0 0 0-3-2H3z" />
  </Icon>
);

export const ArticleIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M8 9h8M8 12h8M8 15h5" />
  </Icon>
);

export const FlaskIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3" />
    <path d="M7.5 15h9" />
  </Icon>
);
