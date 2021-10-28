import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import LoginContext from "../context/LoginContext";
import axios from "axios";
import { Link } from "react-router-dom";
import DataContext from "../context/DataContext";

const Itinerary = ({ props }) => {
  //take the :id from url
  const params = useParams();
  const { token } = useContext(LoginContext);
  const history = useHistory();
  const [itinerary, setItinerary] = useState({});
  const [days, setDays] = useState({});
  const [activities, setActivities] = useState({});
  const [selectedActivitiesIds, setSelectedActivitiesIds] = useState({});
  const { selectedActivities } = useContext(DataContext);

  console.log("ITINERARY PAGE --> SELECTED ACTIVITIES", selectedActivities);

  useEffect(() => {
    async function handleCall() {
      const data = await getData({ id: params.id, act: selectedActivities });
      setItinerary(data.itinerary);
      setDays(data.days);
      setActivities(data.activities);
      setSelectedActivitiesIds(data.selectedActivityIds);
    }

    handleCall();
  }, [params.id]);

  async function getData(id) {
    return fetch("http://localhost:8080/api/itinerary/:id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify(id),
    }).then((data) => data.json());
  }

  //axios get request 

  // console.log("current trip", currentTrip);
  console.log("days", days);
  console.log("itin", itinerary);
  console.log("act", activities);
  console.log("likedactivities", selectedActivitiesIds);

  return (
    <div>
      {!token && history.push("/login")}

      {/*  <h1> {days}</h1>
      <h2>{itinerary}</h2>
      <h3> {activities} </h3> */}
    </div>
  );
};

export default Itinerary;
