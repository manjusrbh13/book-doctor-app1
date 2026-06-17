import axios from "axios";

const API = "http://localhost:5000/api/appointments";

export const createAppointment = async (
  appointmentData
) => {
  const response = await axios.post(
    API,
    appointmentData
  );

  return response.data;
};