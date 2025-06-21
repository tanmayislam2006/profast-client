import React, { use } from "react";
import ProfastContext from "../../Context/ProfastContext";
import Profast from './../../Components/Profast/Profast';

const Home = () => {
  const { name } = use(ProfastContext);
  return <div>this is home {name}

  </div>;
};

export default Home;
