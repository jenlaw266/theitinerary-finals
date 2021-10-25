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
  const [trips, setTrips] = useState();
  console.log("path", path);
  console.log("url", url);

  useEffect(() => {
    const fetchData = () => {
      axios.get("http://localhost:8080/api/itineraries")
      .then((response) => {
        setTrips({
          itineraries: response.data
        });
      });
    };

  }, []);


  const trip = archivedTrips.map((city, id) => {
    return (
      <Itinerary key={id} location={city.location}>
        <Link to={`itinerary/${id}`}>{id}</Link>
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
