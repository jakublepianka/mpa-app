import { Link, NavLink, Outlet, useMatch } from "react-router";

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-space-md py-1.5 rounded-sm text-label-md transition-colors ${
    isActive
      ? "bg-surface-container text-primary"
      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
  }`;

export const RootLayout = () => {
  // The analysis page is a full-width dashboard; the other pages are centered.
  const isWide = useMatch("/analyses/:analysisId") !== null;
  const containerClass = `w-full px-margin-mobile sm:px-margin ${
    isWide ? "" : "max-w-6xl mx-auto"
  }`;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant/30 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className={`h-16 flex items-center gap-gutter ${containerClass}`}>
          <Link
            to="/"
            className="font-heading text-headline-sm text-on-surface"
            title="Medical Publication Analyzer"
          >
            MPA
          </Link>
          <div className="h-5 w-px bg-outline-variant/50" />
          <nav className="flex items-center gap-space-xs">
            <NavLink to="/" end className={getNavLinkClass}>
              Search
            </NavLink>
            <NavLink to="/analyses" end className={getNavLinkClass}>
              History
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="w-full pt-16 flex-1 flex flex-col">
        <Outlet />
      </main>
      <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30">
        <div
          className={`py-space-md flex flex-col sm:flex-row items-center justify-between gap-space-sm text-label-sm ${containerClass}`}
        >
          <span className="text-on-surface-variant">
            MPA · Medical Publication Analyzer
          </span>
          <span className="text-outline">
            Rule-based analysis of PubMed results
          </span>
        </div>
      </footer>
    </div>
  );
};
