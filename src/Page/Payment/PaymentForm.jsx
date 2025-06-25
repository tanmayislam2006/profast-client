// PaymentForm.jsx
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useState } from "react";
import useProfastAuth from "../../Hook/useProfastAuth";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const { firebaseUser } = useProfastAuth();
  const navigate = useNavigate();
  const stripe = useStripe(); // Stripe instance for interacting with Stripe APIs
  const elements = useElements(); // Element instance to access CardElement
  const axiosSecure = useAxiosSecure(); // Custom hook for secure Axios with JWT

  const { id } = useParams(); // Get parcel ID from URL

  // Fetch the parcel information for which the user is paying
  const { data: parcelInfo = {} } = useQuery({
    queryKey: ["parcel", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${id}`);
      return res.data;
    },
  });

  // State for error/success messages and loading status
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);

  // Convert cost to cents or paisa format for Stripe
  const amountInCents = parseInt(parcelInfo?.cost * 100); // Ensure integer

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js has not yet loaded
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setError("Card element not found");
      return;
    }

    setProcessing(true);

    // Step 1: Create payment method
    const { error: methodError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (methodError) {
      setError(methodError.message);
      setProcessing(false);
      return;
    } else {
      setError(""); // Clear any previous error
    }

    // Step 2: Get clientSecret from backend (creates PaymentIntent)
    const { data } = await axiosSecure.post("/create-payment-intent", {
      amount: amountInCents, // Amount in cents/paisa
    });

    const clientSecret = data.clientSecret;

    // Step 3: Confirm card payment with Stripe
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: `${firebaseUser?.displayName || "Customer Name"}`,
          email: firebaseUser?.email || "customer@example.com",
        },
      },
    });
    if (result.error) {
      setProcessing(false);
      setError(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      setSuccess("🎉 Payment successful!");
      Swal.fire({
        title: "Payment Successful",
        text: `Your payment of ${parcelInfo?.cost} was successful!`,
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        // Redirect to another page or perform any action after success
        navigate("/dashboard/myParcels");
      });
      setError("");
    }

    setProcessing(false);
  };

  return (
    <div className="w-4/5 mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-primary">
        Pay for Parcel
      </h2>
      <form
        onSubmit={handleSubmit}
        className="w-full space-y-10 p-4 border rounded shadow flex flex-col gap-4 bg-white my-10"
      >
        <CardElement />
        <button
          type="submit"
          className="btn btn-primary w-full mx-auto"
          disabled={!stripe || processing}
        >
          {processing ? "Processing..." : `Pay ${parcelInfo?.cost || 0}`}
        </button>

        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        {success && <p className="text-green-600 mt-2 text-sm">{success}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
