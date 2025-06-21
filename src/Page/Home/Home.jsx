import React, { use } from "react";
import ProfastContext from "../../Context/ProfastContext";

const Home = () => {
  const { name } = use(ProfastContext);
  return <div>this is home {name}</div>;
};

export default Home;
