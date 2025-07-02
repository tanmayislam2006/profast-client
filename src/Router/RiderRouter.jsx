import React from "react";
import useProfastAuth from "../Hook/useProfastAuth";
import { Navigate } from "react-router";

const RiderRouter = ({ children }) => {
  const { user, loading } = useProfastAuth();
  if (loading) {
    return <p className="text-center">Data is loading</p>;
  }
  if (!user || user?.role !== "rider") {
    return <Navigate to={"/forbidden"}  />;
  }
  return children;
};

export default RiderRouter;
