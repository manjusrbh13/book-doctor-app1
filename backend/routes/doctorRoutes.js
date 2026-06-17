const express = require("express");

const {
  createDoctor,
  getAllDoctors,
} = require("../controllers/doctorController");

const router = express.Router();

router.post("/", createDoctor);

router.get("/", getAllDoctors);

module.exports = router;