import connectDB from "@/libs/db";
import userModel from "@/models/user.model";
import wishlistModel from "@/models/wishlist.model";
import asyncHandler from "@/utils/asyncHandler";
import { currentUser } from "@clerk/nextjs/server";
export const DELETE = asyncHandler(async (request, context) => {
  await connectDB();
  const { id } = await request.json();
  const { id: clerkId } = await currentUser();
  const { _id: userId } = await userModel.findOne({ clerkId });
  await wishlistModel.findByIdAndDelete(id);
  const allWishlist = await wishlistModel.find({ userId });
  return Response.json(allWishlist, { status: 200 });
});
