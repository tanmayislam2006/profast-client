import React from "react";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="min-h-[calc(100vh-130px) w-full">
        <Outlet  />
      </div>
    </div>
  );
};

export default MainLayout;
