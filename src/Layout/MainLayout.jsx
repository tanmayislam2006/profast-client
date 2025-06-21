import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar/>
      <div className="min-h-[calc(100vh-130px)] w-full mt-5">
        <Outlet  />
      </div>
      <Footer/>
    </div>
  );
};

export default MainLayout;
