import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ProfastProvidor from "./Context/ProfastProvidor.jsx";
import { RouterProvider } from "react-router";
import router from "./Router/Router.jsx";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ProfastProvidor>
        <RouterProvider router={router} />
        <ToastContainer />
      </ProfastProvidor>
    </QueryClientProvider>
  </StrictMode>
);
