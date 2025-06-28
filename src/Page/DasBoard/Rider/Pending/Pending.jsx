import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaInfoCircle } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

const Pending = () => {
  const axiosSecure = useAxiosSecure();
  const { data: pendingRiders = [], refetch } = useQuery({
    queryKey: ["allPending-Riders"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/riders?status=pending`);
      return response.data;
    },
  });

  const [selectedRider, setSelectedRider] = useState(null);

  const handleApprove = async (id) => {
    await axiosSecure.patch(`/riders/approve/${id}`);
    refetch();
    setSelectedRider(null);
  };

  const handleReject = async (id) => {
    await axiosSecure.patch(`/riders/reject/${id}`);
    refetch();
  };

  return (
    <div className="overflow-x-auto w-full px-2 mt-10">
      {/* Modal */}
      {selectedRider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold"
              onClick={() => setSelectedRider(null)}
            >
              <FaTimesCircle />
            </button>
            <h3 className="text-2xl font-bold text-primary mt-5 mb-10 text-center">
              Rider Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
              <div className="space-y-3">
                <div>
                  <b>Name:</b> {selectedRider.rider_name}
                </div>
                <div>
                  <b>NID:</b> {selectedRider.nid_number}
                </div>
                <div>
                  <b>DOB:</b> {selectedRider.dob}
                </div>
                <div>
                  <b>Mobile:</b> {selectedRider.mobile}
                </div>
                <div>
                  <b>Bike Reg:</b> {selectedRider.bike_registration}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <b>Email:</b> {selectedRider.email}
                </div>
                <div>
                  <b>Region:</b> {selectedRider.rider_region}
                </div>
                <div>
                  <b>Warehouse:</b> {selectedRider.warehouse}
                </div>
                <div>
                  <b>Applied:</b>{" "}
                  {new Date(selectedRider.application_date).toLocaleString()}
                </div>
                <div>
                  <b>Status:</b>{" "}
                  <span className="font-bold text-yellow-700">
                    {selectedRider.rider_status}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-6 justify-center">
              <button
                className="py-2 px-6 rounded-lg bg-primary text-white font-semibold cursor-pointer flex items-center gap-2"
                onClick={() => handleApprove(selectedRider._id)}
              >
                <FaCheckCircle /> Approve
              </button>
              <button
                className="py-2 px-6 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 cursor-pointer"
                onClick={() => setSelectedRider(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <table className="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
        <thead className="bg-yellow-100 text-gray-700">
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Region</th>
            <th>Warehouse</th>
            <th>Applied</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingRiders.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-8 text-gray-400">
                No pending riders found.
              </td>
            </tr>
          )}
          {pendingRiders.map((rider) => (
            <tr
              key={rider._id}
              className="border-b hover:bg-yellow-50 transition"
            >
              <td>{rider.rider_name}</td>
              <td>{rider.mobile}</td>
              <td>{rider.rider_region}</td>
              <td>{rider.warehouse}</td>
              <td>{new Date(rider.application_date).toLocaleDateString()}</td>
              <td className="flex gap-2 justify-center items-center">
                <button
                  title="Details"
                  className="p-2 rounded hover:bg-blue-100 text-blue-600"
                  onClick={() => setSelectedRider(rider)}
                >
                  <FaInfoCircle size={18} />
                </button>
                <button
                  title="Approve"
                  className="p-2 rounded hover:bg-green-100 text-primary"
                  onClick={() => setSelectedRider(rider)}
                >
                  <FaCheckCircle size={18} />
                </button>
                <button
                  title="Reject"
                  className="p-2 rounded hover:bg-red-100 text-red-600"
                  onClick={() => handleReject(rider._id)}
                >
                  <FaTimesCircle size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pending;
