// "use client";
// import Image from "next/image";
// import React, { use, useEffect } from "react";
// import success from "@/public/success1.gif";
// import { GiShoppingBag } from "react-icons/gi";
// import { FaTruck } from "react-icons/fa";
// import { useRouter } from "next/navigation";

// function Page({ searchParams }) {
//   const router = useRouter();
//   const { orderId } = use(searchParams);
//   const [orderDetails, setOrderDetails] = React.useState(null);
//   useEffect(() => {
//     if (!orderId) {
//       return;
//     }
//     async function getOrderDetails() {
//       const response = await fetch("/api/orders/findorder", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ orderId }),
//       });
//       console.log("response", response);
//       const orderData = await response.json();
//       console.log("orderData", orderData);
//       if (!orderData.success) {
//         return;
//       }
//       setOrderDetails(orderData.data);
//     }
//     getOrderDetails();
//   }, [orderId]);
//   console.log(orderDetails);
//   return (
//     <div className="flex h-[90vh] w-full items-center justify-center">
//       <div className="h-[90%] w-[60%] rounded-2xl bg-blue-100 shadow-2xl shadow-neutral-300">
//         <div className="relative h-[58%] w-full">
//           <Image
//             src={success}
//             alt="success"
//             unoptimized
//             fill={true}
//             sizes="100%"
//             className="absolute h-full w-full rounded-t-2xl object-cover"
//           />
//         </div>
//         <div className="flex flex-col gap-3 p-2">
//           <span className="text-xl font-bold">
//             Thanks for shopping with us!
//           </span>
//           <div className="flex justify-between">
//             <div className="flex-col">
//               <span className="font-bold">Order Details</span>
//               <div className="flex flex-col text-gray-700">
//                 <span>
//                   <span className="font-semibold">Order ID:</span>{" "}
//                   {orderDetails?._id}
//                 </span>
//                 <span>
//                   <span className="font-semibold">Order Date:</span>{" "}
//                   {new Date(orderDetails?.createdAt).toLocaleString()}
//                 </span>
//                 <span>
//                   <span className="font-semibold">Order Status:</span>{" "}
//                   {orderDetails?.orderStatus}
//                 </span>
//                 <span>
//                   <span className="font-semibold">Payment Provider:</span>{" "}
//                   {String(orderDetails?.paymentProvider).toUpperCase()}
//                 </span>
//               </div>
//             </div>
//             <div className="flex-col">
//               <span className="font-bold">Delivery Details</span>
//               <div className="flex flex-col text-gray-600">
//                 <span>
//                   {orderDetails?.shippingAddress?.name} (
//                   {orderDetails?.shippingAddress?.phone})
//                 </span>
//                 <span>
//                   {orderDetails?.shippingAddress?.address},{" "}
//                   {orderDetails?.shippingAddress?.city},{" "}
//                   {orderDetails?.shippingAddress?.state}, India -{" "}
//                   {orderDetails?.shippingAddress?.pincode}
//                 </span>
//                 <span>
//                   <span className="font-semibold">Expected Delivery:</span>{" "}
//                   {orderDetails?.items[0]?.expectedDelivery ||
//                     "Free Delivery within 3-4 business days"}
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center gap-1.5">
//             <div
//               onClick={() => router.push(`/orders`)}
//               className="flex items-center gap-1.5 rounded-xl bg-blue-500 px-6 py-4"
//             >
//               <FaTruck size={22} color="white" />
//               <button className="text-lg font-semibold text-white">
//                 View Order
//               </button>
//             </div>
//             <div
//               onClick={() => router.push("/products")}
//               className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-pink-600 px-6 py-4"
//             >
//               <GiShoppingBag size={22} color="white" />
//               <button className="text-xl font-semibold text-white">
//                 Continue Shopping
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Page;

// "use client";

// import Image from "next/image";
// import React, { use, useEffect } from "react";
// import success from "@/public/success1.gif";
// import { GiShoppingBag } from "react-icons/gi";
// import { FaTruck, FaCheckCircle } from "react-icons/fa";
// import { MdVerified } from "react-icons/md";
// import { useRouter } from "next/navigation";

// function Page({ searchParams }) {
//   const router = useRouter();
//   const { orderId } = use(searchParams);

//   const [orderDetails, setOrderDetails] = React.useState(null);

//   useEffect(() => {
//     if (!orderId) return;

//     async function getOrderDetails() {
//       const response = await fetch("/api/orders/findorder", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ orderId }),
//       });

//       const orderData = await response.json();

//       if (!orderData.success) return;

//       setOrderDetails(orderData.data);
//     }

//     getOrderDetails();
//   }, [orderId]);

//   return (
//     <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-4 py-10">
//       {/* Background Glow */}
//       <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
//       <div className="absolute right-10 bottom-10 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" />

//       <div className="relative w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
//         {/* TOP SECTION */}
//         <div className="relative flex flex-col items-center justify-center border-b border-white/10 bg-gradient-to-r from-blue-600/20 to-pink-600/20 px-6 py-10">
//           <div className="absolute inset-0 bg-black/10" />

//           <div className="relative z-10 flex flex-col items-center">
//             <div className="relative h-40 w-40">
//               <Image
//                 src={success}
//                 alt="success"
//                 fill
//                 unoptimized
//                 className="object-contain"
//               />
//             </div>

//             <div className="mt-4 flex items-center gap-2 rounded-full border border-green-400/30 bg-green-500/10 px-4 py-2 text-green-300 backdrop-blur-md">
//               <FaCheckCircle />
//               <span className="text-sm font-semibold">Payment Successful</span>
//             </div>

//             <h1 className="mt-5 text-center text-4xl font-extrabold tracking-tight text-white">
//               Order Confirmed 🎉
//             </h1>

//             <p className="mt-3 max-w-xl text-center text-sm leading-relaxed text-gray-300 md:text-base">
//               Thank you for shopping with us. Your order has been placed
//               successfully and is now being processed.
//             </p>
//           </div>
//         </div>

//         {/* CONTENT */}
//         <div className="grid gap-6 p-6 md:grid-cols-2 md:p-8">
//           {/* ORDER DETAILS */}
//           <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
//             <div className="mb-5 flex items-center gap-2">
//               <MdVerified className="text-2xl text-blue-400" />
//               <h2 className="text-2xl font-bold text-white">Order Details</h2>
//             </div>

//             <div className="space-y-4 text-sm">
//               <div className="rounded-2xl bg-white/5 p-4">
//                 <p className="text-gray-400">Order ID</p>
//                 <p className="mt-1 font-semibold break-all text-white">
//                   {orderDetails?._id}
//                 </p>
//               </div>

//               <div className="rounded-2xl bg-white/5 p-4">
//                 <p className="text-gray-400">Order Date</p>
//                 <p className="mt-1 font-semibold text-white">
//                   {orderDetails?.createdAt
//                     ? new Date(orderDetails.createdAt).toLocaleString()
//                     : "--"}
//                 </p>
//               </div>

//               <div className="rounded-2xl bg-white/5 p-4">
//                 <p className="text-gray-400">Order Status</p>
//                 <div className="mt-2 inline-flex rounded-full bg-green-500/20 px-3 py-1 text-sm font-semibold text-green-300">
//                   {orderDetails?.orderStatus}
//                 </div>
//               </div>

//               <div className="rounded-2xl bg-white/5 p-4">
//                 <p className="text-gray-400">Payment Provider</p>
//                 <p className="mt-1 font-semibold text-white uppercase">
//                   {orderDetails?.paymentProvider}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* DELIVERY DETAILS */}
//           <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
//             <div className="mb-5 flex items-center gap-2">
//               <FaTruck className="text-2xl text-pink-400" />
//               <h2 className="text-2xl font-bold text-white">
//                 Delivery Details
//               </h2>
//             </div>

//             <div className="space-y-4 text-sm">
//               <div className="rounded-2xl bg-white/5 p-4">
//                 <p className="text-gray-400">Customer</p>
//                 <p className="mt-1 font-semibold text-white">
//                   {orderDetails?.shippingAddress?.name}
//                 </p>
//                 <p className="text-gray-300">
//                   {orderDetails?.shippingAddress?.phone}
//                 </p>
//               </div>

//               <div className="rounded-2xl bg-white/5 p-4">
//                 <p className="text-gray-400">Shipping Address</p>
//                 <p className="mt-1 leading-relaxed text-white">
//                   {orderDetails?.shippingAddress?.address},{" "}
//                   {orderDetails?.shippingAddress?.city},{" "}
//                   {orderDetails?.shippingAddress?.state}, India -{" "}
//                   {orderDetails?.shippingAddress?.pincode}
//                 </p>
//               </div>

//               <div className="rounded-2xl bg-white/5 p-4">
//                 <p className="text-gray-400">Expected Delivery</p>
//                 <p className="mt-1 font-semibold text-green-300">
//                   {orderDetails?.items?.[0]?.expectedDelivery ||
//                     "Free Delivery within 3-4 business days"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* BUTTONS */}
//         <div className="flex flex-col gap-4 px-6 pb-8 md:flex-row md:px-8">
//           <button
//             onClick={() => router.push("/orders")}
//             className="group flex flex-1 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-500/40"
//           >
//             <FaTruck
//               size={22}
//               className="transition-transform duration-300 group-hover:translate-x-1"
//             />
//             View Orders
//           </button>

//           <button
//             onClick={() => router.push("/products")}
//             className="group flex flex-1 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-pink-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-pink-500/40"
//           >
//             <GiShoppingBag
//               size={22}
//               className="transition-transform duration-300 group-hover:rotate-6"
//             />
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Page;

// "use client";

// import Image from "next/image";
// import React, { use, useEffect } from "react";
// import success from "@/public/success1.gif";
// import { GiShoppingBag } from "react-icons/gi";
// import { FaTruck, FaCheckCircle } from "react-icons/fa";
// import { MdVerified } from "react-icons/md";
// import { useRouter } from "next/navigation";

// function Page({ searchParams }) {
//   const router = useRouter();
//   const { orderId } = use(searchParams);

//   const [orderDetails, setOrderDetails] = React.useState(null);

//   useEffect(() => {
//     if (!orderId) return;

//     async function getOrderDetails() {
//       const response = await fetch("/api/orders/findorder", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ orderId }),
//       });

//       const orderData = await response.json();

//       if (!orderData.success) return;

//       setOrderDetails(orderData.data);
//     }

//     getOrderDetails();
//   }, [orderId]);

//   return (
//     <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-pink-50 px-4 py-10">
//       {/* Background Blur Effects */}
//       <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
//       <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-pink-200/40 blur-3xl" />

//       <div className="relative w-full max-w-5xl overflow-hidden rounded-[32px] border border-white bg-white/80 shadow-[0_15px_60px_rgba(0,0,0,0.08)] backdrop-blur-2xl">
//         {/* TOP SECTION */}
//         <div className="relative flex flex-col items-center justify-center border-b border-gray-100 bg-gradient-to-r from-blue-100 to-pink-100 px-6 py-10">
//           <div className="relative z-10 flex flex-col items-center">
//             <div className="relative h-40 w-40">
//               <Image
//                 src={success}
//                 alt="success"
//                 fill
//                 unoptimized
//                 className="object-contain"
//               />
//             </div>

//             <div className="mt-4 flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-700 shadow-sm">
//               <FaCheckCircle />
//               <span className="text-sm font-semibold">Payment Successful</span>
//             </div>

//             <h1 className="mt-5 text-center text-4xl font-extrabold tracking-tight text-gray-800">
//               Order Confirmed 🎉
//             </h1>

//             <p className="mt-3 max-w-xl text-center text-sm leading-relaxed text-gray-600 md:text-base">
//               Thank you for shopping with us. Your order has been placed
//               successfully and is now being processed.
//             </p>
//           </div>
//         </div>

//         {/* CONTENT */}
//         <div className="grid gap-6 p-6 md:grid-cols-2 md:p-8">
//           {/* ORDER DETAILS */}
//           <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
//             <div className="mb-5 flex items-center gap-2">
//               <MdVerified className="text-2xl text-blue-500" />
//               <h2 className="text-2xl font-bold text-gray-800">
//                 Order Details
//               </h2>
//             </div>

//             <div className="space-y-4 text-sm">
//               <div className="rounded-2xl bg-blue-50 p-4">
//                 <p className="text-gray-500">Order ID</p>
//                 <p className="mt-1 font-semibold break-all text-gray-800">
//                   {orderDetails?._id}
//                 </p>
//               </div>

//               <div className="rounded-2xl bg-blue-50 p-4">
//                 <p className="text-gray-500">Order Date</p>
//                 <p className="mt-1 font-semibold text-gray-800">
//                   {orderDetails?.createdAt
//                     ? new Date(orderDetails.createdAt).toLocaleString()
//                     : "--"}
//                 </p>
//               </div>

//               <div className="rounded-2xl bg-blue-50 p-4">
//                 <p className="text-gray-500">Order Status</p>
//                 <div className="mt-2 inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
//                   {orderDetails?.orderStatus}
//                 </div>
//               </div>

//               <div className="rounded-2xl bg-blue-50 p-4">
//                 <p className="text-gray-500">Payment Provider</p>
//                 <p className="mt-1 font-semibold text-gray-800 uppercase">
//                   {orderDetails?.paymentProvider}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* DELIVERY DETAILS */}
//           <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
//             <div className="mb-5 flex items-center gap-2">
//               <FaTruck className="text-2xl text-pink-500" />
//               <h2 className="text-2xl font-bold text-gray-800">
//                 Delivery Details
//               </h2>
//             </div>

//             <div className="space-y-4 text-sm">
//               <div className="rounded-2xl bg-pink-50 p-4">
//                 <p className="text-gray-500">Customer</p>
//                 <p className="mt-1 font-semibold text-gray-800">
//                   {orderDetails?.shippingAddress?.name}
//                 </p>
//                 <p className="text-gray-600">
//                   {orderDetails?.shippingAddress?.phone}
//                 </p>
//               </div>

//               <div className="rounded-2xl bg-pink-50 p-4">
//                 <p className="text-gray-500">Shipping Address</p>
//                 <p className="mt-1 leading-relaxed text-gray-800">
//                   {orderDetails?.shippingAddress?.address},{" "}
//                   {orderDetails?.shippingAddress?.city},{" "}
//                   {orderDetails?.shippingAddress?.state}, India -{" "}
//                   {orderDetails?.shippingAddress?.pincode}
//                 </p>
//               </div>

//               <div className="rounded-2xl bg-pink-50 p-4">
//                 <p className="text-gray-500">Expected Delivery</p>
//                 <p className="mt-1 font-semibold text-green-700">
//                   {orderDetails?.items?.[0]?.expectedDelivery ||
//                     "Free Delivery within 3-4 business days"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* BUTTONS */}
//         <div className="flex flex-col gap-4 px-6 pb-8 md:flex-row md:px-8">
//           <button
//             onClick={() => router.push("/orders")}
//             className="group flex flex-1 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02]"
//           >
//             <FaTruck
//               size={22}
//               className="transition-transform duration-300 group-hover:translate-x-1"
//             />
//             View Orders
//           </button>

//           <button
//             onClick={() => router.push("/products")}
//             className="group flex flex-1 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02]"
//           >
//             <GiShoppingBag
//               size={22}
//               className="transition-transform duration-300 group-hover:rotate-6"
//             />
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Page;

"use client";

import Image from "next/image";
import React, { use, useEffect } from "react";
import success from "@/public/success1.gif";
import { GiShoppingBag } from "react-icons/gi";
import { FaTruck, FaCheckCircle } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { useRouter } from "next/navigation";

function Page({ searchParams }) {
  const router = useRouter();
  const { orderId } = use(searchParams);

  const [orderDetails, setOrderDetails] = React.useState(null);

  useEffect(() => {
    if (!orderId) return;

    async function getOrderDetails() {
      const response = await fetch("/api/orders/findorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      });

      const orderData = await response.json();

      if (!orderData.success) return;

      setOrderDetails(orderData.data);
    }

    getOrderDetails();
  }, [orderId]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#f8fbff] via-[#ffffff] to-[#eef7ff] px-4 py-10">
      {/* Background Glow */}
      <div className="absolute top-[-80px] left-[-80px] h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute right-[-100px] bottom-[-100px] h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl" />

      <div className="relative w-full max-w-6xl overflow-hidden rounded-[36px] border border-gray-200 bg-white shadow-[0_20px_70px_rgba(0,0,0,0.08)]">
        {/* TOP SECTION */}
        <div className="relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-r from-blue-50 via-white to-cyan-50 px-6 py-12">
          {/* Decorative Blur */}
          <div className="absolute top-0 h-full w-full bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_55%)]" />

          {/* GIF CONTAINER */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative flex h-52 w-52 items-center justify-center rounded-full bg-white shadow-[0_10px_50px_rgba(59,130,246,0.18)]">
              {/* outer glow */}
              <div className="absolute h-[115%] w-[115%] animate-pulse rounded-full bg-blue-100 blur-2xl" />

              {/* gif */}
              <div className="relative z-10 h-44 w-44 overflow-hidden rounded-full border-4 border-blue-100 bg-white">
                <Image
                  src={success}
                  alt="success"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            </div>

            {/* Success Badge */}
            <div className="mt-6 flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-5 py-2 text-green-700 shadow-sm">
              <FaCheckCircle />
              <span className="text-sm font-semibold tracking-wide">
                PAYMENT SUCCESSFUL
              </span>
            </div>

            {/* Heading */}
            <h1 className="mt-6 text-center text-4xl font-extrabold tracking-tight text-gray-800 md:text-5xl">
              Order Confirmed 🎉
            </h1>

            <p className="mt-4 max-w-2xl text-center text-sm leading-relaxed text-gray-600 md:text-base">
              Thank you for shopping with us. Your order has been placed
              successfully and is currently being processed for shipment.
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="grid gap-6 p-6 md:grid-cols-2 md:p-10">
          {/* ORDER DETAILS */}
          <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500 text-white shadow-lg">
                <MdVerified size={24} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Order Details
                </h2>
                <p className="text-sm text-gray-500">Your order information</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="mt-1 font-semibold break-all text-gray-800">
                  {orderDetails?._id}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-sm text-gray-500">Order Date</p>
                <p className="mt-1 font-semibold text-gray-800">
                  {orderDetails?.createdAt
                    ? new Date(orderDetails.createdAt).toLocaleString()
                    : "--"}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-sm text-gray-500">Order Status</p>

                <div className="mt-2 inline-flex rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-700">
                  {orderDetails?.orderStatus}
                </div>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-sm text-gray-500">Payment Provider</p>
                <p className="mt-1 font-semibold text-gray-800 uppercase">
                  {orderDetails?.paymentProvider}
                </p>
              </div>
            </div>
          </div>

          {/* DELIVERY DETAILS */}
          <div className="rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500 text-white shadow-lg">
                <FaTruck size={22} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Delivery Details
                </h2>
                <p className="text-sm text-gray-500">
                  Shipping & delivery info
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-sm text-gray-500">Customer</p>

                <p className="mt-1 font-semibold text-gray-800">
                  {orderDetails?.shippingAddress?.name}
                </p>

                <p className="text-gray-600">
                  {orderDetails?.shippingAddress?.phone}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-sm text-gray-500">Shipping Address</p>

                <p className="mt-1 leading-relaxed text-gray-800">
                  {orderDetails?.shippingAddress?.address},{" "}
                  {orderDetails?.shippingAddress?.city},{" "}
                  {orderDetails?.shippingAddress?.state}, India -{" "}
                  {orderDetails?.shippingAddress?.pincode}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-sm text-gray-500">Expected Delivery</p>

                <p className="mt-1 font-semibold text-green-700">
                  {orderDetails?.items?.[0]?.expectedDelivery ||
                    "Free Delivery within 3-4 business days"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col gap-4 px-6 pb-10 md:flex-row md:px-10">
          <button
            onClick={() => router.push("/orders")}
            className="group flex flex-1 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <FaTruck
              size={22}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
            View Orders
          </button>

          <button
            onClick={() => router.push("/products")}
            className="group flex flex-1 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-pink-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <GiShoppingBag
              size={22}
              className="transition-transform duration-300 group-hover:rotate-6"
            />
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
