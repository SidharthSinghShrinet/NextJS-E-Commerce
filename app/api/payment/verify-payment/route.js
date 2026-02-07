import connectDB from "@/libs/db";
import orderModel from "@/models/order.model";
import ApiError from "@/utils/ApiError";
import ApiResponse from "@/utils/ApiResponse";
import asyncHandler from "@/utils/asyncHandler";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const POST = asyncHandler(async (request, context) => {
  await connectDB();
  const { paymentIntentId } = await request.json();
  if (!paymentIntentId) {
    throw new ApiError(400, "Payment intent id is required");
  }
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  if (paymentIntent.status !== "succeeded") {
    throw new ApiError(400, "Payment is not successful");
  }
  const order = await orderModel.findOne({ paymentIntentId });
  if (!order) {
    throw new ApiError(400, "Order not found");
  }
  if (paymentIntent.amount !== order.totalAmountInPaise) {
    throw new ApiError(400, "Payment amount is not correct");
  }
  if (order.paymentStatus !== "paid") {
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.isPaymentFinalized = true;
    await order.save();
  }
  const response = new ApiResponse(200, true, "Payment is successful", {
    orderId: order._id,
  });
  return Response.json(response, { status: response.statusCode });
});
