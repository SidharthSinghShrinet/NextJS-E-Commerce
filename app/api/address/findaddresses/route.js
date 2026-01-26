import connectDB from "@/libs/db";
import addressModel from "@/models/address.model";
import userModel from "@/models/user.model";
import ApiError from "@/utils/ApiError";
import ApiResponse from "@/utils/ApiResponse";
import asyncHandler from "@/utils/asyncHandler";
import { currentUser } from "@clerk/nextjs/server";

export const GET = asyncHandler(async (request, context) => {
  await connectDB();
  const { id: clerkId } = await currentUser();
  const { _id: userId } = await userModel.findOne({ clerkId });
  const addresses = await addressModel.find({ userId });
  if (addresses.length === 0) {
    throw new ApiError(404, "No addresses found");
  }
  const response = new ApiResponse(
    200,
    true,
    "Addresses fetched successfully",
    addresses,
  );
  return Response.json(response, { status: response.statusCode });
});
