import { createBrowserRouter } from "react-router";
import { RootLayout } from "./RootLayout";
import { SearchPage } from "../pages/SearchPage";
import { AnalysisPage } from "../pages/AnalysisPage";
import { HistoryPage } from "../pages/HistoryPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <SearchPage />,
      },
      {
        path: "analyses/:analysisId",
        element: <AnalysisPage />,
      },
      {
        path: "analyses",
        element: <HistoryPage />,
      },
    ],
  },
]);
