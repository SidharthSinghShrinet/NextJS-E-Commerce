"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Image from "next/image";

export const Trending = () => {
  const [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    async function getProductData() {
      const response = await fetch("https://dummyjson.com/products");
      const { products } = await response.json();
      console.log(products);
      setAllProducts(products);
    }
    getProductData();
  }, []);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false, // ⛔ stop at last slide
    align: "start",
  });

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative flex w-[98%] flex-col items-center justify-around gap-5 rounded-4xl border border-gray-300 py-5 shadow-2xl shadow-neutral-400">
      <p className="mb-5 text-center text-4xl font-bold">Trending</p>

      {/* Viewport */}
      <div ref={emblaRef} className="w-[90%] overflow-hidden">
        {/* Container */}
        <div className="flex gap-5">
          {allProducts.length === 0 ? (
            <h1>Loading...</h1>
          ) : (
            allProducts?.map((product, i) => (
              <div
                key={i}
                className="flex h-60 flex-[0_0_47%] items-center justify-center rounded-4xl border border-gray-300 bg-white hover:border-blue-500 lg:h-80 lg:flex-[0_0_23%]"
              >
                <div className="flex h-[99%] w-[90%] flex-col items-center justify-evenly">
                  <div className="relative h-[50%] w-[65%]">
                    <Image
                      src={product.images[0]}
                      fill={true}
                      alt={product.title}
                      className="object-fit"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="w-full pl-1">
                    <p className="text-md font-semibold">{product.title}</p>
                    <p className="flex gap-1">
                      <span className="font-bold text-green-400">
                        {" "}
                        $
                        {
                          +(
                            product.price -
                            product.price * (product.discountPercentage / 100)
                          ).toFixed(2)
                        }
                      </span>
                      <span className="line-through">${product.price}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Prev */}
      <button
        onClick={scrollPrev}
        className="absolute top-[56%] left-0.5 lg:left-5"
      >
        <MdArrowBackIos size={30} />
      </button>

      {/* Next */}
      <button
        onClick={scrollNext}
        className="absolute top-[56%] right-0.5 lg:right-5"
      >
        <MdArrowForwardIos size={30} />
      </button>
    </div>
  );
};
