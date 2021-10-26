import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router";
import { useState, useEffect } from "react";
import Itinerary from "./Itinerary";
import axios from "axios";

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
  const [isLoading, setLoading] = useState(true);
  const [trips, setTrips] = useState()
  console.log("path", path);
  console.log("url", url);

  useEffect(() => {
    axios.get("http://localhost:8080/api/itineraries")
    .then(response => {
      setTrips(response.data.itineraries);
      setLoading(false);
    });
  }, []);
  console.log(trips)

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  const trip = trips.map((itinerary) => {
    return (
      <Itinerary key={itinerary.id} location={itinerary.name}>
        <Link to={`itinerary/${itinerary.id}`}>{itinerary.id}</Link>
      </Itinerary>
    );
  });
  return (
    <div>
      <h1>Itineraries page</h1>
      {trip}
    </div>
  );
};

export default Itineraries;
