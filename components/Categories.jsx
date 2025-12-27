import React from "react";
import { FaBaby } from "react-icons/fa";
import { GiMedicines, GiMirrorMirror } from "react-icons/gi";
import {
  IoBulbOutline,
  IoFastFoodOutline,
  IoHomeOutline,
  IoShirt,
  IoShirtOutline,
} from "react-icons/io5";
import { MdOutlineSportsCricket } from "react-icons/md";

function Categories() {
  const categories = [
    { type: "Fashion & Apparel", image: <IoShirtOutline /> },
    { type: "Electronics", image: <IoBulbOutline /> },
    { type: "Beauty & Personal Care", image: <GiMirrorMirror /> },
    { type: "Home & Living", image: <IoHomeOutline /> },
    { type: "Health & Wellness", image: <GiMedicines /> },
    { type: "Baby & Kids", image: <FaBaby /> },
    { type: "Sports & Outdoors", image: <MdOutlineSportsCricket /> },
    { type: "Groceries & Essentials", image: <IoFastFoodOutline /> },
  ];
  return (
    <div className="flex w-[98%] flex-col items-center justify-center gap-5 rounded-2xl border border-gray-300 py-5 shadow-2xl shadow-neutral-400">
      <p className="text-4xl font-bold">Categories</p>
      <div className="grid w-[90%] max-w-7xl grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex h-40 w-40 cursor-pointer flex-col items-center justify-center gap-5 rounded-xl border border-gray-200 bg-white p-6 text-center font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:text-blue-600 hover:shadow-md"
          >
            <span className="text-4xl">{category.image}</span>
            <p>{category.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
