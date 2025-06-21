import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Error from "../Page/Error/Error";
import Home from "../Page/Home/Home";

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
    ],
  },
]);
export default router;
