console.log("BOOKING.CONTROLLER FILE LOADED");
import { Booking } from "./booking.model.js";
import { Flight } from "../flights/flight.model.js";

/**
 * USER: Create booking
 */
export const createBooking = async (req, res) => {
  try {
    console.log("STEP 1: controller entered");

    const { flightId, passengers } = req.body;
    console.log("STEP 2: body", flightId, passengers);

    const flight = await Flight.findById(flightId);
    console.log("STEP 3: flight", flight);

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    console.log("STEP 4: seats before", flight.availableSeats);

    if (flight.availableSeats < passengers.length) {
      return res.status(400).json({ message: "Not enough seats" });
    }

    flight.availableSeats -= passengers.length;
    await flight.save();
    console.log("STEP 5: seats after save");

    const booking = await Booking.create({
      user: req.user.id,
      flight: flightId,
      passengers,
      totalSeats: passengers.length
    });

    console.log("STEP 6: booking created", booking._id);

    return res.status(201).json(booking);

  } catch (error) {
    console.error("BOOKING ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};


/**
 * USER: Get own booking
 */
export const getBookingById = async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate("flight")
    .populate("user", "-password");

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  if (booking.user._id.toString() !== req.user.id) {
    return res.status(403).json({ message: "Access denied" });
  }

  res.json(booking);
};

/**
 * USER: Request cancellation
 */
export const requestCancel = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  if (booking.user.toString() !== req.user.id) {
    return res.status(403).json({ message: "Access denied" });
  }

  booking.status = "cancel_requested";
  await booking.save();

  res.json({ message: "Cancellation requested" });
};

/**
 * ADMIN: Approve cancellation
 */
export const approveCancel = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  if (booking.status !== "cancel_requested") {
    return res.status(400).json({ message: "Invalid booking status" });
  }

  const flight = await Flight.findById(booking.flight);
  flight.availableSeats += booking.totalSeats;
  await flight.save();

  booking.status = "cancelled";
  await booking.save();

  res.json({ message: "Booking cancelled & seats refunded" });
};
