import React from "react";
import useProfastAuth from "../../../Hook/useProfastAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { FaTrash, FaInfoCircle, FaMoneyBillWave, FaMapMarkerAlt } from "react-icons/fa";

const MyPercel = () => {
  const { firebaseUser } = useProfastAuth();
  const axiosSecure = useAxiosSecure();
  const { data: myPercels = [], isLoading } = useQuery({
    queryKey: ["myPercels", firebaseUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels?email=${firebaseUser?.email}`
      );
      return res.data;
    },
    enabled: !!firebaseUser?.email,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div className="text-center py-10">Loading your parcels...</div>;

  return (
    <div className="overflow-x-auto w-full px-2 md:px-0">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">My Parcels</h2>
      <table className="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
        <thead className="bg-green-100 text-gray-700">
          <tr>
            <th className="py-3 px-2 md:px-4 text-left">Tracking ID</th>
            <th className="py-3 px-2 md:px-4 text-left">Title</th>
            <th className="py-3 px-2 md:px-4 text-left">Type</th>
            <th className="py-3 px-2 md:px-4 text-left">Sender</th>
            <th className="py-3 px-2 md:px-4 text-left">Receiver</th>
            <th className="py-3 px-2 md:px-4 text-left">Cost</th>
            <th className="py-3 px-2 md:px-4 text-left">Status</th>
            <th className="py-3 px-2 md:px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {myPercels.length === 0 && (
            <tr>
              <td colSpan={8} className="text-center py-8 text-gray-400">No parcels found.</td>
            </tr>
          )}
          {myPercels.map((parcel) => (
            <tr key={parcel._id} className="border-b hover:bg-green-50 transition">
              <td className="py-2 px-2 md:px-4 font-mono text-xs md:text-sm">{parcel.tracking_id}</td>
              <td className="py-2 px-2 md:px-4">{parcel.title}</td>
              <td className="py-2 px-2 md:px-4 capitalize">{parcel.type}</td>
              <td className="py-2 px-2 md:px-4">
                <div className="font-semibold text-sm md:text-base">{parcel.sender_name}</div>
                <div className="text-xs text-gray-500">{parcel.sender_region}, {parcel.sender_center}</div>
              </td>
              <td className="py-2 px-2 md:px-4">
                <div className="font-semibold text-sm md:text-base">{parcel.receiver_name}</div>
                <div className="text-xs text-gray-500">{parcel.receiver_region}, {parcel.receiver_center}</div>
              </td>
              <td className="py-2 px-2 md:px-4 font-semibold text-green-700">৳{parcel.cost}</td>
              <td className="py-2 px-2 md:px-4">
                <span className={`px-2 py-1 rounded text-xs font-bold ${parcel.payment_status === "paid" ? "bg-green-200 text-green-800" : "bg-yellow-100 text-yellow-700"}`}>
                  {parcel.payment_status === "paid" ? "Paid" : "Unpaid"}
                </span>
              </td>
              <td className="py-2 px-2 md:px-4 flex gap-2 justify-center items-center">
                <button title="Details" className="p-2 rounded hover:bg-blue-100 text-blue-600">
                  <FaInfoCircle size={18} />
                </button>
                <button title="Delete" className="p-2 rounded hover:bg-red-100 text-red-600">
                  <FaTrash size={18} />
                </button>
                {parcel.payment_status === "unpaid" ? (
                  <button title="Pay Now" className="p-2 rounded hover:bg-green-100 text-green-700">
                    <FaMoneyBillWave size={18} />
                  </button>
                ) : (
                  <button title="Track" className="p-2 rounded hover:bg-purple-100 text-purple-700">
                    <FaMapMarkerAlt size={18} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyPercel;
