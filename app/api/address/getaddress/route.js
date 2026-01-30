import connectDB from "@/libs/db";
import addressModel from "@/models/address.model";
import userModel from "@/models/user.model";
import ApiError from "@/utils/ApiError";
import ApiResponse from "@/utils/ApiResponse";
import asyncHandler from "@/utils/asyncHandler";
import { currentUser } from "@clerk/nextjs/server";

export const POST = asyncHandler(async (request, context) => {
  await connectDB();
  const { id: clerkId } = await currentUser();
  const { _id: userId } = await userModel.findOne({ clerkId });
  if (!userId) {
    throw new ApiError(404, "User not found");
  }
  const { addressId } = await request.json();
  const address = await addressModel.findOne({ userId, _id: addressId });
  if (!address) {
    throw new ApiError(404, "Address not found");
  }
  const response = new ApiResponse(
    200,
    true,
    "Address fetched successfully",
    address,
  );
  return Response.json(response, { status: response.statusCode });
});
