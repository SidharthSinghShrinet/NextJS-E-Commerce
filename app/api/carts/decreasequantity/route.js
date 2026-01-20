import connectDB from "@/libs/db";
import cartModel from "@/models/cart.model";
import productModel from "@/models/product.model";
import userModel from "@/models/user.model";
import ApiError from "@/utils/ApiError";
import ApiResponse from "@/utils/ApiResponse";
import asyncHandler from "@/utils/asyncHandler";
import { currentUser } from "@clerk/nextjs/server";

export const PATCH = asyncHandler(async (request, context) => {
  await connectDB();
  const { id: clerkId } = await currentUser();
  const { _id: userId } = await userModel.findOne({ clerkId });
  const { productId } = await request.json();
  const product = await productModel.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  let cart = await cartModel.findOneAndUpdate(
    {
      userId,
      items: { $elemMatch: { productId, quantity: { $gt: 1 } } },
    },
    {
      $inc: { "items.$.quantity": -1 },
    },
    { new: true },
  );
  console.log("Cart:", cart);
  if (!cart) {
    cart = await cartModel.findOneAndUpdate(
      {
        userId,
        items: { $elemMatch: { productId, quantity: 1 } },
      },
      {
        $pull: { items: { productId } },
      },
      { new: true },
    );
  }
  if (!cart) {
    const newCart = await cartModel.findOne({ userId }).populate({
      path: "items.productId",
      select: "images title price discountPercentage brand shippingInformation",
    });
    if (!newCart) {
      throw new ApiError(404, "Cart not found");
    }
    const validItems = newCart.items.filter((item) => item.productId);
    if (validItems.length < newCart.items.length) {
      newCart.items = validItems;
      await newCart.save();
    }
    const populatedCartItems = newCart.items.map((item) => ({
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
      ...newCart.toObject(),
      items: populatedCartItems,
      isEmpty: populatedCartItems.length === 0,
    };
    const message = cartItems.isEmpty
      ? "Cart is empty"
      : "Product already removed from cart";
    const response = new ApiResponse(200, true, message, cartItems);
    return Response.json(response, { status: response.statusCode });
  }
  await cart.populate({
    path: "items.productId",
    select: "images title price discountPercentage brand shippingInformation",
  });
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
    : "Product quantity decreased in cart";
  const response = new ApiResponse(200, true, message, cartItems);
  return Response.json(response, { status: response.statusCode });
});
