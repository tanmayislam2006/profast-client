import React from "react";
import { Link, NavLink } from "react-router";
import Profast from "../Profast/Profast";
import { FaSignInAlt } from "react-icons/fa";

const Navbar = () => {
  const user = null;

  const link = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 font-bold text-primary underline"
              : "flex items-center gap-2"
          }
        >
          <span className="">Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 font-bold text-primary underline"
              : "flex items-center gap-2"
          }
        >
          <span className="">Services</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/coverage"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 font-bold text-primary underline"
              : "flex items-center gap-2"
          }
        >
          <span className="">Coverage</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 font-bold text-primary underline"
              : "flex items-center gap-2"
          }
        >
          <span className="">About</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/pricing"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 font-bold text-primary underline"
              : "flex items-center gap-2"
          }
        >
          <span className="">Pricing</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/berider"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 font-bold text-primary underline"
              : "flex items-center gap-2"
          }
        >
          <span className="">Be a Rider</span>
        </NavLink>
      </li>
    </>
  );
  return (
    <nav className="w-full bg-base-100 sticky top-0 z-50 shadow-md rounded-lg py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2 ">
        <Profast />
        <ul className="hidden lg:flex gap-8 items-center">{link}</ul>
        <div className="flex gap-4 md:gap-10 items-center">
          {user ? (
            <div className="dropdown dropdown-end mr-5  cursor-pointer">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar relative group "
              >
                <div className="w-10 rounded-full">
                  <img alt="user" src={user?.photo} />
                </div>
                <p className="absolute left-1/2 -translate-x-1/2 -bottom-10 bg-gray-800 text-white  rounded px-3 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-50">
                  {user?.name}
                </p>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm bg-base-100 dropdown-content rounded-box z-1 mt-3 w-64 p-2 shadow space-y-5 py-2"
              >
                {link}
              </ul>
            </div>
          ) : (
            <div className="hidden md:flex gap-3">
              <Link
                to="/login"
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full font-bold"
              >
                <FaSignInAlt /> Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
