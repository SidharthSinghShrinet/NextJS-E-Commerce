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
  const { orderId } = await request.json();
  const order = await orderModel.findOne({ userId, _id: orderId });
  if (!order) {
    throw new ApiError(404, "Order not found");
  }
  if (order.paymentStatus !== "pending" && order.orderStatus !== "created") {
    throw new ApiError(400, "Order is not payable");
  }
  if (order.isPaymentFinalized) {
    throw new ApiError(400, "Payment of order is already completed");
  }
  const response = new ApiResponse(
    200,
    true,
    "Order found successfully",
    order,
  );
  return Response.json(response, { status: response.statusCode });
});
