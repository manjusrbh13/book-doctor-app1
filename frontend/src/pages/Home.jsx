import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DoctorCard from "../components/DoctorCard";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { getDoctors } from "../services/doctorService";

function Home() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const data = await getDoctors();
      setDoctors(data.doctors);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <main className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">

          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto text-center"
          >
            <p className="uppercase tracking-[6px] text-blue-400 font-semibold mb-6">
              Healthcare Made Easy
            </p>

            <h1 className="text-6xl md:text-8xl font-extrabold leading-tight mb-8">
              Find & Book
              <span className="text-blue-400">
                {" "}Trusted Doctors
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-12">
              Connect with experienced doctors,
              schedule appointments and manage
              your healthcare journey from anywhere.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">

              <Link
                to="/doctors"
                className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105"
              >
                Browse Doctors
              </Link>

              <Link
                to="/register"
                className="border border-blue-500 hover:bg-blue-500/10 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105"
              >
                Get Started
              </Link>

            </div>
          </motion.div>

        </section>

        {/* Stats */}
        <section className="max-w-7xl mx-auto px-6 pb-24">

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center">
              <h2 className="text-5xl font-bold text-blue-400">
                6
              </h2>
              <p className="mt-3 text-slate-300">
                Expert Doctors
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center">
              <h2 className="text-5xl font-bold text-green-400">
                500+
              </h2>
              <p className="mt-3 text-slate-300">
                Happy Patients
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center">
              <h2 className="text-5xl font-bold text-purple-400">
                1000+
              </h2>
              <p className="mt-3 text-slate-300">
                Appointments
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center">
              <h2 className="text-5xl font-bold text-orange-400">
                24/7
              </h2>
              <p className="mt-3 text-slate-300">
                Support
              </p>
            </div>

          </div>

        </section>

        {/* Featured Doctors */}
        <section className="max-w-7xl mx-auto px-6 py-24">

          <h2 className="text-5xl font-bold text-center mb-4">
            Featured Doctors
          </h2>

          <p className="text-slate-400 text-center mb-20">
            Meet our highly experienced specialists.
          </p>

          <div className="grid md:grid-cols-3 gap-8">

            {doctors.slice(0, 6).map((doctor) => (
              <DoctorCard
                key={doctor._id}
                doctorId={doctor._id}
                name={doctor.userId?.name}
                specialization={doctor.specialization}
                fee={doctor.consultationFee}
              />
            ))}

          </div>

        </section>

        <Footer />

      </main>
    </>
  );
}

export default Home;