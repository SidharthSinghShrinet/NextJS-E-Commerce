import connectDB from "@/libs/db";
import addressModel from "@/models/address.model";
import userModel from "@/models/user.model";
import ApiError from "@/utils/ApiError";
import ApiResponse from "@/utils/ApiResponse";
import asyncHandler from "@/utils/asyncHandler";
import { currentUser } from "@clerk/nextjs/server";

export const DELETE = asyncHandler(async (request, context) => {
  await connectDB();
  const { id: clerkId } = await currentUser();
  const { _id: userId } = await userModel.findOne({ clerkId });
  const { addressId } = await request.json();
  const deletedAddress = await addressModel.findOneAndDelete({
    userId,
    _id: addressId,
  });
  if (!deletedAddress) {
    throw new ApiError(404, "Address not found");
  }
  const address = await addressModel.find({ userId });
  if (address.length === 0) {
    throw new ApiError(404, "No addresses found");
  }
  const response = new ApiResponse(
    200,
    true,
    "Address deleted successfully",
    address,
  );
  return Response.json(response, { status: response.statusCode });
});
