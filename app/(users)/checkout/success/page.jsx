"use client";
import React, { use } from "react";

function Page({ searchParams }) {
  const { orderId } = use(searchParams);
  return <div>Payment Successful! Order ID: {orderId}</div>;
}

export default Page;
