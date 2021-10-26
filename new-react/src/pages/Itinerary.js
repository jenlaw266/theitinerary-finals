import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import LoginContext from "../context/LoginContext";
import axios from "axios";

const Itinerary = (props) => {
  //take the :id from url
  const params = useParams();
  const { token } = useContext(LoginContext);
  const history = useHistory();
  const [itinerary, setItinerary] = useState({})
  const [days, setDays] = useState({})
  const [activities, setActivities] = useState({})

  useEffect(() => {
    async function handleCall() {
      const data = await getData({id: params.id})
      setItinerary(data.itinerary);
      setDays(data.days);
      setActivities(data.activities);
    }

    handleCall();
  }, [params.id])

  async function getData(id) {
    return fetch("http://localhost:8080/api/itinerary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    }).then((data) => data.json());
  }

  console.log('days', days)
  console.log('itin', itinerary)
  console.log('act', activities)

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