import productModel from "@/models/product.model";
import wishlistModel from "@/models/wishlist.model";
import ApiError from "@/utils/ApiError";
import ApiResponse from "@/utils/ApiResponse";
import asyncHandler from "@/utils/asyncHandler";

export const POST = asyncHandler(async (request, context) => {
  const { userId, productId } = await request.json();
  const product = await productModel.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  const wishlist = await wishlistModel.findOneAndUpdate(
    { userId, productId },
    { $setOnInsert: { userId, productId } },
    { upsert: true, new: true },
  );
  const response = new ApiResponse(
    200,
    true,
    "Product added to wishlist",
    wishlist,
  );
  return Response.json(response, { status: response.statusCode });
});
