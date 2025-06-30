import React, { useState } from "react";
import useProfastAuth from "../../../Hook/useProfastAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaInfoCircle, FaTimes } from "react-icons/fa";

const MyPayment = () => {
  const { firebaseUser } = useProfastAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const { data: myPayments = [], isLoading } = useQuery({
    queryKey: ["myPayments", firebaseUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/myPayments?email=${firebaseUser?.email}`,
        { withCredentials: true }
      );
      return res.data;
    },
    enabled: !!firebaseUser?.email,
  });

  if (isLoading)
    return <div className="text-center py-10">Loading payments...</div>;

  return (
    <div className="overflow-x-auto w-full px-2 md:px-0">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">
        My Payments
      </h2>
      {/* Details Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fadeIn">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold"
              onClick={() => setSelectedPayment(null)}
              aria-label="Close"
            >
              <FaTimes />
            </button>
            <h3 className="text-2xl font-bold text-primary mb-4 text-center">
              Payment Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
              <div>
                <div className="mb-2">
                  <span className="font-semibold">Tracking ID:</span>{" "}
                  <span className="font-mono">
                    {selectedPayment.traking_id}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Payment ID:</span>{" "}
                  <span className="font-mono">{selectedPayment._id}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Amount:</span>{" "}
                  <span className="text-green-700 font-bold">
                    ৳{selectedPayment.amount}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(selectedPayment.date).toLocaleString()}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Status:</span>{" "}
                  <span className="font-bold text-green-700">
                    {selectedPayment.status}
                  </span>
                </div>
              </div>
              <div>
                <div className="mb-2">
                  <span className="font-semibold">Email:</span>{" "}
                  {selectedPayment.email}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Parcel ID:</span>{" "}
                  <span className="font-mono">{selectedPayment.parcelId}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Payment Method:</span>{" "}
                  {selectedPayment.paymentMethod}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Transaction ID:</span>{" "}
                  <span className="font-mono">
                    {selectedPayment.transactionId}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-6 justify-center">
              <button
                className="btn btn-primary px-6 py-2 rounded-lg text-white"
                onClick={() => setSelectedPayment(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <table className="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
        <thead className="bg-blue-100 text-gray-700">
          <tr>
            <th className="py-3 px-2 md:px-4 text-left">Tracking ID</th>
            <th className="py-3 px-2 md:px-4 text-left">Payment ID</th>
            <th className="py-3 px-2 md:px-4 text-left">Amount</th>
            <th className="py-3 px-2 md:px-4 text-left">Date</th>
            <th className="py-3 px-2 md:px-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {myPayments.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-8 text-gray-400">
                No payments found.
              </td>
            </tr>
          )}
          {myPayments.map((payment) => (
            <tr
              key={payment._id}
              className="border-b hover:bg-blue-50 transition"
            >
              <td className="py-2 px-2 md:px-4 font-mono text-xs md:text-sm">
                {payment.traking_id}
              </td>
              <td className="py-2 px-2 md:px-4 font-mono text-xs md:text-sm">
                {payment._id}
              </td>
              <td className="py-2 px-2 md:px-4 font-semibold text-green-700">
                ৳{payment.amount}
              </td>
              <td className="py-2 px-2 md:px-4">
                {new Date(payment.date).toLocaleString()}
              </td>
              <td className="py-2 px-2 md:px-4 text-center">
                <button
                  title="View Details"
                  className="p-2 rounded hover:bg-blue-100 text-blue-600"
                  onClick={() => setSelectedPayment(payment)}
                >
                  <FaInfoCircle size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyPayment;
