import connectDB from "@/libs/db";
import userModel from "@/models/user.model";
import wishlistModel from "@/models/wishlist.model";
import asyncHandler from "@/utils/asyncHandler";
import { currentUser } from "@clerk/nextjs/server";
import productModel from "@/models/product.model";

export const GET = asyncHandler(async (request, context) => {
  await connectDB();
  const { id: clerkId } = await currentUser();
  console.log("Current User:", clerkId);
  const { _id: userId } = await userModel.findOne({ clerkId });
  const allWishlist = await wishlistModel.find({ userId }).populate({
    path: "productId",
    model: productModel,
    select: "images title price discountPercentage",
  });
  return Response.json(allWishlist, { status: 200 });
});
