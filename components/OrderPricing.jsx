import React from "react";
function OrderPricing({ order }) {
  const TotalAmount = Math.max(
    order.pricing.totalMRP -
      order.pricing.discountOnMRP -
      order.pricing.couponDiscount +
      order.pricing.platformFee,
    0,
  );

  const TotalSaving = order.pricing.totalMRP - TotalAmount;
  return (
    <div className="flex w-78 flex-col gap-3 p-3 shadow-xl shadow-neutral-300">
      <span className="text-[13px] font-bold text-gray-600">
        PRICE DETAILS ({order.items.length} item)
      </span>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <span>Total MRP</span>
          <span>₹{order.pricing.totalMRP.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount on MRP</span>
          <span className="text-green-600">
            -₹{order.pricing.discountOnMRP.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Coupon Discount</span>
          <span className="text-green-600">
            -₹{order.pricing.couponDiscount}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Platform Fee</span>
          <span>₹{order.pricing.platformFee}</span>
        </div>
      </div>
      <div className="flex justify-between">
        <span className="font-bold text-gray-700">Total Amount</span>
        <span className="font-bold text-gray-700">
          ₹{order.totalAmountInPaise / 100}
        </span>
      </div>
      <div>
        <span className="font-semibold text-green-500">
          You will save ₹{TotalSaving.toFixed(2)} on this order
        </span>
      </div>
    </div>
  );
}

export default OrderPricing;
