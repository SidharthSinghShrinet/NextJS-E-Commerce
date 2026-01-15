import connectDB from "@/libs/db";
import cartModel from "@/models/cart.model";
import productModel from "@/models/product.model";
import ApiError from "@/utils/ApiError";
import asyncHandler from "@/utils/asyncHandler";

export const POST = asyncHandler(async (request, context) => {
  await connectDB();
  const { productId, userId } = await request.json();
  const product = await productModel.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  const cart = await cartModel.findOne({ userId });
  if (!cart) {
    await cartModel.create({ userId, items: [] });
  }
  const index = cart.items.findIndex(
    (item) => item.productId.toString() === productId,
  );
  if (index === -1) {
    cart.items.push({ productId, quantity: 1 });
  } else {
    cart.items[index].quantity += 1;
  }
  await cart.save();
  return Response.json(cart);
});

//^ Pratice
// export const POST = asyncHandler(async (request, context) => {
//   await connectDB();
//   const { userId, productId } = await request.json();
//   const product = await productModel.findById(productId);
//   if (!product) {
//     throw new ApiError(404, "Product not found");
//   }
//   const cart = await cartModel.findOne({ userId });
//   if (!cart) {
//     await cartModel.create({ userId, items: [] });
//   }
//   const index = cart.items.findIndex(
//     (item) => item.productId.toString() === productId,
//   );
//   if (index === -1) {
//     cart.items.push({ productId, quantity: 1 });
//   } else {
//     cart.items[index].quantity += 1;
//   }
//   await cart.save();
//   return Response.json(cart);
// });
