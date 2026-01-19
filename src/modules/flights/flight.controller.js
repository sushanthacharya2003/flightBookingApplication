import { Flight } from "./flight.model.js";

/**
 * ADMIN: Create flight
 */
export const createFlight = async (req, res) => {
  try {
    const flight = await Flight.create(req.body);
    res.status(201).json(flight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * PUBLIC: Search flights
 */
export const getFlights = async (req, res) => {
  const { departureCity, arrivalCity, departureDate, flightClass } = req.query;

  let query = {};

  if (departureCity) query.departureCity = departureCity;
  if (arrivalCity) query.arrivalCity = arrivalCity;
  if (flightClass) query.flightClass = flightClass;
  if (departureDate)
    query.departureDate = { $gte: new Date(departureDate) };

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const flights = await Flight.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ price: 1 });
  res.json(flights);
};

/**
 * PUBLIC: Get single flight
 */
export const getFlightById = async (req, res) => {
  const flight = await Flight.findById(req.params.id);
  if (!flight) {
    return res.status(404).json({ message: "Flight not found" });
  }
  res.json(flight);
};

/**
 * ADMIN: Update flight
 */
export const updateFlight = async (req, res) => {
  const flight = await Flight.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!flight) {
    return res.status(404).json({ message: "Flight not found" });
  }

  res.json(flight);
};

/**
 * ADMIN: Delete flight
 */
export const deleteFlight = async (req, res) => {
  const flight = await Flight.findByIdAndDelete(req.params.id);
  if (!flight) {
    return res.status(404).json({ message: "Flight not found" });
  }
  res.json({ message: "Flight deleted successfully" });
};

