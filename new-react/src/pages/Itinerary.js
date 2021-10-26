import { useContext } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import LoginContext from "../context/LoginContext";

const Itinerary = (props) => {
  //take the :id from url
  const params = useParams();
  const { token } = useContext(LoginContext);
  const history = useHistory();

  return (
    <div>
      {!token && history.push("/login")}

      <h1>location: {props.location}</h1>
      <h2>Link: {props.children}</h2>
      <h3>id: {params.id} </h3>
    </div>
  );
};

export default Itinerary;