"use client";
import { setAllProducts } from "@/libs/features/productSlice";
import React, { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";

function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const allProducts = useSelector((state) => state.product.allProducts);
  console.log(allProducts);
  function handleProduct(id) {
    router.push(`/products/product/${id}`);
  }
  useEffect(() => {
    async function getAllProducts() {
      const response = await fetch(
        "http://localhost:3000/api/products/findproducts",
      );
      // const response = await fetch("https://dummyjson.com/products/");
      // const { products } = await response.json();
      const { data } = await response.json();
      console.log(data);
      dispatch(setAllProducts(data));
    }
    getAllProducts();
  }, []);
  return (
    <div className="flex w-full flex-col items-center bg-neutral-50">
      <div className="flex h-13 w-full items-center">Filter Mechanism:</div>
      <div className="flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-5 py-3">
        {allProducts.length === 0 ? (
          <p>Loading...</p>
        ) : (
          allProducts.map((product, index) => (
            <div
              onClick={() => handleProduct(product._id)}
              key={index}
              className="flex h-85 w-70 flex-col items-center justify-center hover:-translate-y-3 hover:border hover:border-gray-300 hover:bg-white hover:shadow-md hover:shadow-neutral-400 hover:duration-300"
            >
              <div className="relative h-[73.5%] w-[85%] border border-gray-300">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill={true}
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="w-[85%] bg-white px-1">
                <div className="flex w-full justify-between">
                  <p className="text-md font-bold text-gray-500">
                    {product.brand ||
                      product.category.charAt(0).toUpperCase() +
                        product.category.slice(1)}
                  </p>
                  <div className="flex items-center justify-center gap-1 text-sm font-bold text-gray-600">
                    {product.averageRating}
                    <FaStar className="text-green-400" /> |{" "}
                    {product.totalReviews}
                  </div>
                </div>
                <p className="text-sm font-medium">{product.title}</p>
                <div className="flex items-center gap-1.5">
                  <span className="text-md font-bold text-green-600">
                    $
                    {
                      +(
                        product.price -
                        product.price * (product.discountPercentage / 100)
                      ).toFixed(2)
                    }
                  </span>
                  <span className="font-small text-sm text-neutral-400 line-through">
                    ${product.price}
                  </span>
                  <span className="text-sm font-medium text-orange-600">
                    ({product.discountPercentage}% off)
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Page;
