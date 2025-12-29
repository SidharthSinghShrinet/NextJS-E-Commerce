import connectDB from "@/libs/db";
import mongoose from "mongoose";

export async function GET() {
  await connectDB();
  const products = await mongoose.connection.db
    .collection("products")
    .find()
    .toArray();
  return Response.json({
    products,
  });
}
