import mongoose from "mongoose";

const connectDB = async () => {
  console.log("Before Connecting with Database...");
  if (mongoose.connection.readyState === 1) {
    console.log("Already connected to Database");
    return;
  }
  await mongoose.connect("mongodb://localhost:27017", {
    dbName: "Ecommerce",
  });
  console.log("MongoDB connected to database successfully...");
  console.log("After connecting to Database...");
};

export default connectDB;
