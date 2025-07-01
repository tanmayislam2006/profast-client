import React from "react";
import { FiPackage, FiDollarSign, FiClipboard, FiSend, FiSettings } from "react-icons/fi";
import useProfastAuth from "../../../Hook/useProfastAuth";

const DashboardHome = () => {
    const{user}=useProfastAuth()
  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-10">


      {/* Welcome Section */}
      <header className="space-y-1">
        <h1 className="text-3xl font-bold text-gray-900">👋 Welcome back,{user.name} </h1>
        <p className="text-gray-600">Manage your deliveries and payments with ease.</p>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
          <FiPackage className="text-3xl text-primary" />
          <div>
            <p className="text-sm text-gray-500">Total Parcels</p>
            <p className="text-2xl font-bold text-gray-800">1,234</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
          <FiDollarSign className="text-3xl text-green-500" />
          <div>
            <p className="text-sm text-gray-500">Revenue</p>
            <p className="text-2xl font-bold text-gray-800">৳56,780</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
          <FiClipboard className="text-3xl text-yellow-500" />
          <div>
            <p className="text-sm text-gray-500">Pending Orders</p>
            <p className="text-2xl font-bold text-gray-800">12</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
          <FiSend className="text-3xl text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Delivered Today</p>
            <p className="text-2xl font-bold text-gray-800">78</p>
          </div>
        </div>
      </section>

      {/* Recent Parcels */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">📦 Recent Parcels</h2>
        <div className="overflow-x-auto bg-white rounded-xl shadow border border-base-300">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-base-200 text-gray-700">
              <tr>
                <th className="px-6 py-3">Tracking ID</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Sender</th>
                <th className="px-6 py-3">Receiver</th>
                <th className="px-6 py-3">Cost</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((i) => (
                <tr key={i} className="hover:bg-base-100">
                  <td className="px-6 py-4 font-mono text-gray-600">PCL-20250625-XYZ{i}</td>
                  <td className="px-6 py-4 text-gray-900">Sample Parcel {i}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium">Sender {i}</div>
                    <div className="text-xs text-gray-500">District, City</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium">Receiver {i}</div>
                    <div className="text-xs text-gray-500">District, City</div>
                  </td>
                  <td className="px-6 py-4 text-green-600 font-bold">৳{2700 + i * 100}</td>
                  <td className="px-6 py-4">
                    <span className="badge badge-warning">Unpaid</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">⚡ Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "All Parcels", icon: <FiPackage /> },
            { label: "Payments", icon: <FiDollarSign /> },
            { label: "Reports", icon: <FiClipboard /> },
            { label: "Settings", icon: <FiSettings /> },
          ].map((item, idx) => (
            <button
              key={idx}
              className="bg-white p-5 rounded-lg shadow hover:shadow-md transition-all flex flex-col items-center justify-center space-y-2 text-gray-700 hover:text-primary"
            >
              <div className="text-2xl">{item.icon}</div>
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardHome;