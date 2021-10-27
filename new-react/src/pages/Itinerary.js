import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import LoginContext from "../context/LoginContext";
import Days from "../components/Days";
import axios from "axios";

const Itinerary = ({ currentTrip }) => {
  //take the :id from url
  const params = useParams();
  const { token } = useContext(LoginContext);
  const history = useHistory();
  const [itinerary, setItinerary] = useState({});
  const [days, setDays] = useState({});
  const [activities, setActivities] = useState({});

  useEffect(() => {
    console.log("useEffect in itinerary fired");
    async function handleCall() {
      const data = await getData({ id: params.id });
      setItinerary(data.itinerary);
      setDays(data.days);
      setActivities(data.activities);
    }

    handleCall();
  }, [params.id]);

  async function getData(id) {
    return fetch("http://localhost:8080/api/itinerary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    }).then((data) => {
      return data.json();
    });
  }

  // console.log("current trip", currentTrip);
  console.log("days", days);
  // console.log("itin", itinerary);
  // console.log("act", activities);

  return (
    <div>
      {!token && history.push("/login")}
      <Days></Days>
    </div>
  );
};

export default Itinerary;
