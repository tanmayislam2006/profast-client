import React, { useState } from "react";
import useProfastAuth from "../../../Hook/useProfastAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import {
  FaTrash,
  FaInfoCircle,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaTimes,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyPercel = () => {
  const { firebaseUser } = useProfastAuth();
  const axiosSecure = useAxiosSecure();
  const [parcelDetails, setParcelDetails] = useState(null);
  const navigate = useNavigate();
  const {
    data: myPercels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myPercels", firebaseUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels?email=${firebaseUser?.email}`,{withCredentials:true}
      );
      return res.data;
    },
    enabled: !!firebaseUser?.email,
    refetchOnWindowFocus: false,
  });

  if (isLoading)
    return <div className="text-center py-10">Loading your parcels...</div>;
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This parcel will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#e11d48", // red-600
      cancelButtonColor: "#6b7280", // gray-500
    });
    if (confirm.isConfirmed) {
      try {
        axiosSecure.delete(`/deleteParcel/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Parcel has been deleted.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          }
          refetch();
        });
      } catch (err) {
        Swal.fire("Error", err.message || "Failed to delete parcel", "error");
      }
    }
  };
  const handleDetails = (parcel) => {
    setParcelDetails(parcel);
  };
  const handlePayment = (parcel) => {
    Swal.fire({
      title: "Payment",
      text: `Proceed to payment for parcel with Tracking ID: ${parcel.tracking_id}`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Pay Now",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#4f46e5", // indigo-600
      cancelButtonColor: "#6b7280", // gray-500
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/dashboard/payment/${parcel._id}`);
      }
    });
  };
  const closeModal = () => setParcelDetails(null);

  return (
    <div className="overflow-x-auto w-full px-2 md:px-0">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">
        My Parcels
      </h2>
      {/* Details Modal */}
      {parcelDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative animate-fadeIn">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold"
              onClick={closeModal}
              aria-label="Close"
            >
              <FaTimes />
            </button>
            <h3 className="text-2xl font-bold text-primary mb-4 text-center">
              Parcel Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
              <div>
                <div className="mb-2">
                  <span className="font-semibold">Tracking ID:</span>{" "}
                  <span className="font-mono">{parcelDetails.tracking_id}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Title:</span>{" "}
                  {parcelDetails.title}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Type:</span>{" "}
                  <span className="capitalize">{parcelDetails.type}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Weight:</span>{" "}
                  {parcelDetails.weight || "-"} kg
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Cost:</span>{" "}
                  <span className="text-primary font-bold">
                    ৳{parcelDetails.cost}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`font-bold ${
                      parcelDetails.payment_status === "paid"
                        ? "text-primary"
                        : "text-yellow-700"
                    }`}
                  >
                    {parcelDetails.payment_status === "paid"
                      ? "Paid"
                      : "Unpaid"}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Delivery Status:</span>{" "}
                  <span className="capitalize">
                    {parcelDetails.delivery_status.replace(/_/g, " ")}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Created:</span>{" "}
                  {parcelDetails.creation_date}
                </div>
              </div>
              <div>
                <div className="mb-2">
                  <span className="font-semibold">Sender:</span>{" "}
                  {parcelDetails.sender_name}
                </div>
                <div className="mb-2 text-xs text-gray-500">
                  {parcelDetails.sender_region}, {parcelDetails.sender_center}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Sender Contact:</span>{" "}
                  {parcelDetails.sender_contact}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Sender Address:</span>{" "}
                  {parcelDetails.sender_address}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Receiver:</span>{" "}
                  {parcelDetails.receiver_name}
                </div>
                <div className="mb-2 text-xs text-gray-500">
                  {parcelDetails.receiver_region},{" "}
                  {parcelDetails.receiver_center}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Receiver Contact:</span>{" "}
                  {parcelDetails.receiver_contact}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Receiver Address:</span>{" "}
                  {parcelDetails.receiver_address}
                </div>
                {parcelDetails.pickup_instruction && (
                  <div className="mb-2">
                    <span className="font-semibold">Pickup Instruction:</span>{" "}
                    {parcelDetails.pickup_instruction}
                  </div>
                )}
                {parcelDetails.delivery_instruction && (
                  <div className="mb-2">
                    <span className="font-semibold">Delivery Instruction:</span>{" "}
                    {parcelDetails.delivery_instruction}
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-4 mt-6 justify-center">
              <button
                className="py-2 px-6 rounded-lg bg-primary btn text-white font-semibold"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
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
              <td colSpan={8} className="text-center py-8 text-gray-400">
                No parcels found.
              </td>
            </tr>
          )}
          {myPercels.map((parcel) => (
            <tr
              key={parcel._id}
              className="border-b hover:bg-green-50 transition"
            >
              <td className="py-2 px-2 md:px-4 font-mono text-xs md:text-sm">
                {parcel.tracking_id}
              </td>
              <td className="py-2 px-2 md:px-4">{parcel.title}</td>
              <td className="py-2 px-2 md:px-4 capitalize">{parcel.type}</td>
              <td className="py-2 px-2 md:px-4">
                <div className="font-semibold text-sm md:text-base">
                  {parcel.sender_name}
                </div>
                <div className="text-xs text-gray-500">
                  {parcel.sender_region}, {parcel.sender_center}
                </div>
              </td>
              <td className="py-2 px-2 md:px-4">
                <div className="font-semibold text-sm md:text-base">
                  {parcel.receiver_name}
                </div>
                <div className="text-xs text-gray-500">
                  {parcel.receiver_region}, {parcel.receiver_center}
                </div>
              </td>
              <td className="py-2 px-2 md:px-4 font-semibold text-primary">
                ৳{parcel.cost}
              </td>
              <td className="py-2 px-2 md:px-4">
                <span
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    parcel.payment_status === "paid"
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {parcel.payment_status === "paid" ? "Paid" : "Unpaid"}
                </span>
              </td>
              <td className="py-2 px-2 table-cell">
                <button
                  title="Details"
                  className="p-2 rounded hover:bg-blue-100 text-blue-600"
                  onClick={() => handleDetails(parcel)}
                >
                  <FaInfoCircle size={18} />
                </button>
                <button
                  onClick={() => handleDelete(parcel._id)}
                  title="Delete"
                  className="p-2 rounded hover:bg-red-100 text-red-600"
                >
                  <FaTrash size={18} />
                </button>
                {parcel.payment_status === "unpaid" ? (
                  <button
                    onClick={() => handlePayment(parcel)}
                    title="Pay Now"
                    className="p-2 rounded hover:bg-green-100 text-primary"
                  >
                    <FaMoneyBillWave size={18} />
                  </button>
                ) : (
                  <button
                    title="Track"
                    className="p-2 rounded hover:bg-purple-100 text-purple-700"
                  >
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
