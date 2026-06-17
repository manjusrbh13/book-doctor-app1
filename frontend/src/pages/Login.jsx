import { useState } from "react";
import Layout from "../components/Layout";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const data = await loginUser(formData);

      localStorage.setItem(
        "token",
        data.token
      );

      const userData = {
        ...data.user,
        doctorId: data.doctorId,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

      toast.success("Login Successful");

      // Role Based Navigation
      if (data.user.role === "patient") {
        navigate("/patient-dashboard");
      } else if (data.user.role === "doctor") {
        navigate("/doctor-dashboard");
      } else if (data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen px-6">

        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl">

          <h1 className="text-4xl font-bold text-center mb-8">
            Login
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-white text-black border border-gray-300 outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-white text-black border border-gray-300 outline-none"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 py-4 rounded-xl hover:bg-blue-700 transition duration-300 font-semibold"
            >
              Login
            </button>

          </form>

        </div>

      </div>
    </Layout>
  );
}

export default Login;