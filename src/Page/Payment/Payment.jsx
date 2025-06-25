import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./PaymentForm";
const stripePromise = loadStripe("pk_test_51Rdq18QBkSPDsVlVWkWzFmKjzRlJKe8QnMKaLwuZJml2hCqSC6htC8Ib9mJPblx8MRK6bSkVBPzruqc78aOA8NTW00DbL6ntfJ");

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default Payment;
