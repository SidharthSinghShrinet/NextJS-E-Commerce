import Link from "next/link";
import React from "react";
function AddressPricing({ cart = [] }) {
  const PLATFORM_FEE = 23;
  const COUPON_DISCOUNT = 92;
  const Total_MRP = cart.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0,
  );
  const DISCOUNT_ON_MRP = cart.reduce(
    (acc, curr) =>
      acc + ((curr.price * curr.discountPercentage) / 100) * curr.quantity,
    0,
  );
  const TotalAmount = Math.max(
    Total_MRP - DISCOUNT_ON_MRP - COUPON_DISCOUNT + PLATFORM_FEE,
    0,
  );

  const TotalSaving = Total_MRP - TotalAmount;
  // console.log(TotalAmount);
  return (
    <div className="flex flex-col gap-3 p-3 shadow-xl shadow-neutral-300">
      <span className="text-[13px] font-bold text-gray-600">
        PRICE DETAILS (${cart.length} item)
      </span>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <span>Total MRP</span>
          <span>₹{Total_MRP.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount on MRP</span>
          <span className="text-green-600">-₹{DISCOUNT_ON_MRP.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Coupon Discount</span>
          <span className="text-green-600">-₹{COUPON_DISCOUNT}</span>
        </div>
        <div className="flex justify-between">
          <span>Platform Fee</span>
          <span>₹{PLATFORM_FEE}</span>
        </div>
      </div>
      <div className="flex justify-between">
        <span className="font-bold text-gray-700">Total Amount</span>
        <span className="font-bold text-gray-700">
          ₹{TotalAmount.toFixed(2)}
        </span>
      </div>
      <Link href={"/checkout/address"}>
        <div className="flex justify-center bg-blue-500 text-white">
          <button
            disabled={!cart.length}
            className="text-md cursor-pointer py-1.5 font-bold tracking-wider"
          >
            Continue to Payment
          </button>
        </div>
      </Link>
      <div>
        <span className="font-semibold text-green-500">
          You will save ₹{TotalSaving.toFixed(2)} on this order
        </span>
      </div>
    </div>
  );
}

export default AddressPricing;
