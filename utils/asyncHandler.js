import { NextResponse } from "next/server";

const asyncHandler = (handler) => {
  return async (req, context) => {
    try {
      return await handler(req, context);
    } catch (error) {
      if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        return NextResponse.json(
          {
            success: false,
            message: `Provided ${field} already exists.`,
            errObj: error,
          },
          {
            status: 409,
          },
        );
      }
      if (error.name === "ValidationError") {
        return NextResponse.json(
          {
            success: false,
            errObj: Object.values(error.errors)
              .map((err) => err.message)
              .join(", "),
          },
          {
            status: 400,
          },
        );
      }
      if (error.name === "CastError") {
        return NextResponse.json(
          {
            success: false,
            message: `Invalid ${error.path}: ${error.value}.`,
            errObj: error,
          },
          {
            status: 400,
          },
        );
      }
      if (error?.name === "SyntaxError") {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid JSON syntax in request body.",
            errObj: error,
          },
          {
            status: 400,
          },
        );
      }
      if (error?.isApiError) {
        return NextResponse.json(
          {
            success: false,
            message: error.message,
            errors: error.errors,
            data: null,
          },
          {
            status: error.statusCode,
          },
        );
      }
      console.log("🔥 Unhandled Error:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Internal Server Error",
          data: null,
        },
        {
          status: 500,
        },
      );
    }
  };
};

export default asyncHandler;
