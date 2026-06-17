const express = require("express");

const {
  getDoctorAppointments,
  updateAppointmentStatus,
} = require("../controllers/doctorDashboardController");

const router = express.Router();

router.get(
  "/appointments/:doctorId",
  getDoctorAppointments
);

router.put(
  "/appointment/:appointmentId",
  updateAppointmentStatus
);

module.exports = router;