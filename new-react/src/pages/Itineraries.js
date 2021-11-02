import { useContext } from "react";
import { Link } from "react-router-dom";
import ItineraryItem from "../components/ItineraryItem";
import LoginContext from "../context/LoginContext";
import { useHistory } from "react-router-dom";
import "../components/Itineraries.scss";

const Itineraries = ({ trips }) => {
  const { token, loading } = useContext(LoginContext);
  const history = useHistory();

  if (loading) {
    return <div className="App">Loading...</div>;
  }

  const trip = trips
    .slice(0)
    .reverse()
    .map((itinerary) => {
      return (
        <ItineraryItem
          key={itinerary.id}
          id={itinerary.id}
          name={itinerary.name}
          completed={itinerary.completed}
          start_date={itinerary.start_date}
          end_date={itinerary.end_date}
        >
          <Link className="itinerary-link" to={`itinerary/${itinerary.id}`}>{itinerary.name}</Link>
        </ItineraryItem>
      );
    });

  return (
    <div>
      {!token && history.push("/login")}
      <h1 className="itineraries-title">Itineraries</h1>
      {trip}
    </div>
  );
};

export default Itineraries;
