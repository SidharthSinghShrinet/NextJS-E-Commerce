"use client";

import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";

export default function CheckoutForm({ order }) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayNow = async () => {
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/payment/result`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto min-w-xl">
      {/* Order summary */}
      <h2 className="mb-2 text-lg font-semibold">
        Pay ₹{(order.totalAmountInPaise / 100).toFixed(2)}
      </h2>

      {/* Stripe UI */}
      <PaymentElement />

      {error && <p className="mt-2 text-red-500">{error}</p>}

      <button
        onClick={handlePayNow}
        disabled={!stripe || loading}
        className="mt-4 w-full rounded bg-black py-2 text-white"
      >
        {loading ? "Processing…" : "Pay Now"}
      </button>
    </div>
  );
}
