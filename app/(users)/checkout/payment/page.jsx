"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { use, useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import OrderPricing from "@/components/OrderPricing";
import Loading from "@/app/Loading.jsx";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);
function Page(props) {
  const { orderId } = use(props.searchParams);
  const [order, setOrder] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!orderId) {
      return;
    }
    async function getOrderDetails() {
      const response = await fetch(`/api/orders/findorder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      });
      const orderData = await response.json();
      // console.log(orderData);
      if (!orderData.success) {
        setLoading(false);
        return;
      }
      setOrder(orderData.data);
      const intentRes = await fetch("/api/payment/create-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      });
      const intentData = await intentRes.json();
      setClientSecret(intentData?.data?.clientSecret);
      setLoading(false);
    }
    getOrderDetails();
  }, [orderId]);

  if (loading) {
    return <Loading />;
  }
  if (!order || !clientSecret) {
    return <div>Unable to start payment</div>;
  }
  return (
    <div className="flex items-start justify-center gap-5">
      <div className="flex items-center justify-center p-5 shadow-xl">
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: "flat",
              variables: {
                colorPrimary: "#000000",
                colorBackground: "#ffffff",
                colorText: "#1a1a1a",
                colorDanger: "#df1b41",
                fontFamily: "Inter, system-ui, sans-serif",
                spacingUnit: "4px",
                borderRadius: "8px",
              },
              rules: {
                ".Input": {
                  padding: "12px",
                  border: "1px solid #e5e7eb",
                },
                ".Label": {
                  fontSize: "14px",
                  fontWeight: "500",
                },
              },
            },
          }}
        >
          <CheckoutForm order={order} />
        </Elements>
      </div>
      <div className="flex">
        <OrderPricing order={order} />
      </div>
    </div>
  );
}

export default Page;
