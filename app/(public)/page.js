import { EmblaCarousel } from "@/components/Carousel";
import Categories from "@/components/Categories";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Trending } from "@/components/Trending";
import React from "react";

function page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-center bg-gray-50 lg:py-2">
        <EmblaCarousel />
      </div>
      <div className="flex w-full items-center justify-center bg-gray-50 py-4">
        <Categories />
      </div>
      <div className="flex w-full items-center justify-center bg-gray-50 py-4">
        <FeaturedProducts />
      </div>
      <div className="flex w-full items-center justify-center bg-gray-50 py-4">
        <Trending />
      </div>
    </div>
  );
}

export default page;
