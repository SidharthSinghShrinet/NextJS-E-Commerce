"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import logo from "@/public/DesireMart.png";
import { VscAccount } from "react-icons/vsc";
import { IoCartOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { MdOutlineLightMode } from "react-icons/md";
import { setCartItemsCount } from "@/libs/features/cartSlice";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

function Navbar() {
  const dispatch = useDispatch();
  const { isSignedIn } = useUser();
  const cartItemsCount = useSelector((state) => state.cart.cartItemsCount);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(setCartItemsCount(0));
      return;
    }

    const getCartItemsCount = async () => {
      try {
        const response = await fetch("/api/carts/findcarts");

        if (!response.ok) {
          dispatch(setCartItemsCount(0));
          return;
        }

        const { data } = await response.json();
        dispatch(setCartItemsCount(data?.items?.length || 0));
      } catch (error) {
        dispatch(setCartItemsCount(0));
      }
    };

    getCartItemsCount();
  }, [isSignedIn, dispatch]);
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
      <Link href={"/wishlist"}>
        <div className="hidden items-center justify-center gap-1 lg:flex">
          <IoMdHeartEmpty size={21} />
          <p className="text-md font-semibold text-gray-800">Wishlist</p>
        </div>
      </Link>
      <Link href={"/cart"}>
        <div className="flex items-center justify-center gap-2">
          <span className="relative inline-flex items-center">
            <IoCartOutline size={21} />
            <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {cartItemsCount || 0}
            </span>
          </span>
          <p className="text-md hidden font-semibold text-gray-800 lg:flex">
            Cart
          </p>
        </div>
      </Link>
      <div className="flex items-center justify-center">
        <MdOutlineLightMode size={21} />
      </div>
      <header className="flex h-16 items-center justify-end gap-4 p-4">
        <SignedOut>
          <SignInButton
            mode="modal"
            forceRedirectUrl="/products"
            className="text-md font-semibold text-gray-800"
          />
        </SignedOut>
        <SignedIn>
          <UserButton forceRedirectUrl="/" />
        </SignedIn>
      </header>
    </div>
  );
}

export default Navbar;
