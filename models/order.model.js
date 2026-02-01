import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: {
            type: Number,
            min: 1,
            required: true,
          },
          image: {
            type: String,
          },
          title: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
      required: true,
      validate: [(arr) => arr.length > 0, "Order must have at least one item"],
    },
    pricing: {
      totalMRP: { type: Number, required: true },
      discountOnMRP: { type: Number, default: 0 },
      couponDiscount: { type: Number, default: 0 },
      platformFee: { type: Number, default: 0 },
    },
    shippingAddress: {
      addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
    },
    orderStatus: {
      type: String,
      enum: ["created", "confirmed", "shipped", "delivered", "cancelled"],
      default: "created",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    paymentProvider: {
      type: String,
      enum: ["razorpay", "stripe", "paypal", "cod"],
      immutable: true,
      default: "stripe",
    },
    paymentIntentId: {
      type: String,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "INR",
    },
    isPaymentFinalized: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

orderSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
