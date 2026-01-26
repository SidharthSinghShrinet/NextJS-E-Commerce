"use client";
import React, { useEffect } from "react";
import CartPricing from "@/components/CartPricing";
import { BiSolidCheckShield } from "react-icons/bi";

function Page() {
  const [allAddress, setAllAddress] = React.useState([]);
  useEffect(() => {
    async function getAddress() {
      const response = await fetch(
        "http://localhost:3000/api/address/findaddresses",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();
      console.log(data);
      setAllAddress(data?.data ?? []);
    }
    getAddress();
  }, []);
  console.log("All Address:", allAddress);
  return (
    <div className="flex min-h-screen w-full justify-center">
      <div className="flex h-full w-[80%] justify-between">
        <div className="h-full w-[67%] bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b-1 border-gray-300 bg-blue-500 px-3 py-3">
            <span className="text-2xl font-semibold text-white">
              Delivery Address
            </span>
          </div>
          <div className="h-full w-full bg-red-100">
            <select>
              {allAddress.map((address, index) => (
                <input
                  key={index}
                  type="radio"
                  name="address"
                  value={address.address}
                />
              ))}
            </select>
          </div>
        </div>
        {/* <div className="flex h-fit w-[28%] flex-col justify-between bg-white">
          <CartPricing cart={cart} />
          <div className="flex items-center gap-2 p-3">
            <BiSolidCheckShield size={50} className="text-gray-500" />
            <span className="text-[13.5px] font-semibold text-gray-500">
              Safe and Secure Payments.Easy returns.100% Authentic products.
            </span>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Page;
