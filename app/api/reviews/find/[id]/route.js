import connectDB from "@/libs/db";
import reviewModel from "@/models/review.model";
import ApiError from "@/utils/ApiError";
import ApiResponse from "@/utils/ApiResponse";
import asyncHandler from "@/utils/asyncHandler";

export const GET = asyncHandler(async (request, context) => {
  await connectDB();
  const { id } = await context.params;
  const reviews = await reviewModel.find({ productId: id });
  if (reviews.length === 0) {
    throw new ApiError(404, "No reviews found");
  }
  const response = new ApiResponse(
    200,
    true,
    "Reviews fetched successfully",
    reviews,
  );
  return Response.json(response, { status: response.statusCode });
});
