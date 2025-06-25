import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Error from "../Page/Error/Error";
import Home from "../Page/Home/Home";
import Coverage from "../Page/Coverage/Coverage";
import About from "../Page/About/About";
import AuthnticationLayout from "../Layout/AuthnticationLayout";
import Login from "../Page/Login/Login";
import Register from "../Page/Register/Register";
import PrivateRouter from "./PrivateRouter";
import Pricing from "../Page/Pricing/Pricing";
import DashboardLayout from "../Layout/DashboardLayout";
import MyPercel from "../Page/DasBoard/MyPercel/MyPercel";
import Payment from "../Page/Payment/Payment";

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
        hydrateFallbackElement: <p className="text-center">Data is loading</p>,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/pricing",
        element: (
          <PrivateRouter>
            <Pricing />
          </PrivateRouter>
        ),
        loader: () => fetch("./coverageArea.json"),
        hydrateFallbackElement: <p className="text-center">Data is loading</p>,
      },
    ],
  },
  {
    path: "/",
    Component: AuthnticationLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayout />
      </PrivateRouter>
    ),
    children: [
      {
        path: "myParcels",
        Component: MyPercel,
      },
      {
        path: "payment/:id",
        Component: Payment,
      },
    ],
  },
]);
export default router;
