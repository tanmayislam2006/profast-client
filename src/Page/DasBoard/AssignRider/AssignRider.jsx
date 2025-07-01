import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { FaMotorcycle } from "react-icons/fa";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [availableRiders, setAvailableRiders] = useState([]);
  const [loadingRiders, setLoadingRiders] = useState(false);

  /**
   * 1️⃣ Load assignable parcels (Admin-only route)
   */
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["assignableParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/assignableParcels", {
        withCredentials: true,
      });
      return res.data;
    },
  });

  /**
   * 2️⃣ Mutation to assign rider
   */
  const assignMutation = useMutation({
    mutationFn: async ({ parcelId, rider }) => {
      const res = await axiosSecure.patch(
        `/admin/parcels/${parcelId}/assign`,
        {
          riderId: rider._id,
          riderName: rider.rider_name,
        },
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success", "Rider assigned!", "success");
      queryClient.invalidateQueries(["assignableParcels"]);
      setSelectedParcel(null);
      setAvailableRiders([]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to assign rider", "error");
    },
  });

  /**
   * 3️⃣ When admin clicks Assign button
   *    - Load available riders for sender_center
   */
  const handleOpenAssign = async (parcel) => {
    setSelectedParcel(parcel);
    setLoadingRiders(true);
    setAvailableRiders([]);
    try {
      const res = await axiosSecure.get("/admin/riders/available", {
        withCredentials: true,
        params: { sender_center: parcel.sender_center },
      });
      setAvailableRiders(res.data);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to load riders", "error");
    } finally {
      setLoadingRiders(false);
    }
  };

  /**
   * 4️⃣ UI
   */
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Assign Rider to Parcels</h2>

      {isLoading ? (
        <p>Loading parcels...</p>
      ) : parcels.length === 0 ? (
        <p>No parcels available for assignment.</p>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Sender Center</th>
              <th>Receiver Center</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id}>
                <td>{parcel.tracking_id}</td>
                <td>{parcel.sender_center}</td>
                <td>{parcel.receiver_center}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleOpenAssign(parcel)}
                  >
                    <FaMotorcycle className="mr-1" /> Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedParcel && (
        <div className="mt-6 border rounded-lg p-4 shadow-lg">
          <h3 className="text-lg font-semibold mb-2">
            Select Rider for:{" "}
            <span className="text-primary">{selectedParcel.tracking_id}</span>
          </h3>

          {loadingRiders ? (
            <p>Loading riders...</p>
          ) : availableRiders.length === 0 ? (
            <p className="text-error">No riders available in this district.</p>
          ) : (
            <ul className="space-y-2">
              {availableRiders.map((rider) => (
                <li
                  key={rider._id}
                  className="flex justify-between items-center border p-2 rounded"
                >
                  <div>
                    <p className="font-semibold">{rider.rider_name}</p>
                    <p className="text-sm text-gray-500">{rider.mobile}</p>
                  </div>
                  <button
                    className="btn btn-xs btn-success"
                    disabled={assignMutation.isLoading}
                    onClick={() =>
                      assignMutation.mutate({
                        parcelId: selectedParcel._id,
                        rider,
                      })
                    }
                  >
                    {assignMutation.isLoading ? "Assigning..." : "Assign"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default AssignRider;
