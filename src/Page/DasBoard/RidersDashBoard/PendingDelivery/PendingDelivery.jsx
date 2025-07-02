import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import useProfastAuth from "../../../../Hook/useProfastAuth";

const PendingDelivery = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useProfastAuth();

  // Modal state
  const [selectedParcel, setSelectedParcel] = useState(null);

  // Fetch parcels
  const {
    data: parcels = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pendingRiderParcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider/percels/${user?.email}`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  // Mutation for status update
  const { mutateAsync: updateStatus } = useMutation({
    mutationFn: async ({ parcelId, status }) => {
      const res = await axiosSecure.patch(`/parcels/${parcelId}/status`, {
        status,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["pendingRiderParcels", user?.email]);
    },
  });

  // Handle status update
  const handleStatusUpdate = (parcel, newStatus) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Mark parcel as ${newStatus.replace("_", " ")}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update",
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatus({ parcelId: parcel._id, status: newStatus })
          .then(() => {
            Swal.fire("Updated!", "Parcel status updated.", "success");
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to update status.", "error");
          });
      }
    });
  };

  // UI
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Delivery</h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : isError ? (
        <p className="text-error">Failed to load parcels.</p>
      ) : parcels.length === 0 ? (
        <p className="text-gray-500">No assigned deliveries.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Title</th>
                <th>Type</th>
                <th>Weight</th>
                <th>Receiver</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel) => (
                <tr key={parcel._id}>
                  <td>{parcel.tracking_id}</td>
                  <td>{parcel.title}</td>
                  <td className="capitalize">{parcel.type.replace("_", " ")}</td>
                  <td>{parcel.weight}kg</td>
                  <td>{parcel.receiver_name}</td>
                  <td>৳{parcel.cost}</td>
                  <td className="capitalize">{parcel.delivery_status.replace("_", " ")}</td>
                  <td className="space-x-2">
                    {parcel.delivery_status === "assigned_to_rider" && (
                      <button
                        className="btn btn-sm btn-primary text-black"
                        onClick={() => handleStatusUpdate(parcel, "in_transit")}
                      >
                        Mark Picked Up
                      </button>
                    )}
                    {parcel.delivery_status === "in_transit" && (
                      <button
                        className="btn btn-sm btn-success text-black"
                        onClick={() => handleStatusUpdate(parcel, "delivered")}
                      >
                        Mark Delivered
                      </button>
                    )}
                    <button
                      className="btn btn-sm btn-outline btn-info"
                      onClick={() => setSelectedParcel(parcel)}
                    >
                      Info
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Info Modal */}
      {selectedParcel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative animate-fadeIn">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setSelectedParcel(null)}
            >✕</button>
            <h3 className="text-xl font-bold mb-2">Parcel Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium">Sender:</span> {selectedParcel.sender_name}
              </div>
              <div>
                <span className="font-medium">Sender Contact:</span> {selectedParcel.sender_contact}
              </div>
              <div>
                <span className="font-medium">Sender Region:</span> {selectedParcel.sender_region}
              </div>
              <div>
                <span className="font-medium">Sender Center:</span> {selectedParcel.sender_center}
              </div>
              <div className="md:col-span-2">
                <span className="font-medium">Sender Address:</span> {selectedParcel.sender_address}
              </div>
              <div>
                <span className="font-medium">Receiver:</span> {selectedParcel.receiver_name}
              </div>
              <div>
                <span className="font-medium">Receiver Contact:</span> {selectedParcel.receiver_contact}
              </div>
              <div>
                <span className="font-medium">Receiver Region:</span> {selectedParcel.receiver_region}
              </div>
              <div>
                <span className="font-medium">Receiver Center:</span> {selectedParcel.receiver_center}
              </div>
              <div className="md:col-span-2">
                <span className="font-medium">Receiver Address:</span> {selectedParcel.receiver_address}
              </div>
              <div className="md:col-span-2">
                <span className="font-medium">Pickup Instruction:</span> {selectedParcel.pickup_instruction || "N/A"}
              </div>
              <div className="md:col-span-2">
                <span className="font-medium">Delivery Instruction:</span> {selectedParcel.delivery_instruction || "N/A"}
              </div>
              <div>
                <span className="font-medium">Payment Status:</span> {selectedParcel.payment_status}
              </div>
              <div>
                <span className="font-medium">Created:</span> {selectedParcel.creation_date}
              </div>
              <div>
                <span className="font-medium">Assigned Rider:</span> {selectedParcel.assigned_rider_name}
              </div>
              <div>
                <span className="font-medium">Assigned Email:</span> {selectedParcel.assigned_rider_email}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingDelivery;