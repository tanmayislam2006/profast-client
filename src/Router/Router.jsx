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
import MyPayment from "../Page/DasBoard/MyPayments/MyPayment";
import BeArider from "../Page/BeARider/BeArider";
import Approved from "../Page/DasBoard/Rider/Approved/Approved";
import Pending from "../Page/DasBoard/Rider/Pending/Pending";
import Forbidden from "../Components/Forbidden/Forbidden";
import AdminRouter from "./AdminRouter";
import UserAdmin from './../Page/DasBoard/UserAdmin/UserAdmin';
import AssignRider from "../Page/DasBoard/AssignRider/AssignRider";

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
      {
        path: "/berider",
        element: (
          <PrivateRouter>
            <BeArider />
          </PrivateRouter>
        ),
        loader: () => fetch("./coverageArea.json"),
        hydrateFallbackElement: <p className="text-center">Data is loading</p>,
      },
      {
        path:"forbidden",
        Component:Forbidden
      }
    ],
  },
  // authetication routes
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
  // dashboard routes
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
      {
        path: "myPayments",
        Component: MyPayment,
      },
      {
        path: "approvedRiders",
        Component: Approved,
      },
      {
        path: "pendingRiders",
        Component: Pending,
      },
      {
        path: "userAdmin",
        element:<AdminRouter>
          <UserAdmin/>
        </AdminRouter>
      },
      {
        path: "assignRiders",
        element:<AdminRouter>
          <AssignRider/>
        </AdminRouter>
      },
    ],
  },
]);
export default router;
