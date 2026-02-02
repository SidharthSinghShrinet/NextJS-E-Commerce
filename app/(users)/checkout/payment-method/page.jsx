"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentMethodPage({ searchParams }) {
  const { orderId } = use(searchParams);
  const router = useRouter();

  const [method, setMethod] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!method) return;

    setLoading(true);

    if (method === "cod") {
      // COD → confirm order directly
      const res = await fetch("/api/orders/confirm-cod", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      const data = await res.json();
      if (data.success) {
        router.push(`/checkout/success?orderId=${orderId}`);
      }
    }

    if (method === "online") {
      router.push(`/checkout/payment?orderId=${orderId}`);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md">
      <h1 className="mb-4 text-xl font-semibold">Choose Payment Method</h1>

      {/* COD */}
      <div
        onClick={() => setMethod("cod")}
        className={`mb-3 cursor-pointer rounded-lg border p-4 transition ${method === "cod" ? "border-black bg-gray-50" : "border-gray-200"} `}
      >
        <h2 className="font-medium">Cash on Delivery</h2>
        <p className="text-sm text-gray-600">
          Pay when the product is delivered to your doorstep
        </p>
      </div>

      {/* Online */}
      <div
        onClick={() => setMethod("online")}
        className={`cursor-pointer rounded-lg border p-4 transition ${method === "online" ? "border-black bg-gray-50" : "border-gray-200"} `}
      >
        <h2 className="font-medium">Online Payment</h2>
        <p className="text-sm text-gray-600">
          Pay securely using UPI, Cards, Wallets, NetBanking
        </p>
      </div>

      <button
        disabled={!method || loading}
        onClick={handleContinue}
        className="mt-6 w-full rounded-lg bg-black py-3 text-white disabled:opacity-50"
      >
        {loading ? "Processing..." : "Continue"}
      </button>
    </div>
  );
}
