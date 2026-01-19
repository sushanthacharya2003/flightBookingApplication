import mongoose from "mongoose";

const passengerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true }
});

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    flight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
      required: true
    },

    passengers: [passengerSchema],

    totalSeats: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["confirmed", "cancel_requested", "cancelled"],
      default: "confirmed"
    }
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking", bookingSchema);
