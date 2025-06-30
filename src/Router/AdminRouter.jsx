import React from "react";
import useProfastAuth from "../Hook/useProfastAuth";
import { Navigate } from "react-router";

const AdminRouter = ({ children }) => {
  const { user, loading } = useProfastAuth();
  if (loading) {
    return <p className="text-center">Data is loading</p>;
  }
  if (!user || user?.role !== "admin") {
    return <Navigate to={"/forbidden"}  />;
  }
  return children;
};

export default AdminRouter;
