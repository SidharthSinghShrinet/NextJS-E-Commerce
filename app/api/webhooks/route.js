import connectDB from "@/libs/db";
import userModel from "@/models/user.model";
import ApiError from "@/utils/ApiError";
import ApiResponse from "@/utils/ApiResponse";
import asyncHandler from "@/utils/asyncHandler";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
// import { NextRequest } from 'next/server'

export const POST = asyncHandler(async (req) => {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data;
    const eventType = evt.type;
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`,
    );
    console.log("Webhook payload:", evt.data);
    console.log("👉 Reached webhook handler");

    if (evt.type === "user.created") {
      console.log("userId:", evt.data.id);
      await connectDB();
      console.log("Emails:", JSON.stringify(evt.data.email_addresses, null, 2));

      const newUser = await userModel.findOneAndUpdate(
        {
          clerkId: evt.data.id,
        },
        {
          clerkId: evt.data.id,
          email: evt.data?.email_addresses[0]?.email_address,
          name: `${evt.data.first_name || ""} ${evt.data.last_name || ""}`.trim(),
          role: "user",
          isActive: true,
        },
        {
          upsert: true,
          new: true,
        },
      );
      console.log("NewUser:", newUser);
      if (!newUser) {
        throw new ApiError(400, "Failed to create user");
      }
      const response = new ApiResponse(
        200,
        true,
        "User created successfully",
        newUser,
      );
      return Response.json(response, { status: response.statusCode });
    }

    if (evt.type === "user.deleted") {
      console.log("userId:", evt.data.id);
      await connectDB();
      const deletedUser = await userModel.findOneAndDelete({
        clerkId: evt.data.id,
      });
      console.log("DeletedUser:", deletedUser);
      if (!deletedUser) {
        throw new ApiError(400, "Failed to delete user");
      }
      const response = new ApiResponse(
        200,
        true,
        "User deleted successfully",
        deletedUser,
      );
      return Response.json(response, { status: response.statusCode });
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
});
