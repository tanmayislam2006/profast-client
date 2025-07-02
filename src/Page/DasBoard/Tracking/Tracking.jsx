import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const STATUS_ORDER = [
  "created",
  "paid",
  "ridder assign",
  "in transit",
  "delivired",
];

const STATUS_LABELS = {
  created: "Created",
  paid: "Payment Received",
  "ridder assign": "Rider Assigned",
  "in transit": "In Transit",
  delivired: "Delivered",
};

const STATUS_COLORS = {
  created: "bg-gray-400",
  paid: "bg-blue-500",
  "ridder assign": "bg-purple-500",
  "in transit": "bg-yellow-400",
  delivired: "bg-green-500",
};

const Tracking = () => {
  const axiosSecure = useAxiosSecure();

  const [trackingId, setTrackingId] = useState("");
  const [searchId, setSearchId] = useState("");

  // Query for tracking info
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["trackingInfo", searchId],
    enabled: !!searchId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/tracking/${searchId}`,{withCredentials:true});
      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (trackingId.trim()) {
      setSearchId(trackingId.trim());
      refetch();
    }
  };

  const getCurrentStep = () => {
    if (!data?.logs?.length) return 0;
    const latestStatus = data.logs[data.logs.length - 1].status;
    return STATUS_ORDER.indexOf(latestStatus) + 1;
  };

  const currentStep = getCurrentStep();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">📦 Track Your Parcel</h2>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex items-center gap-2 mb-8">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Enter your Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      {isLoading && <p className="text-center text-gray-500">Loading...</p>}
      {isError && <p className="text-center text-error">Failed to load tracking data.</p>}

      {/* If data exists */}
      {data && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Tracking ID: {data.tracking_id}</h3>

          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-8">
            {STATUS_ORDER.map((status, idx) => (
              <div key={status} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    idx + 1 <= currentStep
                      ? STATUS_COLORS[status]
                      : "bg-gray-300"
                  }`}
                >
                  {idx + 1 < currentStep ? (
                    <CheckCircleIcon className="w-5 h-5 text-white" />
                  ) : idx + 1 === currentStep ? (
                    <ClockIcon className="w-5 h-5 text-white" />
                  ) : (
                    <span className="text-xs font-bold text-white">{idx + 1}</span>
                  )}
                </div>
                <span className="text-xs mt-2 text-center">{STATUS_LABELS[status]}</span>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="border-l-2 border-gray-200 ml-4">
            {data.logs.map((log, idx) => (
              <div key={idx} className="mb-6 ml-4 relative">
                <span
                  className={`absolute -left-[22px] w-4 h-4 rounded-full ${
                    STATUS_COLORS[log.status] || "bg-gray-400"
                  }`}
                ></span>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  <span className="capitalize font-bold">{log.status}</span>
                </div>
                <p className="text-sm text-gray-600">{log.details}</p>
                <p className="text-xs text-gray-400">
                  {new Date(log.date).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isLoading && !isError && searchId && !data && (
        <div className="alert alert-warning mt-4 flex items-center gap-2">
          <ExclamationTriangleIcon className="w-5 h-5" />
          <span>Tracking information not found.</span>
        </div>
      )}
    </div>
  );
};

export default Tracking;
