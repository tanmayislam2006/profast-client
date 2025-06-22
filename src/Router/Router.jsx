import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Error from "../Page/Error/Error";
import Home from "../Page/Home/Home";
import Coverage from "../Page/Coverage/Coverage";
import About from "../Page/About/About";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <MainLayout />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/coverage",
        Component: Coverage,
        loader: () => fetch("./coverageArea.json"),
      },
      {
        path:'/about',
        Component:About
      },
    ],
  },
]);
export default router;
