import React, { use } from "react";
import ProfastContext from "../Context/ProfastContext";

const useProfastAuth = () => {
  const sharedData = use(ProfastContext);
  return sharedData;
};

export default useProfastAuth;
