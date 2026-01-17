import connectDB from "@/libs/db";
import cartModel from "@/models/cart.model";
import userModel from "@/models/user.model";
import ApiError from "@/utils/ApiError";
import ApiResponse from "@/utils/ApiResponse";
import asyncHandler from "@/utils/asyncHandler";
import { currentUser } from "@clerk/nextjs/server";

export const DELETE = asyncHandler(async (request, context) => {
  await connectDB();
  const { id: clerkId } = await currentUser();
  const { _id: userId } = await userModel.findOne({ clerkId });
  const { productId } = await request.json();
  const cart = await cartModel
    .findOneAndUpdate(
      { userId },
      { $pull: { items: { productId } } },
      { new: true },
    )
    .populate({
      path: "items.productId",
      select: "images title price discountPercentage brand shippingInformation",
    });
  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }
  const validItems = cart.items.filter((item) => item.productId);
  if (validItems.length < cart.items.length) {
    cart.items = validItems;
    await cart.save();
  }
  const populatedCartItems = cart.items.map((item) => ({
    productId: item.productId._id,
    title: item.productId.title,
    price: item.productId.price,
    images: item.productId.images,
    discountPercentage: item.productId.discountPercentage,
    brand: item.productId.brand,
    shippingInformation: item.productId.shippingInformation,
    quantity: item.quantity,
  }));
  const cartItems = {
    ...cart.toObject(),
    items: populatedCartItems,
    isEmpty: populatedCartItems.length === 0,
  };
  const message = cartItems.isEmpty
    ? "Cart is empty"
    : "Product removed from cart";
  const response = new ApiResponse(200, true, message, cartItems);
  return Response.json(response, { status: response.statusCode });
});
