import { createBrowserRouter } from "react-router";
import { RootLayout } from "./RootLayout";
import { SearchPage } from "../pages/SearchPage/SearchPage";
import { AnalysisPage } from "../pages/AnalysisPage/AnalysisPage";
import { HistoryPage } from "../pages/HistoryPage/HistoryPage";

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
