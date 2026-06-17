import { useState } from "react";
import Layout from "../components/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { createAppointment } from "../services/appointmentService";
import toast from "react-hot-toast";

function BookAppointment() {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [formData, setFormData] = useState({
    appointmentDate: "",
    appointmentTime: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const appointmentData = {
        patientId: user._id,
        doctorId,
        appointmentDate:
          formData.appointmentDate,
        appointmentTime:
          formData.appointmentTime,
      };

      const data =
        await createAppointment(
          appointmentData
        );

      toast.success(data.message);

      navigate("/patient-dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Appointment Failed"
      );
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen px-6">

        <div className="w-full max-w-xl bg-white/10 backdrop-blur-xl p-8 rounded-3xl">

          <h1 className="text-4xl font-bold text-center mb-8">
            Book Appointment
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              value={doctorId}
              readOnly
              className="w-full p-4 rounded-xl bg-white text-black"
            />

            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-white text-black"
              required
            />

            <input
              type="time"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-white text-black"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 py-4 rounded-xl hover:bg-blue-700 transition"
            >
              Book Appointment
            </button>

          </form>

        </div>

      </div>
    </Layout>
  );
}

export default BookAppointment;