import connectDB from "@/libs/db";
import orderModel from "@/models/order.model";
import ApiError from "@/utils/ApiError";
import ApiResponse from "@/utils/ApiResponse";
import asyncHandler from "@/utils/asyncHandler";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const POST = asyncHandler(async (request, context) => {
  await connectDB();
  console.log("Consoling the request", request);
  const sig = request.headers.get("stripe-signature");
  const body = await request.text();
  console.log("Body:", body);
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error.message);
    throw new ApiError(400, "Webhook Error");
  }
  console.log("Event Details:", event);
  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      const order = await orderModel.findOne({
        paymentIntentId: paymentIntent.id,
      });
      if (!order) break;
      if (order.paymentStatus !== "paid") {
        if (paymentIntent.amount !== order.totalAmountInPaise) {
          console.error("Amount mismatch for order:", order._id);
        }
        order.paymentStatus = "paid";
        order.orderStatus = "confirmed";
        order.isPaymentFinalized = true;
        await order.save();
      }
      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      const order = await orderModel.findOne({
        paymentIntentId: paymentIntent.id,
      });
      if (!order) {
        break;
      }
      if (order.orderStatus !== "paid") {
        order.paymentStatus = "failed";
        await order.save();
      }
      break;
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
  console.log("Webhook received");
  const response = new ApiResponse(200, true, "Webhook received");
  return Response.json(response, { status: response.statusCode });
});
