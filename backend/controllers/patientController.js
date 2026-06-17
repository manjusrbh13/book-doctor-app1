const Appointment = require("../models/Appointment");

exports.getPatientAppointments = async (req, res) => {
  try {
    const { patientId } = req.params;

    const appointments = await Appointment.find({
      patientId,
    })
      .populate("patientId")
      .populate({
        path: "doctorId",
        populate: {
          path: "userId",
        },
      });

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};