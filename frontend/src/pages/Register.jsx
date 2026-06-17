import { useState } from "react";
import Layout from "../components/Layout";
import { registerUser } from "../services/authService";
import toast from "react-hot-toast";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
    phone: "",
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
      const data = await registerUser(formData);

      toast.success(data.message);

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "patient",
        phone: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen px-6">

        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-3xl">

          <h1 className="text-4xl font-bold text-center mb-8">
            Register
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 rounded-xl text-black"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 rounded-xl text-black"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-4 rounded-xl text-black"
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-4 rounded-xl text-black"
              required
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-4 rounded-xl text-black"
            >
              <option value="patient">
                Patient
              </option>

              <option value="doctor">
                Doctor
              </option>
            </select>

            <button
              type="submit"
              className="w-full bg-blue-600 py-4 rounded-xl hover:bg-blue-700 transition"
            >
              Register
            </button>

          </form>

        </div>

      </div>
    </Layout>
  );
}

export default Register;