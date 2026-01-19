import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/flight_booking");
    console.log("✅ MongoDB connected to ",mongoose.connection.name);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
