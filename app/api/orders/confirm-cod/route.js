import connectDB from "@/libs/db";
import orderModel from "@/models/order.model";
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
    throw new ApiError(401, "Unauthorized");
  }
  const { orderId } = await request.json();
  if (!orderId) {
    throw new ApiError(400, "OrderId is required");
  }
  const order = await orderModel.findOneAndUpdate(
    {
      userId,
      _id: orderId,
      paymentStatus: "pending",
      orderStatus: "created",
      isPaymentFinalized: false,
    },
    {
      orderStatus: "confirmed",
      paymentStatus: "pending",
      paymentProvider: "cod",
    },
    { new: true },
  );
  if (!order) {
    throw new ApiError(404, "Order not found or already processed");
  }
  const response = new ApiResponse(
    200,
    true,
    "Order confirmed successfully",
    order,
  );
  return Response.json(response, { status: response.statusCode });
});
