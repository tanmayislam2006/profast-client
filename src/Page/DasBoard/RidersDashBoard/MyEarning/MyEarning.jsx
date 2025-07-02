import React from "react";
import { useQuery } from "@tanstack/react-query";
import { format, isToday, isThisWeek, isThisMonth, isThisYear } from "date-fns";
import useProfastAuth from "../../../../Hook/useProfastAuth";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

const MyEarning = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useProfastAuth();

  const riderEmail = user?.email;

  // Fetch completed & delivered parcels for the logged-in rider
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["completedDeliveries", riderEmail],
    enabled: !!riderEmail,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider/completedPercel/${riderEmail}`,
        {
          withCredentials: true,
        }
      );
      return res.data;
    },
  });

  // Function to calculate per-parcel earning
  const getEarning = (parcel) => {
    const cost = Number(parcel.cost);
    return parcel.sender_center === parcel.receiver_center
      ? cost * 0.8
      : cost * 0.3;
  };

  // Filter data by date

  const todayEarnings = parcels.filter((p) =>
    isToday(new Date(p.delivered_at))
  );
  const weekEarnings = parcels.filter((p) =>
    isThisWeek(new Date(p.delivered_at))
  );
  const monthEarnings = parcels.filter((p) =>
    isThisMonth(new Date(p.delivered_at))
  );
  const yearEarnings = parcels.filter((p) =>
    isThisYear(new Date(p.delivered_at))
  );

  // Calculate sums
  const totalEarning = parcels.reduce((sum, p) => sum + getEarning(p), 0);
  const totalCashout = parcels
    .filter((p) => p.cashout_status === "cashed_out")
    .reduce((sum, p) => sum + getEarning(p), 0);
  const pendingCashout = totalEarning - totalCashout;

  const calculateSum = (list) =>
    list.reduce((sum, p) => sum + getEarning(p), 0).toFixed(2);

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-3xl font-bold text-primary">
        📦 My Earnings Overview
      </h2>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <>
          {/* Total Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="card bg-base-100 shadow-lg p-4 border">
              <h4 className="font-semibold text-gray-600">Total Earned</h4>
              <p className="text-2xl font-bold text-green-600">
                ৳{totalEarning.toFixed(2)}
              </p>
            </div>
            <div className="card bg-base-100 shadow-lg p-4 border">
              <h4 className="font-semibold text-gray-600">Cashed Out</h4>
              <p className="text-2xl font-bold text-blue-600">
                ৳{totalCashout.toFixed(2)}
              </p>
            </div>
            <div className="card bg-base-100 shadow-lg p-4 border">
              <h4 className="font-semibold text-gray-600">Pending Cashout</h4>
              <p className="text-2xl font-bold text-red-600">
                ৳{pendingCashout.toFixed(2)}
              </p>
            </div>
            <div className="card bg-base-100 shadow-lg p-4 border">
              <h4 className="font-semibold text-gray-600">Deliveries</h4>
              <p className="text-2xl font-bold">{parcels.length}</p>
            </div>
          </div>

          {/* Time Based Report */}
          <div>
            <h3 className="text-xl font-semibold mt-8 mb-2 text-primary">
              📊 Time-Based Report
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-base-200 p-4 rounded-md">
                <p className="font-medium">Today</p>
                <p className="text-lg font-bold text-green-500">
                  ৳{calculateSum(todayEarnings)}
                </p>
              </div>
              <div className="bg-base-200 p-4 rounded-md">
                <p className="font-medium">This Week</p>
                <p className="text-lg font-bold text-green-500">
                  ৳{calculateSum(weekEarnings)}
                </p>
              </div>
              <div className="bg-base-200 p-4 rounded-md">
                <p className="font-medium">This Month</p>
                <p className="text-lg font-bold text-green-500">
                  ৳{calculateSum(monthEarnings)}
                </p>
              </div>
              <div className="bg-base-200 p-4 rounded-md">
                <p className="font-medium">This Year</p>
                <p className="text-lg font-bold text-green-500">
                  ৳{calculateSum(yearEarnings)}
                </p>
              </div>
            </div>
          </div>

          {/* List of Deliveries (Optional) */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-2">
              📋 Recent Completed Deliveries
            </h3>
            <div className="overflow-x-auto">
              <table className="table  table-zebra w-full">
                <thead>
                  <tr>
                    <th>Tracking ID</th>
                    <th>Delivered</th>
                    <th>Cost</th>
                    <th>Earning</th>
                    <th>Cashout</th>
                  </tr>
                </thead>
                <tbody>
                  {parcels.map((p) => (
                    <tr key={p._id}>
                      <td>{p.tracking_id}</td>
                      <td>
                        {format(
                          new Date(p.delivered_at),
                          "dd MMM yyyy, hh:mm a"
                        )}
                      </td>
                      <td>৳{p.cost}</td>
                      <td className="text-green-600 font-semibold">
                        ৳{getEarning(p).toFixed(2)}
                      </td>
                      <td>
                        {p.cashout_status === "cashed_out" ? (
                          <span className="badge badge-success">
                            Cashed Out
                          </span>
                        ) : (
                          <span className="badge badge-warning">Pending</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyEarning;
