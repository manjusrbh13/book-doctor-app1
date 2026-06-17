import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import axios from "axios";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:5000/api/admin/stats"
      );

      setStats(response.data.stats);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-20">

        <h1 className="text-5xl font-bold text-center mb-4">
          Admin Dashboard
        </h1>

        <p className="text-center text-slate-400 mb-12">
          Platform Statistics
        </p>

        {loading ? (
          <Loader />
        ) : (
          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl text-center">
              <h2 className="text-5xl font-bold text-blue-400">
                {stats.totalPatients}
              </h2>
              <p className="mt-4 text-xl">
                Patients
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl text-center">
              <h2 className="text-5xl font-bold text-green-400">
                {stats.totalDoctors}
              </h2>
              <p className="mt-4 text-xl">
                Doctors
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl text-center">
              <h2 className="text-5xl font-bold text-purple-400">
                {stats.totalAppointments}
              </h2>
              <p className="mt-4 text-xl">
                Appointments
              </p>
            </div>

          </div>
        )}

      </div>
    </Layout>
  );
}

export default AdminDashboard;