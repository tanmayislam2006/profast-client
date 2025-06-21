import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ProfastProvidor from "./Context/ProfastProvidor.jsx";
import { RouterProvider } from "react-router";
import router from "./Router/Router.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProfastProvidor>
      <RouterProvider router={router} />
    </ProfastProvidor>
  </StrictMode>
);
