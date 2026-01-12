"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
function Page() {
  const [wishlists, setWishlists] = React.useState([]);
  const router = useRouter();
  function handleProduct(id) {
    console.log(id);
    router.push(`/products/product/${id}`);
  }
  const fetchWishlists = async () => {
    const response = await fetch(
      "http://localhost:3000/api/wishlist/findwishlists",
    );
    const data = await response.json();
    console.log(data);
    setWishlists(data);
  };
  const removeWishlist = async (id) => {
    console.log("Remove wishlist:", id);
    const response = await fetch(
      "http://localhost:3000/api/wishlist/removewishlist",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      },
    );
    if (response.ok) {
      await fetchWishlists();
    } else {
      console.log("Failed to remove wishlist");
    }
  };

  useEffect(() => {
    async function getWishlists() {
      const response = await fetch(
        "http://localhost:3000/api/wishlist/findwishlists",
      );
      const data = await response.json();
      setWishlists(data);
    }
    getWishlists();
  }, []);
  return (
    <div className="flex min-h-screen w-full justify-center">
      <div className="flex h-full w-[55%] flex-col gap-3 bg-white pt-5 shadow-xl">
        <div className="flex items-center justify-between border-gray-300 px-5">
          <span className="text-2xl font-semibold">
            My Wishlist ({wishlists.length})
          </span>
        </div>
        <div className="border-[1px] border-gray-300" />
        <div className="flex flex-col gap-3">
          {wishlists.length === 0 ? (
            <h1>Loading...</h1>
          ) : (
            wishlists?.map((wishlist) => (
              <div
                key={wishlist.productId._id}
                className="flex cursor-pointer items-center justify-between border-b-1 border-gray-300 px-10 py-4"
              >
                <div
                  onClick={() => handleProduct(wishlist.productId._id)}
                  className="flex w-full items-center gap-4"
                >
                  <div className="relative h-24 w-24">
                    <Image
                      src={wishlist.productId.images[0]}
                      alt={wishlist.productId.title}
                      fill={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="absolute object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">
                      {wishlist.productId.title}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-md font-bold text-green-600">
                        $
                        {
                          +(
                            wishlist.productId.price -
                            wishlist.productId.price *
                              (wishlist.productId.discountPercentage / 100)
                          ).toFixed(2)
                        }
                      </span>
                      <span className="font-small text-sm text-neutral-400 line-through">
                        ${wishlist.productId.price}
                      </span>
                      <span className="text-sm font-medium text-orange-600">
                        ({wishlist.productId.discountPercentage}% off)
                      </span>
                    </div>
                  </div>
                </div>
                <MdDelete
                  onClick={() => removeWishlist(wishlist._id)}
                  className="text-2xl font-semibold text-red-500"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
