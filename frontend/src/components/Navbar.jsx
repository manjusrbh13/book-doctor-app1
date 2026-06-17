import { Link, useNavigate } from "react-router-dom";
import { FaUserMd } from "react-icons/fa";
import { motion } from "framer-motion";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-lg border-b border-slate-800">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="flex items-center gap-2 text-3xl font-bold text-blue-400"
        >
          <FaUserMd className="text-4xl" />
          BookDoctor
        </Link>

        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="text-slate-300 hover:text-blue-400"
          >
            Home
          </Link>

          <Link
            to="/doctors"
            className="text-slate-300 hover:text-blue-400"
          >
            Doctors
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                className="text-slate-300 hover:text-blue-400"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to={
                  user.role === "patient"
                    ? "/patient-dashboard"
                    : user.role === "doctor"
                    ? "/doctor-dashboard"
                    : "/admin-dashboard"
                }
                className="text-slate-300 hover:text-blue-400"
              >
                Dashboard
              </Link>

              <span className="text-green-400 font-medium">
                {user.name}
              </span>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="bg-red-500 px-4 py-2 rounded-xl text-white hover:bg-red-600"
              >
                Logout
              </motion.button>
            </>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;