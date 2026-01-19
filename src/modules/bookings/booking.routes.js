console.log("BOOKING.ROUTES FILE LOADED");
import express from "express";
import {
  createBooking,
  getBookingById,
  requestCancel,
  approveCancel
} from "./booking.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";
import { adminOnly } from "../../middlewares/role.middleware.js";

const router = express.Router();

// User routes
router.post("/", protect, createBooking);
router.get("/:id", protect, getBookingById);
router.put("/:id/cancel", protect, requestCancel);

// Admin route
router.put("/:id/approve-cancel", protect, adminOnly, approveCancel);

export default router;
