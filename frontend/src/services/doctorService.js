import axios from "axios";

const API = "http://localhost:5000/api";

export const getDoctors = async () => {
  const response = await axios.get(
    `${API}/doctors`
  );

  return response.data;
};