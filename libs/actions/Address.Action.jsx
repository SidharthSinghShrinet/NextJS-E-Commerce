"use server";

import addressModel from "@/models/address.model";
import ApiError from "@/utils/ApiError";
import connectDB from "../db";
import { currentUser } from "@clerk/nextjs/server";
import userModel from "@/models/user.model";

export const addressAction = async (previousState, formData) => {
  console.log("FormData:", formData);
  const {
    name,
    phone,
    address,
    state,
    city,
    pincode,
    addressType,
    isDefault,
    addressId,
  } = Object.fromEntries(formData.entries());
  await connectDB();
  const { id: clerkId } = await currentUser();
  const { _id: userId } = await userModel.findOne({ clerkId });
  if (!userId) {
    throw new ApiError(404, "User not found");
  }
  if (
    !name ||
    !phone ||
    !address ||
    !state ||
    !city ||
    !pincode ||
    !addressType
  ) {
    throw new ApiError(400, "All fields are required");
  }
  if (!addressId) {
    const newAddress = await addressModel.create({
      userId,
      name,
      phone,
      address,
      state,
      city,
      pincode,
      addressType,
      isDefault: isDefault === "on" ? true : false,
    });
    if (!newAddress) {
      throw new ApiError(500, "While adding address, something went wrong");
    }
    const addresses = await addressModel.find({ userId }).lean();
    if (addresses.length === 0) {
      throw new ApiError(404, "No addresses found");
    }
    return JSON.parse(
      JSON.stringify({
        success: true,
        message: "Address added successfully",
        data: addresses,
        statusCode: 200,
      }),
    );
  } else {
    const newAddress = await addressModel.findOneAndUpdate(
      { _id: addressId, userId },
      {
        userId,
        name,
        phone,
        address,
        state,
        city,
        pincode,
        addressType,
        isDefault: isDefault === "on" ? true : false,
      },
      { new: true },
    );
    if (!newAddress) {
      throw new ApiError(500, "While adding address, something went wrong");
    }
    const addresses = await addressModel.find({ userId }).lean();
    if (addresses.length === 0) {
      throw new ApiError(404, "No addresses found");
    }
    return JSON.parse(
      JSON.stringify({
        success: true,
        message: "Address added successfully",
        data: addresses,
        statusCode: 200,
      }),
    );
  }
};
