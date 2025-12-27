"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 1000 }),
  ]);

  return (
    <div className="embla mt-10 h-70 w-full border" ref={emblaRef}>
      <div className="embla__container h-full w-full">
        <div className="embla__slide flex items-center justify-center">
          Slide 1
        </div>
        <div className="embla__slide flex items-center justify-center">
          Slide 2
        </div>
        <div className="embla__slide flex items-center justify-center">
          Slide 3
        </div>
      </div>
    </div>
  );
}
