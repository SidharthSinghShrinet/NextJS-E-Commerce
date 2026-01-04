import connectDB from "@/libs/db";
import productModel from "@/models/product.model";
import ApiError from "@/utils/ApiError";
import ApiResponse from "@/utils/ApiResponse";
export const GET = async () => {
  await connectDB();
  const products = await productModel.find({});
  if (products.length === 0) {
    throw new ApiError(404, "No products found");
  }
  const response = new ApiResponse(
    200,
    true,
    "Products fetched successfully",
    products,
  );
  return Response.json(response, { status: response.statusCode });
};
