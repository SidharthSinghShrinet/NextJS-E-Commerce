import React from "react";
function CartPricing({ cart = [] }) {
  const PLATFORM_FEE = 23;
  const COUPON_DISCOUNT = 92;
  console.table(cart);
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
      <div className="flex justify-center bg-pink-500 text-white">
        <button
          disabled={!cart.length}
          className="text-md py-1.5 font-bold tracking-wider"
        >
          Place Order
        </button>
      </div>
      <div>
        <span className="font-semibold text-green-500">
          You will save ₹{TotalSaving.toFixed(2)} on this order
        </span>
      </div>
    </div>
  );
}

export default CartPricing;
