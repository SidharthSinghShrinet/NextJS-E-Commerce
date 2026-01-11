import wishlistModel from "@/models/wishlist.model";
import asyncHandler from "@/utils/asyncHandler";

export const GET = asyncHandler(async (request, context) => {
  const { productId } = await context.params;
  const checkProduct = await wishlistModel.findOne({ productId });
  return Response.json(checkProduct, { status: 200 });
});
