import React from "react";
import { Link } from "react-router";
import proFasLog from "../../assets/logo.png";

const Profast = () => {
  return (
    <Link to={"/"} className="">
      <div className="flex items-center">
        <img
          src={proFasLog}
          className="w-10 h-10 object-contain"
          alt="Profast Logo"
        />
        <p className="font-bold text-2xl text-gray-800 mt-3 -ml-3">Profast</p>
      </div>
    </Link>
  );
};

export default Profast;
