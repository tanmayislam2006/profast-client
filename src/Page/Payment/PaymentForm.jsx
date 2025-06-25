// CheckoutForm.jsx
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

const PaymentForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);
    setError("");
    setSuccess("");

    // Step 1: Call your backend to create a payment intent
    const { data } = await axios.post("http://localhost:5000/create-payment-intent", {
      amount, // amount in cents or paisa (e.g., 500 = $5 or ৳5)
    });

    const clientSecret = data.clientSecret;

    // Step 2: Confirm payment using Stripe
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "Customer Name", // optionally dynamic
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        setSuccess("🎉 Payment successful!");
      }
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-4/5 mx-auto p-4 border rounded shadow flex flex-col gap-10 justify-center">
      <CardElement />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        disabled={!stripe || processing}
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-600 mt-2">{success}</p>}
    </form>
  );
};

export default PaymentForm;
