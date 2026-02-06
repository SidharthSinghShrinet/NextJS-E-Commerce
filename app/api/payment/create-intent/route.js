import connectDB from "@/libs/db";
import orderModel from "@/models/order.model";
import userModel from "@/models/user.model";
import ApiError from "@/utils/ApiError";
import ApiResponse from "@/utils/ApiResponse";
import asyncHandler from "@/utils/asyncHandler";
import { currentUser } from "@clerk/nextjs/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const POST = asyncHandler(async (request, context) => {
  await connectDB();
  const { id: clerkId } = await currentUser();
  const { _id: userId } = await userModel.findOne({ clerkId });
  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }
  const { orderId } = await request.json();
  if (!orderId) {
    throw new ApiError(404, "OrderId is required");
  }
  const order = await orderModel.findOne({ userId, _id: orderId });
  if (!order) {
    throw new ApiError(404, "Order not found");
  }
  if (order.paymentStatus !== "pending" || order.orderStatus !== "created") {
    throw new ApiError(400, "Order is not payable");
  }
  if (order.isPaymentFinalized) {
    throw new ApiError(400, "Payment of order is already completed");
  }

  //^ reuse payment intent
  if (order.paymentIntentId) {
    const existing = await stripe.paymentIntents.retrieve(
      order.paymentIntentId,
    );
    console.log("Existing Payment Intent:", existing);
    if (existing.status === "succeeded") {
      throw new ApiError(400, "Payment of order is already completed");
    }
    const response = new ApiResponse(200, true, "Payment intent reused", {
      clientSecret: existing.client_secret,
    });
    return Response.json(response, { status: response.statusCode });
  }

  //^ create payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: order.totalAmountInPaise,
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      orderId: order._id.toString(),
      userId: userId.toString(),
    },
  });
  console.log("New created Payment Intent:", paymentIntent);
  order.paymentIntentId = paymentIntent.id;
  await order.save();

  const response = new ApiResponse(201, true, "Payment intent created", {
    clientSecret: paymentIntent.client_secret,
  });
  return Response.json(response, { status: response.statusCode });
});
