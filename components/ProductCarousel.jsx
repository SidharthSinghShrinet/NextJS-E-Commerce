"use client";
import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useSelector } from "react-redux";
import Image from "next/image";

export const ProductCarousel = () => {
  const products = useSelector((state) => state.product.product);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="embla flex h-full w-full flex-col items-center justify-center">
      <div className="embla__viewport h-[80%] w-[90%]" ref={emblaRef}>
        <div className="embla__container h-full w-full">
          {products.images.length === 0 ? (
            <p>Loading...</p>
          ) : (
            products.images.map((image, index) => (
              <div
                key={index}
                className="embla__slide relative flex items-center justify-center"
              >
                <Image
                  src={image}
                  alt={`Image${index}`}
                  fill={true}
                  className="cursor-zoom-in object-contain transition-transform duration-500 ease-in-out hover:scale-150"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
            ))
          )}
        </div>
      </div>
      {products.images.length <= 1 ? null : (
        <button
          className="embla__prev absolute top-[50%] left-0.5 lg:left-3"
          onClick={scrollPrev}
        >
          <MdArrowBackIos size={30} />
        </button>
      )}
      {products.images.length <= 1 ? null : (
        <button
          className="embla__next absolute top-[50%] right-0.5 lg:right-3"
          onClick={scrollNext}
        >
          <MdArrowForwardIos size={30} />
        </button>
      )}
    </div>
  );
};
