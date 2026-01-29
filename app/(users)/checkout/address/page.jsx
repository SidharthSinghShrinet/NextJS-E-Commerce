"use client";
import React, { useEffect, useState } from "react"; // Added useState
import { BiSolidCheckShield } from "react-icons/bi";
import { useDispatch } from "react-redux";
import AddressPricing from "@/components/AddressPricing";
import { RadioGroupChoiceCard } from "@/components/RadioGroupChoiceCard";
import { setAddress } from "@/libs/features/addressSlice";
import { TbHomePlus } from "react-icons/tb";
// Import your new AddressForm component (we'll create this below)
import AddressForm from "@/components/AddressForm";

function Page() {
  const dispatch = useDispatch();
  const [isFormOpen, setIsFormOpen] = useState(false); // State to control visibility

  function handleToggleForm() {
    setIsFormOpen(!isFormOpen);
  }

  useEffect(() => {
    async function getAddress() {
      const response = await fetch(
        "http://localhost:3000/api/address/findaddresses",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      const data = await response.json();
      dispatch(setAddress(data?.data ?? []));
    }
    getAddress();
  }, [dispatch]);

  return (
    <div className="relative flex min-h-screen w-full justify-center bg-gray-50">
      {/* 1. The Main Content Container */}
      <div
        className={`flex h-full w-[80%] justify-between transition-all duration-300 ${isFormOpen ? "pointer-events-none blur-sm" : ""}`}
      >
        <div className="h-full w-[67%] bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-gray-300 bg-blue-600 px-3 py-3">
            <span className="text-2xl font-semibold text-white">
              Delivery Address
            </span>
            <div
              className="flex cursor-pointer items-center gap-1 hover:opacity-80"
              onClick={handleToggleForm}
            >
              <TbHomePlus size={20} color="white" />
              <span className="font-semibold text-white">
                Add a new address
              </span>
            </div>
          </div>
          <div className="h-full w-full overflow-y-auto scroll-smooth">
            <RadioGroupChoiceCard />
          </div>
        </div>

        <div className="flex h-fit w-[28%] flex-col justify-between bg-white shadow-md">
          <AddressPricing />
          <div className="flex items-center gap-2 p-3">
            <BiSolidCheckShield size={50} className="text-gray-500" />
            <span className="text-[13.5px] font-semibold text-gray-500">
              Safe and Secure Payments. Easy returns. 100% Authentic products.
            </span>
          </div>
        </div>
      </div>

      {/* 2. The Modal Overlay */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
          <div className="w-full max-w-lg p-4">
            {/* Component for the actual form */}
            <AddressForm onClose={handleToggleForm} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
