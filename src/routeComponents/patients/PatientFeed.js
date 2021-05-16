import { useState, useEffect } from "react";
import PatientCard from "./PatientCard";
import api from "../../apis/api";

function PatientFeed() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    async function fetchPatients() {
      try {
        const response = await api.get("/patients");

        setPatients([...response.data]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPatients();
  }, []);

  return (
    <div className="row">
      {patients.map((patient) => {
        return (
          <div key={patient._id} className="col-12 col-sm-4 col-md-3">
            <PatientCard patient={patient} />
          </div>
        );
      })}
    </div>
  );
}

export default PatientFeed;