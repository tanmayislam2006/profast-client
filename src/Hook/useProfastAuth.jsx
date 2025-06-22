import React, { use } from "react";
import ProfastContext from "../Context/ProfastContext";

const useProfastAuth = () => {
  const shareData = use(ProfastContext);
  return shareData;
};

export default useProfastAuth;
