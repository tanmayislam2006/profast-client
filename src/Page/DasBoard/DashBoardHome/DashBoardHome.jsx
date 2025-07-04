import React from "react";
import { FiPackage, FiDollarSign, FiClipboard, FiSend, FiSettings } from "react-icons/fi";
import useProfastAuth from "../../../Hook/useProfastAuth";
import UserDashboard from "./UserDashboard";
import RiderDashboard from "./RiderDashboard";
import AdminDashboard from "./AdminDashboard";
import Forbidden from "../../../Components/Forbidden/Forbidden";

const DashboardHome = () => {
    const{user}=useProfastAuth()

    if(user?.role ==="user"){
      return <UserDashboard/>
    }
    else if(user?.role==="rider"){
      return <RiderDashboard/>
    }
    else if(user?.role ==='admin'){
      return <AdminDashboard/>
    }
    else{
      return <Forbidden/>
    }
};

export default DashboardHome;