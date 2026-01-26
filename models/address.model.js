import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [100, "Name must not exceed 100 characters"],
    },
    address: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Address must be at least 3 characters long"],
      maxlength: [100, "Address must not exceed 100 characters"],
    },
    addressType: {
      type: String,
      required: true,
      enum: ["Home", "Office", "Other"],
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      match: [/^(\+91)?[6-9]\d{9}$/, "Invalid phone number"],
      trim: true,
    },
    pincode: {
      type: String,
      required: true,
      match: [/^\d{6}$/, "Invalid pincode"],
      trim: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Address ||
  mongoose.model("Address", addressSchema);
