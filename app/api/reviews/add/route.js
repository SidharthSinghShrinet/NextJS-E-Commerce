import connectDB from "@/libs/db";
import reviewModel from "@/models/review.model";
import ApiError from "@/utils/ApiError";
import ApiResponse from "@/utils/ApiResponse";
import asyncHandler from "@/utils/asyncHandler";

export const POST = asyncHandler(async (request, context) => {
  await connectDB();
  const { rating, productId, comment, userId, reviewerName, reviewerEmail } =
    await request.json();
  const newReview = await reviewModel.create({
    rating,
    productId,
    comment,
    userId,
    reviewerName,
    reviewerEmail,
  });
  if (!newReview) {
    throw new ApiError(400, "Failed to add review");
  }
  const response = new ApiResponse(
    201,
    true,
    "Review added successfully",
    newReview,
  );
  return Response.json(response, { status: response.statusCode });
});
