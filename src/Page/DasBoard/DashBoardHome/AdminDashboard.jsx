// AdminDashboard.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["adminDashboard"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/admin");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-20">Loading dashboard...</div>;
  }

  if (isError || !data) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load dashboard data.
      </div>
    );
  }

  // Pie Chart Data
  const pieData = {
    labels: ["Delivered", "In Transit", "Unassigned"],
    datasets: [
      {
        label: "Parcel Status",
        data: [data.delivered, data.inTransit, data.unassignedParcels],
        backgroundColor: ["#10B981", "#F59E0B", "#EF4444"],
      },
    ],
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card title="Total Parcels" value={data.totalParcels} icon="📦" />
        <Card title="Paid Parcels" value={data.totalPaidParcels} icon="💰" />
        <Card
          title="Total Earnings"
          value={`৳${data.totalEarnings}`}
          icon="💵"
        />
        <Card
          title="Unassigned Parcels"
          value={data.unassignedParcels}
          icon="🚚"
        />
      </div>

      {/* Delivery Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card title="In Transit" value={data.inTransit} icon="🚛" />
        <Card title="Delivered" value={data.delivered} icon="✅" />
      </div>

      {/* Earnings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card
          title="Today's Earnings"
          value={`৳${data.todayEarnings}`}
          icon="📅"
        />
        <Card title="This Week" value={`৳${data.weekEarnings}`} icon="🗓️" />
        <Card title="This Month" value={`৳${data.monthEarnings}`} icon="📈" />
        <Card title="This Year" value={`৳${data.yearEarnings}`} icon="📊" />
      </div>

      {/* Charts & Recent Parcels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-xl font-semibold mb-4">
            Parcel Status Breakdown
          </h3>
          <Pie data={pieData} />
        </div>
        <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
          <h3 className="text-xl font-semibold mb-4">Recent Parcels</h3>
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Status</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {data.recentParcels.map((parcel) => (
                <tr key={parcel._id}>
                  <td>{parcel.tracking_id}</td>
                  <td>{parcel.sender_name}</td>
                  <td>{parcel.receiver_name}</td>
                  <td className="capitalize">
                    {parcel.delivery_status.replace("_", " ")}
                  </td>
                  <td>{parcel.payment_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

const Card = ({ title, value, icon }) => (
  <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
    <div>
      <div className="text-gray-500 text-sm">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
    <div className="text-3xl">{icon}</div>
  </div>
);
