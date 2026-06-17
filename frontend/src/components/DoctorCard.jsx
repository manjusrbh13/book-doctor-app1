import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaUserMd, FaStar } from "react-icons/fa";

function DoctorCard({
  doctorId,
  name,
  specialization,
  fee,
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-[320px]"
    >
      <div className="h-20 bg-gradient-to-r from-blue-600 to-cyan-500"></div>

      <div className="p-4 text-center pb-3">

        <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center mx-auto -mt-12 border-4 border-white shadow-lg">
          <FaUserMd
            size={32}
            className="text-blue-600"
          />
        </div>

        <h2 className="text-lg font-bold text-slate-800 mt-2">
          {name}
        </h2>

        <p className="text-slate-500 text-sm">
          {specialization}
        </p>

        <div className="flex justify-center items-center gap-1 mt-2">
          <FaStar className="text-yellow-500" />
          <span className="font-semibold text-sm">
            4.9
          </span>
        </div>

        <h3 className="text-xl font-bold text-blue-600 mt-2">
          ₹{fee}
        </h3>

        <Link
          to={`/book-appointment/${doctorId}`}
          className="block mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold transition"
        >
          Book Appointment
        </Link>

      </div>
    </motion.div>
  );
}

export default DoctorCard;