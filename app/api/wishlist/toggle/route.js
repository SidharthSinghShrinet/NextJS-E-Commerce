import connectDB from "@/libs/db";
import userModel from "@/models/user.model";
import wishlistModel from "@/models/wishlist.model";
import ApiError from "@/utils/ApiError";
import ApiResponse from "@/utils/ApiResponse";
import asyncHandler from "@/utils/asyncHandler";
import { currentUser } from "@clerk/nextjs/server";

export const POST = asyncHandler(async (request, context) => {
  await connectDB();
  const { productId } = await request.json();
  const { id: clerkId } = await currentUser();
  if (!clerkId) {
    throw new ApiError(401, "Unauthorized");
  }
  const { _id: userId } = await userModel.findOne({ clerkId });
  if (!userId) {
    throw new ApiError(404, "User not found");
  }
  const existingWishlistItem = await wishlistModel.findOne({
    userId,
    productId,
  });
  if (existingWishlistItem) {
    await wishlistModel.findOneAndDelete({
      userId,
      productId,
    });
    return Response.json(
      new ApiResponse(200, true, "Product removed from wishlist", {
        action: "removed",
      }),
      { status: 200 },
    );
  }
  await wishlistModel.create({
    userId,
    productId,
  });
  return Response.json(
    new ApiResponse(200, true, "Product added to wishlist", {
      action: "added",
    }),
    { status: 200 },
  );
});
