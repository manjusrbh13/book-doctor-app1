import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import DoctorCard from "../components/DoctorCard";
import Loader from "../components/Loader";
import { getDoctors } from "../services/doctorService";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);

      const data = await getDoctors();

      setDoctors(data.doctors);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.specialization
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-20">

        <h1 className="text-5xl font-bold text-center mb-4">
          Our Doctors
        </h1>

        <p className="text-center text-slate-400 mb-12">
          Choose from experienced specialists.
        </p>

        {/* Search Bar */}
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="🔍 Search by specialization..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full max-w-2xl p-4 rounded-2xl bg-white text-black border border-gray-300 shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500"
          />
        </div>

        {/* BIG SPACE AFTER SEARCH BAR */}
        <div className="h-24"></div>

        {loading ? (
          <Loader />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">

            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor._id}
                  doctorId={doctor._id}
                  name={doctor.userId?.name}
                  specialization={doctor.specialization}
                  fee={doctor.consultationFee}
                />
              ))
            ) : (
              <div className="col-span-3 text-center text-slate-400 text-xl">
                No doctors found
              </div>
            )}

          </div>
        )}

      </div>
    </Layout>
  );
}

export default Doctors;