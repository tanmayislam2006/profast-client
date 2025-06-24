import React from "react";
import Profast from "../Components/Profast/Profast";
import { Outlet } from "react-router";
import devilveryimage from "../assets/authImage.png";

const AuthnticationLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-start">
        <Profast />
      </div>
      <div className="my-5 min-h-[calc(100vh-130px)] flex justify-between">
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <Outlet />
          
        </div>
        <div className="hidden md:flex w-1/2 items-center justify-center bg-[#f8fae5]">
          {/* The image will be provided by the child (e.g., Register or Login page) if needed */}
          <img src={devilveryimage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthnticationLayout;
