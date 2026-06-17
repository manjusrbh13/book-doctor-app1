const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalPatients = await User.countDocuments({
      role: "patient",
    });

    const totalDoctors = await User.countDocuments({
      role: "doctor",
    });

    const totalAppointments =
      await Appointment.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        totalPatients,
        totalDoctors,
        totalAppointments,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};