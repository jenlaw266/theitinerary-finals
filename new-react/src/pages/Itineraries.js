import { useContext } from "react";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router";
import ItineraryItem from "../components/ItineraryItem";
import LoginContext from "../context/LoginContext";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Itineraries = () => {
  const { path, url } = useRouteMatch();
  const [isLoading, setLoading] = useState(true);
  const [trips, setTrips] = useState();
  // console.log("path", path);
  // console.log("url", url);

  const { token } = useContext(LoginContext);
  const history = useHistory();

  useEffect(() => {
    axios.get("http://localhost:8080/api/itineraries").then((response) => {
      setTrips(response.data.itineraries);
      setLoading(false);
    });
  }, []);
  console.log("trips", trips);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  const trip = trips.map((itinerary) => {
    return (
      <ItineraryItem key={itinerary.id} location={itinerary.name}>
        <Link to={`itinerary/${itinerary.id}`}>{itinerary.id}</Link>
      </ItineraryItem>
    );
  });

  return (
    <div>
      {!token && history.push("/login")}
      <h1>Itineraries page</h1>
      {trip}
    </div>
  );
};

export default Itineraries;
