import express from "express";
import {
  createFlight,
  getFlights,
  getFlightById,
  updateFlight,
  deleteFlight
} from "./flight.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";
import { adminOnly } from "../../middlewares/role.middleware.js";

const router = express.Router();

// Public
router.get("/", getFlights);
router.get("/:id", getFlightById);

// Admin
router.post("/", protect, adminOnly, createFlight);
router.put("/:id", protect, adminOnly, updateFlight);
router.delete("/:id", protect, adminOnly, deleteFlight);

export default router;
