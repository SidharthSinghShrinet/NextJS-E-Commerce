import connectDB from "@/libs/db";
import addressModel from "@/models/address.model";
import ApiError from "@/utils/ApiError";
import ApiResponse from "@/utils/ApiResponse";
import asyncHandler from "@/utils/asyncHandler";

export const POST = asyncHandler(async (request, context) => {
  await connectDB();
  const {
    userId,
    name,
    address,
    addressType,
    state,
    city,
    pincode,
    phone,
    isDefault,
  } = await request.json();

  const newAddress = await addressModel.create({
    userId,
    name,
    address,
    addressType,
    state,
    city,
    pincode,
    phone,
    isDefault,
  });
  if (!newAddress) {
    throw new ApiError("Failed to add address");
  }
  const response = new ApiResponse(
    201,
    true,
    "Address added successfully",
    newAddress,
  );
  return Response.json(response, { status: response.statusCode });
});
