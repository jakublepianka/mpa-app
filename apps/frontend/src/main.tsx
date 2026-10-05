import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { router } from "./app/app.router.tsx";
import { RouterProvider } from "react-router";
import "@fontsource-variable/geist";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
