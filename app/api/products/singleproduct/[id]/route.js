import connectDB from "@/libs/db";
import productModel from "@/models/product.model";
import ApiError from "@/utils/ApiError";
import ApiResponse from "@/utils/ApiResponse";
import asyncHandler from "@/utils/asyncHandler";
import { mapper } from "@/utils/mapper";

export const GET = asyncHandler(async (request, context) => {
  await connectDB();
  const { id } = await context.params;
  const product = await productModel.findOne({ _id: id }).lean();
  // console.log("Single product route accessed for ID:", id);
  // console.log(product);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  // function productMapper({ specifications }) {
  //   specifications.map(({ key, value, type, unit }) => {
  //     console.log("Specifications:", key, value, type, unit);
  //     switch (type) {
  //       case "string":
  //         return value;
  //       case "number":
  //         return unit ? `${value} ${unit}` : value;
  //       case "boolean":
  //         return value ? "Yes" : "No";
  //       case "array":
  //         return value.join(", ");
  //       case "object":
  //         if (!value || typeof value !== "object") return "";
  //         return Object.entries(value)
  //           .map(([k, v]) => `${k}: ${v}`)
  //           .join(", ");
  //       default:
  //         return String(value);
  //     }
  //   });
  //   // prod.specifications.map((spec) => {
  //   //   if (spec.type === "object" && spec.key === "dimensions") {
  //   //     prod["dimensions"] =
  //   //       `${spec.value.width} x ${spec.value.height} x ${spec.value.depth}`;
  //   //     console.log("Final product:", prod);
  //   //     console.log("Mapped dimensions:", prod.dimensions);
  //   //     return prod;
  //   //   }
  //   //   if (spec.type === "array" && spec.key === "ports") {
  //   //     prod["ports"] = spec.value.join(", ");
  //   //     return prod;
  //   //   }
  //   // });
  //   // console.log("Final Product:", prod);
  // }
  const productMapper = mapper(product);
  // console.log("Mapped product:", productMapper);
  const response = new ApiResponse(
    200,
    true,
    "Product fetched successfully",
    productMapper,
  );
  return Response.json(response, { status: 200 });
});
