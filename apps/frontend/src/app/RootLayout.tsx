// import type { ReactNode } from "react";
import { Link, Outlet } from "react-router";



export const RootLayout = () => {
  return (
    <>
      <header>
        <nav>
          <Link to="/">Analyze</Link>
          <Link to="/analyses">Analysis History</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
