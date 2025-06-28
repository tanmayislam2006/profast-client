import React, { useState } from "react";
import { FaTimesCircle, FaInfoCircle } from "react-icons/fa";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Approved = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);

  // Fetch all approved riders
  const { data: approvedRiders = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["allAprove-Riders"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/riders?status=approved`);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-gray-500 text-lg">Loading approved riders...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-red-500 text-lg">Error loading riders. Please try again.</span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full px-2 md:px-0">
      <h2 className="text-3xl font-bold text-primary mb-4 text-center">Approved Riders</h2>

      {/* Modal */}
      {selectedRider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold"
              onClick={() => setSelectedRider(null)}
              title="Close"
            >
              <FaTimesCircle />
            </button>
            <h3 className="text-2xl font-bold text-primary mb-4 text-center">Rider Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
              <div>
                <div><b>Name:</b> {selectedRider.rider_name}</div>
                <div><b>NID:</b> {selectedRider.nid_number}</div>
                <div><b>DOB:</b> {selectedRider.dob}</div>
                <div><b>Mobile:</b> {selectedRider.mobile}</div>
                <div><b>Bike Reg:</b> {selectedRider.bike_registration}</div>
              </div>
              <div>
                <div><b>Email:</b> {selectedRider.email}</div>
                <div><b>Region:</b> {selectedRider.rider_region}</div>
                <div><b>Warehouse:</b> {selectedRider.warehouse}</div>
                <div><b>Applied:</b> {new Date(selectedRider.application_date).toLocaleString()}</div>
                <div><b>Status:</b> <span className="font-bold text-primary">{selectedRider.rider_status}</span></div>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button
                className="py-2 px-6 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
                onClick={() => setSelectedRider(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-green-100 text-primary">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Mobile</th>
              <th className="py-3 px-4 text-left">Region</th>
              <th className="py-3 px-4 text-left">Warehouse</th>
              <th className="py-3 px-4 text-left">Applied</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {approvedRiders.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  No approved riders found.
                </td>
              </tr>
            )}
            {approvedRiders.map((rider) => (
              <tr
                key={rider._id}
                className="border-b hover:bg-green-50 transition"
              >
                <td className="py-3 px-4">{rider.rider_name}</td>
                <td className="py-3 px-4">{rider.mobile}</td>
                <td className="py-3 px-4">{rider.rider_region}</td>
                <td className="py-3 px-4">{rider.warehouse}</td>
                <td className="py-3 px-4">
                  {new Date(rider.application_date).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 flex justify-center items-center">
                  <button
                    title="Details"
                    className="p-2 rounded hover:bg-green-100 text-primary"
                    onClick={() => setSelectedRider(rider)}
                  >
                    <FaInfoCircle size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Approved;
