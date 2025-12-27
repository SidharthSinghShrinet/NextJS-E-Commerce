import Image from "next/image";
import React from "react";
import logo from "@/public/DesireMart.png";
import { VscAccount } from "react-icons/vsc";
import { IoCartOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { MdOutlineLightMode } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

function Navbar() {
  return (
    <div className="flex h-19 w-full items-center justify-evenly border-b-[0.5px] border-gray-200">
      <div className="relative w-16 lg:w-17">
        <Image
          src={logo}
          alt="DesiredMart - Logo of Website"
          loading="lazy"
          className="border"
        />
      </div>
      <div className="relative w-1/2">
        {/* The Icon */}
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <FaSearch className="text-zinc-400" />
        </div>

        {/* The Input */}
        <input
          type="search"
          className="text-md w-full rounded-4xl border-2 bg-gray-50 py-1 pr-2 pl-10 font-semibold tracking-wide text-zinc-600 outline-0 focus:border-blue-400"
          placeholder="Search for Products, Brands and More"
        />
      </div>
      <div className="hidden items-center justify-center gap-1 lg:flex">
        <VscAccount size={21} />
        <p className="text-md font-semibold text-gray-800">Profile</p>
      </div>
      <div className="hidden items-center justify-center gap-1 lg:flex">
        <IoMdHeartEmpty size={21} />
        <p className="text-md font-semibold text-gray-800">Wishlist</p>
      </div>
      <div className="flex items-center justify-center gap-2">
        <span className="relative inline-flex items-center">
          <IoCartOutline size={21} />
          <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            0
          </span>
        </span>
        <p className="text-md hidden font-semibold text-gray-800 lg:flex">
          Cart
        </p>
      </div>
      <div className="flex items-center justify-center">
        <MdOutlineLightMode size={21} />
      </div>
      <div className="hidden items-center justify-center gap-1 rounded-xl border-2 bg-[#0A2A50] p-2 text-white lg:block lg:flex">
        <FiLogOut size={21} />
        <p className="text-md font-semibold">Logout</p>
      </div>
    </div>
  );
}

export default Navbar;
