import connectDB from "@/libs/db";
import addressModel from "@/models/address.model";
import cartModel from "@/models/cart.model";
import orderModel from "@/models/order.model";
import productModel from "@/models/product.model";
import userModel from "@/models/user.model";
import ApiError from "@/utils/ApiError";
import ApiResponse from "@/utils/ApiResponse";
import asyncHandler from "@/utils/asyncHandler";
import { currentUser } from "@clerk/nextjs/server";

export const POST = asyncHandler(async (request, context) => {
  await connectDB();
  const { id: clerkId } = await currentUser();
  const { _id: userId } = await userModel.findOne({ clerkId });
  const { addressId } = await request.json();
  const address = await addressModel.findOne({ _id: addressId, userId });
  if (!address) {
    throw new ApiError(404, "Address not found");
  }
  const shippingAddress = {
    addressId: address._id,
    name: address.name,
    phone: address.phone,
    address: address.address,
    city: address.city,
    state: address.state,
    pincode: address.pincode,
  };
  const cart = await cartModel.findOne({ userId }).populate("items.productId");
  if (!cart || cart.items.length === 0) {
    throw new ApiError(404, "Cart is empty");
  }
  const items = cart.items.map((item) => ({
    productId: item.productId._id,
    quantity: item.quantity,
    price: item.productId.price,
    image: item.productId.images?.[0] || "",
    title: item.productId.title,
  }));
  // const items = cart.items.map(async (item) => {
  //   const product = await productModel.findById(item.productId._id);
  //   if (!product) {
  //     throw new ApiError(404, "Product not found");
  //   }
  //   return {
  //     productId: product._id,
  //     quantity: item.quantity,
  //     price: product.price,
  //     image: product.images?.[0] || "",
  //     title: product.title,
  //   };
  // });
  const Total_MRP = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const DISCOUNT_ON_MRP = cart.items.reduce(
    (acc, item) =>
      acc +
      ((item.productId.price * item.productId.discountPercentage) / 100) *
        item.quantity,
    0,
  );
  const PLATFORM_FEE = 23;
  const COUPON_DISCOUNT = 92;
  const totalAmount = Math.max(
    Number(
      Total_MRP - DISCOUNT_ON_MRP - COUPON_DISCOUNT + PLATFORM_FEE,
    ).toFixed(2),
    0,
  );
  const pricing = {
    totalMRP: Total_MRP,
    discountOnMRP: DISCOUNT_ON_MRP,
    platformFee: PLATFORM_FEE,
    couponDiscount: COUPON_DISCOUNT,
  };
  // const existingOrder = await orderModel.findOne({
  //   userId,
  //   paymentStatus: "pending",
  //   orderStatus: "created",
  // });
  // if (existingOrder) {
  //   await orderModel.updateOne(
  //     { _id: existingOrder._id },
  //     {
  //       orderStatus: "cancelled",
  //       paymentStatus: "failed",
  //     },
  //   );
  // }
  // const newOrder = await orderModel.create({
  //   userId,
  //   items,
  //   shippingAddress,
  //   pricing,
  //   totalAmount,
  // });
  // if (!newOrder) {
  //   throw new ApiError(500, "Failed to create order");
  // }
  // const response = new ApiResponse(
  //   201,
  //   true,
  //   "Order created successfully",
  //   newOrder,
  // );
  return Response.json({ items, Total_MRP }, { status: 200 });
});
