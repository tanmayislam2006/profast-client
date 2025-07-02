import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import useProfastAuth from "../../../../Hook/useProfastAuth";

const CompletedDelivery = () => {
  // Secure Axios instance with authentication headers / tokens
  const axiosSecure = useAxiosSecure();

  // React Query Client for cache invalidation
  const queryClient = useQueryClient();

  // Logged-in rider info
  const { user } = useProfastAuth();
  const riderEmail = user?.email;

  /**
   * 1️⃣ Fetch all completed deliveries for the logged-in rider
   *    These are deliveries with status 'delivered' and assigned to this rider
   */
  const {
    data: parcels = [],
    isLoading,
    isError,
  } = useQuery({
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

  /**
   * 2️⃣ Calculate Rider's Earning for each parcel
   *    - 80% if pickup and delivery center are same
   *    - 30% if different
   */
  const calculateEarning = (parcel) => {
    const cost = Number(parcel.cost);
    if (parcel.sender_center === parcel.receiver_center) {
      return cost * 0.8;
    } else {
      return cost * 0.3;
    }
  };

  /**
   * 3️⃣ Mutation: Mark a delivery as 'cashed out'
   *    - PATCH /parcels/:id/cashout
   */
  const mutation = useMutation({
    mutationFn: async ({ parcelId }) => {
      await axiosSecure.patch(
        `/completedPercel/${[parcelId]}/cashOut`,
        {},
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      // Refresh the list after successful cashout
      queryClient.invalidateQueries(["completedDeliveries", riderEmail]);
    },
  });

  /**
   * 4️⃣ Handle Cashout Click
   *    - Confirm with SweetAlert
   *    - Run mutation if confirmed
   */
  const handleCashout = (parcelId) => {
    Swal.fire({
      title: "Confirm Cashout",
      text: "You are about to cash out this delivery.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cash Out",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
            Swal.fire("Success!", "Cashout completed.", "success");
            mutation.mutate({ parcelId: parcelId });
        } catch (error) {
          console.error(error);
          Swal.fire("Error!", "Failed to cash out. Try again.", "error");
        }
      }
    });
  };

  /**
   * 5️⃣ UI
   */
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Completed Deliveries</h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : isError ? (
        <p className="text-error">
          Failed to load deliveries. Please try again.
        </p>
      ) : parcels.length === 0 ? (
        <p className="text-gray-500">
          You don't have any completed deliveries yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Title</th>
                <th>From</th>
                <th>To</th>
                <th>Picked At</th>
                <th>Delivered At</th>
                <th>Total Cost (৳)</th>
                <th>Your Earning (৳)</th>
                <th>Cashout Status</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel) => (
                <tr key={parcel._id}>
                  <td>{parcel.tracking_id}</td>
                  <td>{parcel.title}</td>
                  <td>{parcel.sender_center}</td>
                  <td>{parcel.receiver_center}</td>
                  <td>
                    {parcel.picked_at
                      ? new Date(parcel.picked_at).toLocaleString()
                      : "N/A"}
                  </td>
                  <td>
                    {parcel.delivered_at
                      ? new Date(parcel.delivered_at).toLocaleString()
                      : "N/A"}
                  </td>
                  <td>৳{parcel.cost}</td>
                  <td className="font-semibold text-green-600">
                    ৳{calculateEarning(parcel).toFixed(2)}
                  </td>
                  <td>
                    {parcel.cashout_status === "cashed_out" ? (
                      <span className="badge badge-success text-xs px-2 py-1 whitespace-nowrap">
                        Cashed Out
                      </span>
                    ) : (
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleCashout(parcel._id)}
                      >
                        Cashout
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompletedDelivery;
