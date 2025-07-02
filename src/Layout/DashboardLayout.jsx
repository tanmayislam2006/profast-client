import React from "react";
import { NavLink, Outlet } from "react-router";
import Profast from "../Components/Profast/Profast";
import useProfastAuth from "../Hook/useProfastAuth";

const DashboardLayout = () => {
  const { user } = useProfastAuth();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none ">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
        {/* Page content here */}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-64 px-2 space-y-2">
          {/* Sidebar content here */}
          <Profast />
          <li>
            <a href="/">Home</a>
          </li>
          {user?.role === "user" && (
            <>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-2 font-bold text-primary underline"
                      : "flex items-center gap-2"
                  }
                  to="/dashboard/myParcels"
                >
                  My Parcels
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-2 font-bold text-primary underline"
                      : "flex items-center gap-2"
                  }
                  to="/dashboard/myPayments"
                >
                  My Payments
                </NavLink>
              </li>
            </>
          )}
          {user?.role === "rider" && (
            <>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-2 font-bold text-primary underline"
                      : "flex items-center gap-2"
                  }
                  to="/dashboard/myPendingDelivery"
                >
                  My Pending Delivery
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-2 font-bold text-primary underline"
                      : "flex items-center gap-2"
                  }
                  to="/dashboard/myCompletedDelivery"
                >
                  My Completed Delivery
                </NavLink>
              </li>
            </>
          )}
          {user?.role === "admin" && (
            <>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-2 font-bold text-primary underline"
                      : "flex items-center gap-2"
                  }
                  to="/dashboard/assignRiders"
                >
                  Assign Riders
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-2 font-bold text-primary underline"
                      : "flex items-center gap-2"
                  }
                  to="/dashboard/pendingRiders"
                >
                  Pending Riders
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-2 font-bold text-primary underline"
                      : "flex items-center gap-2"
                  }
                  to="/dashboard/approvedRiders"
                >
                  Active Riders
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-2 font-bold text-primary underline"
                      : "flex items-center gap-2"
                  }
                  to="/dashboard/userAdmin"
                >
                  User Admin
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
