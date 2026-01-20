import React from "react";

function CartPricing({ cart }) {
  console.log("This is cart section:", cart);
  return (
    <>
      <div>
        <span>Price details</span>
        <div>
          <div>
            <div className="flex justify-between">
              <span>MRP</span>
              <span>₹500</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 underline decoration-dashed">
                Platform Fee
              </span>
              <span className="text-gray-500">₹7</span>
            </div>
          </div>
          <div>Discount</div>
          <div>Total Amount</div>
        </div>
        <div>Saved Price</div>
      </div>
      <div>Safe and Secure Payments.Easy returns.100% Authentic products.</div>
    </>
  );
}

export default CartPricing;
