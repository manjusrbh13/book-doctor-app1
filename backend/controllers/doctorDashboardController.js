const Appointment = require("../models/Appointment");

exports.getDoctorAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const appointments = await Appointment.find({
      doctorId,
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

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const { status } = req.body;

    const appointment =
      await Appointment.findByIdAndUpdate(
        appointmentId,
        { status },
        { new: true }
      );

    res.status(200).json({
      success: true,
      message: "Appointment updated",
      appointment,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};