import { useContext } from "react";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router";
import ItineraryItem from "../components/ItineraryItem";
import LoginContext from "../context/LoginContext";
import { useHistory } from "react-router-dom";

const archivedTrips = [
  {
    location: "London",
    link: "somelink1",
  },
  {
    location: "Vancouver",
    link: "somelink1",
  },
  {
    location: "Calgary",
    link: "somelink1",
  },
];

const Itineraries = () => {
  const { path, url } = useRouteMatch();
  console.log("path", path);
  console.log("url", url);

  const { token } = useContext(LoginContext);
  const history = useHistory();

  const trip = archivedTrips.map((city, id) => {
    return (
      <ItineraryItem key={id} location={city.location}>
        <Link to={`itinerary/${id}`}>{city.location}</Link>
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
