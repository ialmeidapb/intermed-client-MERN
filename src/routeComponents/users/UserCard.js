import { Link } from "react-router-dom";
import "../patients/UsersCard.css";

function UserCard(props) {
  return (
    <Link
      className="text-decoration-none "
      key={props.user._id}
      to={`/users/${props.user._id}`}
    >
      <div
        className="card card-fixed-height text-dark shadow rounded border-0 m-2"
        style={{ width: "100%" }}
      >
        <img
          className="card-img product-img mx-auto mt-2"
          src={props.user.user_pic}
          alt="user"
        />
        <div className="card-body">
          <h4 className="card-title">
            <small>{props.user.name}</small>
          </h4>

          <p className="mb-0">
            <small className="card-text">{props.user.date_of_birth}</small>
          </p>

          <p className="card-text mb-0">
            <small>{props.user.gender}</small>
          </p>

          <p className="card-text mb-0">
            <small>{props.user.role}</small>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default UserCard;