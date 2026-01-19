import mongoose from "mongoose";

const flightSchema = new mongoose.Schema(
  {
    flightNumber: { type: String, required: true },
    airline: { type: String, required: true },

    departureCity: { type: String, required: true },
    arrivalCity: { type: String, required: true },

    departureDate: { type: Date, required: true },
    arrivalDate: { type: Date, required: true },

    price: { type: Number, required: true },
    availableSeats: { type: Number, required: true },

    flightClass: {
      type: String,
      enum: ["economy", "business", "first"],
      required: true
    },

    image: { type: String } // airline logo (later)
  },
  { timestamps: true }
);

export const Flight = mongoose.model("Flight", flightSchema);
