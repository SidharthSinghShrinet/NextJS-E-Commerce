"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { TbOctagonMinus, TbOctagonPlus } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setCartItemsCount } from "@/libs/features/cartSlice";
import CartPricing from "@/components/CartPricing";
import { BiSolidCheckShield } from "react-icons/bi";

function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [cart, setCart] = React.useState([]);
  // console.log("Total no. of items in cart:", cart.length);
  function handleProduct(id) {
    console.log(id);
    router.push(`/products/product/${id}`);
  }
  async function handleSaveForLater(productId) {
    const response = await fetch("http://localhost:3000/api/carts/savelater", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });
    console.log(response);
    const { data } = await response.json();
    console.log(data);
    dispatch(setCartItemsCount(data.items.length));
    setCart(data?.items ?? []);
  }
  async function handleRemoveFromCart(productId) {
    const response = await fetch("http://localhost:3000/api/carts/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });
    console.log(response);
    const { data } = await response.json();
    console.log(data);
    dispatch(setCartItemsCount(data.items.length));
    setCart(data?.items ?? []);
  }
  async function handleIncreaseQuantity(productId) {
    const response = await fetch(
      "http://localhost:3000/api/carts/increasequantity",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      },
    );
    console.log(response);
    const data = await response.json();
    console.log(data);
    setCart(data?.data?.items ?? []);
  }
  async function handleDecreaseQuantity(productId, quantity) {
    const response = await fetch(
      "http://localhost:3000/api/carts/decreasequantity",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      },
    );
    const { data } = await response.json();
    // console.log(data);
    dispatch(setCartItemsCount(data.items.length));
    setCart(data?.items ?? []);
  }
  // console.log("Cart Frontend:", cart);
  async function handleClearAll() {
    const response = await fetch("http://localhost:3000/api/carts/clear-all", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log("Cleared all");
      dispatch(setCartItemsCount(0));
      setCart([]);
    }
  }
  useEffect(() => {
    async function getCart() {
      const response = await fetch(
        "http://localhost:3000/api/carts/findcarts",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();
      setCart(data?.data?.items ?? []);
    }
    getCart();
  }, []);
  return (
    <div className="flex min-h-screen w-full justify-center">
      <div className="flex h-full w-[80%] justify-between">
        <div className="h-full w-[67%] bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b-1 border-gray-300 px-5 py-3">
            <span className="text-2xl font-semibold">Shopping Cart</span>
            <MdDelete
              className="text-2xl font-semibold text-pink-500"
              onClick={() => handleClearAll()}
            />
          </div>
          <div className="h-full w-full">
            {cart?.length === 0 ? (
              <div className="flex h-full w-full items-center px-5">
                <span>Loading...</span>
              </div>
            ) : (
              cart?.map((item) => (
                <div
                  key={item.productId}
                  className="flex flex-col border-b-1 border-gray-300 px-10 py-4"
                >
                  <div className="flex cursor-pointer items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="relative h-24 w-24"
                        onClick={() => handleProduct(item.productId)}
                      >
                        <Image
                          src={item.images[0]}
                          alt={item.title}
                          fill={true}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="absolute object-contain"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span
                          onClick={() => handleProduct(item.productId)}
                          className="text-sm font-semibold hover:text-blue-600"
                        >
                          {item.title}
                        </span>
                        <span className="text-[13px] font-semibold text-slate-500">
                          Seller: SHIVENTERPRISESMAHADEV
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-md font-bold text-green-600">
                            ₹
                            {
                              +(
                                item.price -
                                item.price * (item.discountPercentage / 100)
                              ).toFixed(2)
                            }
                          </span>
                          <span className="font-small text-sm text-neutral-400 line-through">
                            ${item.price}
                          </span>
                          <span className="text-sm font-medium text-orange-600">
                            ({item.discountPercentage}% off)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="py-2.75">
                      <span className="text-sm font-semibold text-slate-600">
                        {item.shippingInformation}
                      </span>
                    </div>
                  </div>
                  <div className="flex h-10 w-full items-center gap-[13px]">
                    <div className="flex items-center gap-2.5">
                      <div className="cursor-pointer">
                        <TbOctagonPlus
                          size={21}
                          onClick={() => handleIncreaseQuantity(item.productId)}
                        />
                      </div>
                      <div className="border-2 border-dashed border-gray-500 px-3 shadow-2xl select-none">
                        <span className="text-lg font-semibold">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="cursor-pointer">
                        <TbOctagonMinus
                          size={21}
                          onClick={() => handleDecreaseQuantity(item.productId)}
                        />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleSaveForLater(item.productId)}
                        className="cursor-pointer font-bold"
                      >
                        Save for later
                      </button>
                      <button
                        onClick={() => handleRemoveFromCart(item.productId)}
                        className="cursor-pointer font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="flex h-fit w-[28%] flex-col justify-between bg-white">
          <CartPricing cart={cart} />
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
