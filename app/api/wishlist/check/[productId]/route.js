import userModel from "@/models/user.model";
import wishlistModel from "@/models/wishlist.model";
import asyncHandler from "@/utils/asyncHandler";
import { currentUser } from "@clerk/nextjs/server";

export const GET = asyncHandler(async (request, context) => {
  const { productId } = await context.params;
  const { id: clerkId } = await currentUser();
  const { _id: userId } = await userModel.findOne({ clerkId });
  const checkProduct = await wishlistModel.findOne({ productId, userId });
  return Response.json(checkProduct, { status: 200 });
});
