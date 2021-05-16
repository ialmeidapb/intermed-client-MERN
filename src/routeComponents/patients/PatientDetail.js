import { useState, useEffect, useContext } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

import api from "../../apis/api";
import { AuthContext } from "../../contexts/authContext";
import "./UsersCard.css";

function PatientDetails() {
  const [state, setState] = useState({
    address: {
      street: "",
      neighbourhood: "",
      city: "",
      postCode: "",
      stateOrProvince: "",
      country: "",
    },
    _id: "",
    name: "",
    email: "",
    social_security_number: 0,
    user_pic: "",
    date_of_birth: "",
    gender: "",
    records: [
      {
        allergy: [],
        chief_complaint: "",
        history_illness: "",
        medications: [],
        test_results: "",
        date_of_visit: "",
      },
    ],
  });
  const [showModal, setShowModal] = useState(false);

  // Equivalente a usar o props.match.params.id
  const { id } = useParams();
  const history = useHistory();

  const { loggedInUser } = useContext(AuthContext);

  useEffect(() => {
    async function fetchBeer() {
      try {
        const response = await api.get(`/patients/${id}`);

        setState({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchBeer();
  }, [id]);

  return (
    
    <div>
    {loggedInUser.user.role === "DOCTOR" ? (
        <div className="row d-flex justify-content-end">
          <Link to={`/patients/record/${id}`} className="btn btn-warning mr-3">
            Create Record
          </Link>

        </div>
      ) : null}
      <img className="profile-pic" src={state.user_pic} alt="user" />
      <div>
        <h4>
          <small>{state.name}</small>
        </h4>

        <p>Patient ID:{state._id}</p>

        <p>{state.social_security_number}</p>

        <p>{state.gender}</p>

        <p>
          <small>
            Date of Birthday: {new Date(state.date_of_birth).toLocaleString()}
          </small>
        </p>

        <h2>Address Info</h2>
        <hr />

        <ul>
          <li>
            <strong>Post Code: </strong>
            {state.address.postCode}
          </li>
          <li>
            <strong>Street: </strong>
            {state.address.street}
          </li>
          <li>
            <strong>Neighbourhood: </strong>
            {state.address.neighbourhood}
          </li>
          <li>
            <strong>City: </strong>
            {state.address.city}
          </li>
          <li>
            <strong>State or Province: </strong>
            {state.address.stateOrProvince}
          </li>
          <li>
            <strong>Country: </strong>
            {state.address.country}
          </li>
        </ul>

        

        {state.records.map((record) => {
          if (record) {
            return (
              <div>
              <h2>Record Information of {record.date_of_visit}</h2>
              <hr/>
              <ul>
                
                <li>
                  <strong>Chief Complaint: </strong>
                  {record.chief_complaint}
                </li>
                <li>
                  <strong>History Illness:: </strong>
                  {record.history_illness}
                </li>

                <li>
                  <strong>Allergy: </strong>
                  {record.allergy}
                </li>

                <li>
                  <strong>Medications: </strong>
                  {record.medications}
                </li>

                <li>
                  <strong>Test Results: </strong>
                  {record.test_results}
                </li>
              </ul>

              </div>
              
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}

export default PatientDetails;
