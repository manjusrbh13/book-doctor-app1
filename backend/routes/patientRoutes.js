const express = require("express");

const {
  getPatientAppointments,
} = require("../controllers/patientController");

const router = express.Router();

router.get(
  "/appointments/:patientId",
  getPatientAppointments
);

module.exports = router;