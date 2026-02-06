"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// import { CheckCircle, XCircle, Loader2 } from "lucide-react";
// import { useSearchParams, useRouter } from "next/navigation";

// export default function PaymentResultPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const status = searchParams.get("redirect_status");
//   const paymentIntent = searchParams.get("payment_intent");

//   const isSuccess = status === "succeeded";

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4 text-white">
//       <div className="animate-fadeIn w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-xl">
//         {/* ICON */}
//         <div className="mb-6 flex justify-center">
//           {isSuccess ? (
//             <CheckCircle className="animate-pop h-20 w-20 text-green-400" />
//           ) : (
//             <XCircle className="animate-pop h-20 w-20 text-red-400" />
//           )}
//         </div>

//         {/* TITLE */}
//         <h1 className="mb-2 text-2xl font-bold">
//           {isSuccess ? "Payment Successful" : "Payment Failed"}
//         </h1>

//         {/* DESCRIPTION */}
//         <p className="mb-6 text-gray-300">
//           {isSuccess
//             ? "Thank you for your purchase. Your order has been placed successfully."
//             : "Your payment could not be completed. Please try again."}
//         </p>

//         {/* PAYMENT INFO */}
//         {paymentIntent && (
//           <div className="mb-6 rounded-lg bg-black/40 p-4 text-sm text-gray-300">
//             <p className="mb-1">Payment ID</p>
//             <p className="font-mono text-xs break-all text-gray-400">
//               {paymentIntent}
//             </p>
//           </div>
//         )}

//         {/* ACTION BUTTONS */}
//         <div className="flex gap-4">
//           {isSuccess ? (
//             <>
//               <button
//                 onClick={() => router.push("/orders")}
//                 className="flex-1 rounded-xl bg-green-500 py-3 font-semibold text-black transition hover:bg-green-600"
//               >
//                 View Orders
//               </button>
//               <button
//                 onClick={() => router.push("/")}
//                 className="flex-1 rounded-xl border border-white/20 py-3 transition hover:bg-white/10"
//               >
//                 Continue Shopping
//               </button>
//             </>
//           ) : (
//             <button
//               onClick={() => router.push("/checkout")}
//               className="w-full rounded-xl bg-red-500 py-3 font-semibold text-black transition hover:bg-red-600"
//             >
//               Retry Payment
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

export default function PaymentResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState(null);
  useEffect(() => {
    const paymentIntentId = searchParams.get("payment_intent");
    console.log("Payment intent ID:", paymentIntentId);
    async function verifyPayment() {
      try {
        if (!paymentIntentId) {
          setError("Missing payment intent ID");
          return;
        }
        const response = await fetch("/api/payment/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paymentIntentId }),
        });
        const data = await response.json();
        if (!data.success) {
          setError(data.message || "Payment verification failed");
          return;
        }
        router.replace(`/checkout/success?orderId=${data?.data?.orderId}`);
      } catch (error) {
        setError("Payment verification failed");
      }
    }
    verifyPayment();
  }, [searchParams, router]);

  if (error) {
    return <span className="text-red-500">{error}</span>;
  }
  return (
    <div className="flex h-[70vh] w-full items-center justify-center">
      <span className="text-2xl font-semibold">
        Verifying payment, please wait...
      </span>
    </div>
  );
}
