import connectDB from "@/libs/db";
import cartModel from "@/models/cart.model";
import userModel from "@/models/user.model";
import ApiResponse from "@/utils/ApiResponse";
import asyncHandler from "@/utils/asyncHandler";
import { currentUser } from "@clerk/nextjs/server";

export const DELETE = asyncHandler(async (request, context) => {
  await connectDB();
  const { id: clerkId } = await currentUser();
  const { _id: userId } = await userModel.findOne({ clerkId });
  await cartModel.findOneAndDelete({ userId });
  const response = new ApiResponse(
    200,
    true,
    "Cart cleared successfully",
    null,
  );
  return Response.json(response, { status: response.statusCode });
});
