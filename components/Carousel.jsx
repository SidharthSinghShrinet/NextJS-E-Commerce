"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import banner1 from "@/public/banner1.png";
import banner3 from "@/public/banner3.png";
import banner4 from "@/public/banner4.png";
import banner2 from "@/public/banner2.png";

export function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({
      delay: 3000,
    }),
  ]);

  return (
    <div
      className="embla h-50 w-full shadow-2xl shadow-neutral-400 lg:h-90 lg:w-[98%] lg:rounded-lg"
      ref={emblaRef}
    >
      <div className="embla__container h-full">
        <div className="embla__slide relative flex h-full w-full items-center justify-center">
          <Image
            src={banner1}
            alt="Banner 1"
            fill={true}
            className="object-fill"
          />
        </div>
        <div className="embla__slide relative flex h-full w-full items-center justify-center">
          <Image src={banner2} alt="Banner 2" fill={true} />
        </div>
        <div className="embla__slide relative flex h-full w-full items-center justify-center">
          <Image src={banner4} alt="Banner 4" fill={true} />
        </div>
        <div className="embla__slide relative flex h-full w-full items-center justify-center">
          <Image
            src={banner3}
            alt="Banner 3"
            fill={true}
            className="object-fill"
          />
        </div>
      </div>
    </div>
  );
}
