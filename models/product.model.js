import mongoose from "mongoose";

const specificationSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    unit: {
      type: String,
      trim: true,
      lowercase: true,
    },
    type: {
      type: String,
      enum: ["number", "string", "boolean", "array", "object"],
      required: true,
    },
  },
  { _id: false },
);

const productSchema = new mongoose.Schema(
  {
    //! CORE PRODUCT INFORMATION
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Product title must be at least 3 characters long"],
      maxlength: [100, "Product title must not exceed 100 characters"],
    }, //^ Product name
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: [
        10,
        "Product description must be at least 10 characters long",
      ],
      maxlength: [2000, "Product description must not exceed 2000 characters"],
    }, //^ Main Description
    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    }, //^ Product Category for navigation and filtering
    brand: {
      type: String,
      required: true,
      trim: true,
      index: true,
    }, //^ Brand Filtering
    tags: {
      type: [String],
      default: [],
    }, //^ Search & Relevance
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    }, //^ EACH PRODUCT UNIQUE ID FOR WAREHOUSE
    //! PRICING AND INVENTORY
    price: {
      type: Number,
      required: true,
      min: [0, "Product price must be at least 0"],
      index: true,
    }, //^ Product cost
    discountPercentage: {
      type: Number,
      default: 0,
      min: [0, "Discount percentage must be at least 0"],
      max: [100, "Discount percentage must not exceed 100"],
    }, //^ Discount in percentage, Based on this calculate price after discount
    stock: {
      type: Number,
      required: true,
      min: [0, "Stock cannot be negative"],
    }, //^ Total product left off in inventory
    minimumOrderQuantity: {
      type: Number,
      default: 1,
    }, //^ Minimum order required to place the order
    availabilityStatus: {
      type: String,
      enum: ["In Stock", "Out of Stock", "Limited Stock"],
      default: "In Stock",
    }, //^ It will tell whether the product is available or not
    //! REVIEW SUMMARY
    averageRating: {
      type: Number,
      default: 0,
      min: [0, "Average rating must be at least 0"],
      max: [5, "Average rating must not exceed 5"],
      index: true,
    }, //^ It will tell current average rating of the product
    totalReviews: {
      type: Number,
      default: 0,
    }, //^ It will tell current number of reviews on product
    //! MEDIA
    images: {
      type: [String],
      default: [],
      required: true,
    }, //^ Images of the product
    thumbnail: {
      type: String,
      required: true,
    }, //^ Thumbnail of the product
    //! POLICIES & LOGISTICS
    warrantyInformation: {
      type: String,
    }, //^ Warranty on the product
    shippingInformation: {
      type: String,
    }, //^ Delivery Information that How many days needed to deliver it
    returnPolicy: {
      type: String,
    }, //^ Returned policy of the product
    //! SPECIFICATION OF THE PRODUCT
    specifications: {
      type: [specificationSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

//^ Indexes for optimized search and filtering operations on products collection.
productSchema.index({
  title: "text",
  "specifications.key": 1,
  "specifications.value": 1,
});

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
