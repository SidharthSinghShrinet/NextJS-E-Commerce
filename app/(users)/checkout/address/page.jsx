"use client";
import React, { useEffect } from "react";
import { BiSolidCheckShield } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import AddressPricing from "@/components/AddressPricing";
import { RadioGroupChoiceCard } from "@/components/RadioGroupChoiceCard";
import { setAddress } from "@/libs/features/addressSlice";
import { TbHomePlus } from "react-icons/tb";

function Page() {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
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
      // console.log(data);
      dispatch(setAddress(data?.data ?? []));
    }
    getAddress();
  }, []);
  return (
    <div className="flex min-h-screen w-full justify-center">
      <div className="flex h-full w-[80%] justify-between">
        <div className="h-full w-[67%] bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b-1 border-gray-300 bg-blue-500 px-3 py-3">
            <span className="text-2xl font-semibold text-white">
              Delivery Address
            </span>
            <div className="flex items-center gap-1">
              <TbHomePlus size={20} className="cursor-pointer" color="white" />
              <span className="font-semibold text-white">
                Add a new address
              </span>
            </div>
          </div>
          <div className="h-[90vh] w-full overflow-y-auto scroll-smooth bg-red-100">
            <RadioGroupChoiceCard />
          </div>
        </div>
        <div className="flex h-fit w-[28%] flex-col justify-between bg-white">
          <AddressPricing cart={cart} />
          <div className="flex items-center gap-2 p-3">
            <BiSolidCheckShield size={50} className="text-gray-500" />
            <span className="text-[13.5px] font-semibold text-gray-500">
              Safe and Secure Payments.Easy returns.100% Authentic products.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
