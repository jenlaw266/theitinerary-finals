import { useContext } from "react";
import { Link } from "react-router-dom";
import ItineraryItem from "../components/ItineraryItem";
import LoginContext from "../context/LoginContext";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { animationPages } from "../animations/index.js"
import "../styles/itineraries.scss";

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
        <motion.div initial="out" animate="end" exit="out" variants={animationPages}>
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
        </motion.div>
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
