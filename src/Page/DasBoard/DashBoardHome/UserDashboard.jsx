// UserDashboard.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";

import {
  FaBox,
  FaMoneyBillWave,
  FaCheck,
  FaHourglassHalf,
} from "react-icons/fa";
import useProfastAuth from "../../../Hook/useProfastAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const UserDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useProfastAuth();

  const { data: dashboard = {} } = useQuery({
    queryKey: ["userDashboard", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/user?email=${user?.email}`,
        { withCredentials: true }
      );
      return res.data;
    },
  });

  const {
    totalParcels = 0,
    totalSpent = 0,
    delivered = 0,
    pending = 0,
    recentParcels = [],
  } = dashboard;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Welcome to Your Dashboard</h2>

      {/* Info Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="card bg-base-100 shadow-md p-4 flex items-center space-x-3">
          <FaBox className="text-primary text-3xl" />
          <div>
            <p className="text-xl font-bold">{totalParcels}</p>
            <p>Total Parcels</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md p-4 flex items-center space-x-3">
          <FaMoneyBillWave className="text-green-600 text-3xl" />
          <div>
            <p className="text-xl font-bold">৳{totalSpent}</p>
            <p>Total Spent</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md p-4 flex items-center space-x-3">
          <FaCheck className="text-success text-3xl" />
          <div>
            <p className="text-xl font-bold">{delivered}</p>
            <p>Delivered</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md p-4 flex items-center space-x-3">
          <FaHourglassHalf className="text-yellow-500 text-3xl" />
          <div>
            <p className="text-xl font-bold">{pending}</p>
            <p>Pending</p>
          </div>
        </div>
      </div>

      {/* Recent Parcels Table */}
      <div className="overflow-x-auto">
        <h3 className="text-xl font-semibold mb-2">Recent Parcels</h3>
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Title</th>
              <th>Type</th>
              <th>Cost</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentParcels.length > 0 ? (
              recentParcels.map((p) => (
                <tr key={p._id}>
                  <td>{p.tracking_id}</td>
                  <td>{p.title}</td>
                  <td className="capitalize">{p.type}</td>
                  <td>৳{p.cost}</td>
                  <td>
                    <span
                      className={`badge text-white ${
                        p.delivery_status === "delivered"
                          ? "bg-green-600"
                          : "bg-yellow-500"
                      }`}
                    >
                      {p.delivery_status}
                    </span>
                  </td>
                  <td>{p.creation_date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500">
                  No recent parcels.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
