"use client";
import Image from "next/image";
import React, { use, useEffect } from "react";
import success from "@/public/success1.gif";
import { GiShoppingBag } from "react-icons/gi";
import { FaTruck } from "react-icons/fa";
import { useRouter } from "next/navigation";

function Page({ searchParams }) {
  const router = useRouter();
  const { orderId } = use(searchParams);
  const [orderDetails, setOrderDetails] = React.useState(null);
  useEffect(() => {
    if (!orderId) {
      return;
    }
    async function getOrderDetails() {
      const response = await fetch("/api/orders/findorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      });
      console.log("response", response);
      const orderData = await response.json();
      console.log("orderData", orderData);
      if (!orderData.success) {
        return;
      }
      setOrderDetails(orderData.data);
    }
    getOrderDetails();
  }, [orderId]);
  console.log(orderDetails);
  return (
    <div className="flex h-[90vh] w-full items-center justify-center">
      <div className="h-[90%] w-[60%] rounded-2xl bg-blue-100 shadow-2xl shadow-neutral-300">
        <div className="relative h-[58%] w-full">
          <Image
            src={success}
            alt="success"
            unoptimized
            fill={true}
            sizes="100%"
            className="absolute h-full w-full rounded-t-2xl object-cover"
          />
        </div>
        <div className="flex flex-col gap-3 p-2">
          <span className="text-xl font-bold">
            Thanks for shopping with us!
          </span>
          <div className="flex justify-between">
            <div className="flex-col">
              <span className="font-bold">Order Details</span>
              <div className="flex flex-col text-gray-700">
                <span>
                  <span className="font-semibold">Order ID:</span>{" "}
                  {orderDetails?._id}
                </span>
                <span>
                  <span className="font-semibold">Order Date:</span>{" "}
                  {new Date(orderDetails?.createdAt).toLocaleString()}
                </span>
                <span>
                  <span className="font-semibold">Order Status:</span>{" "}
                  {orderDetails?.orderStatus}
                </span>
                <span>
                  <span className="font-semibold">Payment Provider:</span>{" "}
                  {String(orderDetails?.paymentProvider).toUpperCase()}
                </span>
              </div>
            </div>
            <div className="flex-col">
              <span className="font-bold">Delivery Details</span>
              <div className="flex flex-col text-gray-600">
                <span>
                  {orderDetails?.shippingAddress?.name} (
                  {orderDetails?.shippingAddress?.phone})
                </span>
                <span>
                  {orderDetails?.shippingAddress?.address},{" "}
                  {orderDetails?.shippingAddress?.city},{" "}
                  {orderDetails?.shippingAddress?.state}, India -{" "}
                  {orderDetails?.shippingAddress?.pincode}
                </span>
                <span>
                  <span className="font-semibold">Expected Delivery:</span>{" "}
                  {orderDetails?.items[0]?.expectedDelivery ||
                    "Free Delivery within 3-4 business days"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              onClick={() => router.push(`/orders`)}
              className="flex items-center gap-1.5 rounded-xl bg-blue-500 px-6 py-4"
            >
              <FaTruck size={22} color="white" />
              <button className="text-lg font-semibold text-white">
                View Order
              </button>
            </div>
            <div
              onClick={() => router.push("/products")}
              className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-pink-600 px-6 py-4"
            >
              <GiShoppingBag size={22} color="white" />
              <button className="text-xl font-semibold text-white">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
