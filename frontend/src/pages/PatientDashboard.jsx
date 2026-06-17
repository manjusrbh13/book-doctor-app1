import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import axios from "axios";

function PatientDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `http://localhost:5000/api/patient/appointments/${user._id}`
      );

      setAppointments(response.data.appointments);
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
          Welcome {user?.name}
        </h1>

        <p className="text-center text-slate-400 mb-12">
          Manage your appointments
        </p>

        {loading ? (
          <Loader />
        ) : (
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-8">
              My Appointments
            </h2>

            {appointments.length === 0 ? (
              <p className="text-slate-400">
                No appointments found
              </p>
            ) : (
              <div className="space-y-6">

                {appointments.map((appointment) => (
                  <div
                    key={appointment._id}
                    className="bg-white/5 p-6 rounded-2xl border border-white/10"
                  >
                    <h3 className="text-2xl font-semibold text-blue-400">
                      {appointment.doctorId?.userId?.name}
                    </h3>

                    <p className="mt-2">
                      Date: {appointment.appointmentDate}
                    </p>

                    <p>
                      Time: {appointment.appointmentTime}
                    </p>

                    <p>
                      Status:{" "}
                      <span className="text-green-400">
                        {appointment.status}
                      </span>
                    </p>
                  </div>
                ))}

              </div>
            )}

          </div>
        )}

      </div>
    </Layout>
  );
}

export default PatientDashboard;