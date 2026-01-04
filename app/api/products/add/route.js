import connectDB from "@/libs/db";
import productModel from "@/models/product.model";
import ApiError from "@/utils/ApiError";
import ApiResponse from "@/utils/ApiResponse";
import asyncHandler from "@/utils/asyncHandler";
import { NextResponse } from "next/server";
export const POST = asyncHandler(async (request) => {
  await connectDB();
  console.log("Adding Products...");
  const data = await request.json();
  // console.log("Request Body:", data);
  const newProducts = await productModel.create(data);
  if (!newProducts || newProducts.length === 0) {
    throw new ApiError(400, "Failed to add products");
  }
  const response = new ApiResponse(
    201,
    true,
    "Product added successfully",
    newProducts,
  );
  return NextResponse.json(response, { status: response.statusCode });
});
