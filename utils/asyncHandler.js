import { NextResponse } from "next/server";

const asyncHandler = (handler) => {
  return async (req, context) => {
    try {
      return await handler(req, context);
    } catch (error) {
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
