import connectDB from "@/libs/db";
import cartModel from "@/models/cart.model";
import productModel from "@/models/product.model";
import userModel from "@/models/user.model";
import ApiError from "@/utils/ApiError";
import ApiResponse from "@/utils/ApiResponse";
import asyncHandler from "@/utils/asyncHandler";
import { currentUser } from "@clerk/nextjs/server";

// export const POST = asyncHandler(async (request, context) => {
//   await connectDB();
//   const { productId, userId } = await request.json();
//   const product = await productModel.findById(productId);
//   if (!product) {
//     throw new ApiError(404, "Product not found");
//   }
//   let cart = await cartModel.findOne({ userId });
//   if (!cart) {
//     cart = await cartModel.create({ userId, items: [] });
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

export const POST = asyncHandler(async (request, context) => {
  await connectDB();
  const { id: clerkId } = await currentUser();
  const { _id: userId } = await userModel.findOne({ clerkId });
  const { productId } = await request.json();
  const product = await productModel.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  //^ If product exists in Cart
  let cart = await cartModel.findOneAndUpdate(
    { userId, "items.productId": productId },
    { $inc: { "items.$.quantity": 1 } },
    { new: true },
  );

  //$ There is two condition may occur
  //^ 1) Product not exist in Cart
  //^ 2) User does not have Cart
  if (!cart) {
    cart = await cartModel.findOneAndUpdate(
      { userId },
      {
        $setOnInsert: { userId }, //! This line will create cart for user, if cart does not exits
        $push: { items: { productId, quantity: 1 } }, //! Put the new product in cart
      },
      {
        upsert: true, //! If the filter condition does not matches. Then, it will create document accoerdingly.
        new: true, //! It will returned the latest required document
      },
    );
  }
  const response = new ApiResponse(201, true, "Product added to cart", cart);
  return Response.json(response, { status: response.statusCode });
});

//^ Practice (This method is MongoDB's method which support atomic operations and Concurrency Control)
// export const POST = asyncHandler(async(request, context)=>{
//   await connectDB();
//   const {userId, productId} = await request.json();
//   const product = await productModel.findById(productId);
//   if(!product){
//     throw new ApiError(404, "Product not found");
//   };
//   let cart = await cartModel.findOneAndUpdate(
//     {userId,"items.productId": productId},
//     {$inc:{"items.$.quantity":1}},
//     {new:true}
//   )
//   if(!cart){
//     cart = await cartModel.findOneAndUpdate(
//       {userId},
//       {
//         $setOnInsert:{userId},
//         $push:{items:{productId,quantity:1}}
//       },
//       {
//         upsert:true,
//         new:true
//       }
//     )
//   };
//   return Response.json(cart);
// })

//^ Pratice (This method is JS method and does not support atomic operations and Concurrency Control)
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
