"use client";
import { ProductCarousel } from "@/components/ProductCarousel";
import WishlistButton from "@/components/WishlistButton";
import { setProduct } from "@/libs/features/productSlice";
import { usePathname } from "next/navigation";
import React, { useEffect, use } from "react";
import { FaStar } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

function Page(props) {
  const dispatch = useDispatch();
  const { id } = use(props.params);
  const pathname = usePathname();
  const product = useSelector((state) => state.product.product);
  useEffect(() => {
    async function getProduct() {
      // const response = await fetch(`https://dummyjson.com/products/${id}`);
      const response = await fetch(`/api/products/singleproduct/${id}`);
      console.log("Response:", response);
      const { data } = await response.json();
      // console.log(data);
      dispatch(setProduct(data));
      console.log("Component is mounted successfully");
    }
    getProduct();
    return () => {
      dispatch(setProduct(null));
      // console.log("Component is Unmounted successfully");
    };
  }, []);
  return (
    <>
      {product?.images[0] ? (
        <div className="flex min-h-100 w-full">
          <div className="relative h-200 w-2/5">
            <ProductCarousel />
          </div>
          <div className="flex w-3/5 flex-col gap-3 border-blue-500 p-2.5">
            <div className="flex items-center justify-between gap-1 text-xs font-medium tracking-wider">
              <div>
                <span>Home{pathname.replaceAll("/", ">")}</span>
                <span className="text-lg font-medium text-gray-600">|</span>
                <span>More by {product.brand}</span>
              </div>
              <WishlistButton productId={product._id} />
            </div>
            <div className="">
              <p className="font-bold text-slate-600">{product.brand}</p>
              <p className="font-small font-normal">{product.title}</p>
              <span className="rounded-sm text-sm font-medium text-green-500">
                Special Price
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-md font-bold text-black">
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
              <div className="flex items-center gap-1.5 text-sm font-semibold">
                <span className="flex items-center gap-0.5 rounded-4xl bg-blue-500 px-1 text-white">
                  {product.averageRating} <FaStar className="text-gray-200" />
                </span>
                <span className="text-neutral-600">
                  ({product.averageRating} Ratings and {product.totalReviews}{" "}
                  Reviews)
                </span>
              </div>
            </div>
            <div className="flex w-full gap-2">
              <button className="w-40 cursor-pointer rounded-lg bg-green-400 p-3 text-lg font-medium tracking-wide text-white hover:bg-green-600">
                Buy Now
              </button>
              <button className="w-40 cursor-pointer rounded-lg bg-orange-500 p-3 text-lg font-medium tracking-wide hover:bg-orange-600">
                Add to Cart
              </button>
            </div>
            <span className="my-0.5 border border-neutral-200" />
            <div>
              <p className="text-xl font-bold">Product Specification</p>
              <div className="flex flex-col gap-2">
                <div className="font-medium text-slate-600">
                  {product.description}
                </div>
                <div className="grid w-2/3 grid-cols-2 items-center gap-y-0.5">
                  <span className="text-md font-semibold text-slate-500">
                    ProductID
                  </span>
                  <span className="text-sm font-normal">{product.sku}</span>
                  <span className="text-md font-semibold text-slate-500">
                    Weight
                  </span>
                  <span className="text-sm font-normal">{1850}g</span>
                  {/* <span className="text-md font-semibold text-slate-500">
                    Dimensions
                  </span>
                  <span className="text-sm font-normal">
                    {product.dimensions.width} x {product.dimensions.height} x{" "}
                    {product.dimensions.depth}
                  </span> */}
                  {product.specifications.map((spec, index) => (
                    <React.Fragment key={index}>
                      <span className="text-md font-semibold text-slate-500">
                        {spec.label}
                      </span>
                      <span className="text-sm font-normal">{spec.value}</span>
                    </React.Fragment>
                  ))}
                  <span className="text-md font-semibold text-slate-500">
                    Warranty Info
                  </span>
                  <span className="text-sm font-normal">
                    {product.warrantyInformation}
                  </span>
                  <span className="text-md font-semibold text-slate-500">
                    Return policy
                  </span>
                  <span className="text-sm font-normal">
                    {product.returnPolicy}
                  </span>
                  <span className="text-md font-semibold text-slate-500">
                    Minimum Order Quantity
                  </span>
                  <span className="text-sm font-normal">
                    {product.minimumOrderQuantity}
                  </span>
                </div>
              </div>
            </div>
            <span className="my-0.5 border border-neutral-200" />
            <div>
              <p className="text-lg font-bold">Shipping & Logistics Details</p>
              <div className="grid w-2/3 grid-cols-2 items-center gap-y-0.5">
                <span className="text-md font-semibold text-slate-500">
                  Shipping Information
                </span>
                <span className="text-sm font-normal">
                  {product.shippingInformation}
                </span>
                <span className="text-md font-semibold text-slate-500">
                  Stock
                </span>
                <span className="text-sm font-normal">{product.stock}</span>
              </div>
            </div>
            <span className="my-0.5 border border-neutral-200" />
            <div>
              <p className="text-lg font-bold">Review & Ratings</p>
              {/* <div className="flex flex-col gap-3 py-5">
                {product.reviews.length === 0 ? (
                  <p>Loading...</p>
                ) : (
                  product.reviews.map((review, index) => (
                    <div
                      key={index}
                      className="w-full rounded-4xl border border-gray-300 p-10 shadow-xl hover:scale-102 hover:duration-300"
                    >
                      <div className="flex justify-between">
                        <p className="text-md font-medium text-gray-600">
                          {review.reviewerName}{" "}
                          <span className="text-gray-500">
                            ({review.reviewerEmail})
                          </span>
                        </p>
                        <div className="flex items-center gap-0.5">
                          <span>{review.rating}</span>
                          <FaStar
                            className={`${review.rating > 0 && review.rating < 3 ? "text-red-600" : `${review.rating === 3 ? "text-amber-500" : "text-green-600"}`}`}
                          />
                          / 5
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-semibold text-slate-700">
                          {review.date.split("T")[0]}
                        </span>
                        <span className="text-md font-bold text-gray-600">
                          {review.comment}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-screen w-full items-center justify-center text-4xl">
          Loading...
        </div>
      )}
    </>
  );
}

export default Page;
