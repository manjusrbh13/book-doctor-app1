import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import axios from "axios";

function DoctorDashboard() {
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
        `http://localhost:5000/api/doctor/appointments/${user.doctorId}`
      );

      setAppointments(response.data.appointments);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (appointmentId, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/doctor/appointment/${appointmentId}`,
        { status }
      );

      fetchAppointments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-20">

        <h1 className="text-5xl font-bold text-center mb-4">
          Welcome Dr. {user?.name}
        </h1>

        <p className="text-center text-slate-400 mb-12">
          Manage Patient Appointments
        </p>

        {loading ? (
          <Loader />
        ) : (
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-8">
              Appointments
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
                      {appointment.patientId?.name}
                    </h3>

                    <p className="mt-2">
                      Date: {appointment.appointmentDate}
                    </p>

                    <p>
                      Time: {appointment.appointmentTime}
                    </p>

                    <p className="mb-4">
                      Status:{" "}
                      <span className="text-green-400">
                        {appointment.status}
                      </span>
                    </p>

                    <div className="flex gap-4">

                      <button
                        onClick={() =>
                          updateStatus(
                            appointment._id,
                            "Approved"
                          )
                        }
                        className="bg-green-600 px-5 py-2 rounded-xl hover:bg-green-700"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            appointment._id,
                            "Rejected"
                          )
                        }
                        className="bg-red-600 px-5 py-2 rounded-xl hover:bg-red-700"
                      >
                        Reject
                      </button>

                    </div>

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

export default DoctorDashboard;