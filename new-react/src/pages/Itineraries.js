import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router";
import ItineraryItem from "../components/ItineraryItem";
import LoginContext from "../context/LoginContext";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Itineraries = ({ trips }) => {
  const { path, url } = useRouteMatch();
  // console.log("path", path);
  // console.log("url", url);

  const { token, loading } = useContext(LoginContext);
  const history = useHistory();

  console.log("trips", trips);

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
          <Link to={`itinerary/${itinerary.id}`}>{itinerary.name}</Link>
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
