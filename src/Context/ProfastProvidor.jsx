import React from "react";
import ProfastContext from "./ProfastContext";

const ProfastProvidor = ({ children }) => {
  const shareData = {
    name: "Profast",
  };
  return <ProfastContext value={shareData}>{children}</ProfastContext>;
};

export default ProfastProvidor;
