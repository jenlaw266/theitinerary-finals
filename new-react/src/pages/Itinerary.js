import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import LoginContext from "../context/LoginContext";
import Day from "../components/Day";
import axios from "axios";
import { Link } from "react-router-dom";

const Itinerary = ({ props }) => {
  //take the :id from url
  const params = useParams();
  const { token } = useContext(LoginContext);
  const history = useHistory();
  const [itinerary, setItinerary] = useState({});
  const [days, setDays] = useState([]);
  const [activities, setActivities] = useState([]);
  const [allNonSelectedActivities, setAllNonSelectedActivities] = useState([]);
  // const [selectedActivityIds, setSelectedActivityIds] = useState({});
  // const [onlySelectedActivities, setOnlySelectedActivities] = useState([]);

  useEffect(() => {
    getData(params.id).then((data) => {
      console.log("data that front end got back", data);
      setActivities(data.activities);
      // setSelectedActivityIds(data.selectedActivityIds);
      setItinerary(data.itinerary);
      setDays(data.days);
      setAllNonSelectedActivities(data.allActivities);
      // setOnlySelectedActivities(data.onlySelectedActivities); */
    });
  }, [params.id]);

  async function getData(id) {
    return fetch(`http://localhost:8080/api/itinerary/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: { id }, //use this when passing an object/variable to the backend
    }).then((data) => {
      // setSelectedActivities()
      return data.json();
    });
  }

  // console.log("days", days);
  // console.log("itin", itinerary);
  // console.log("act", activities);

  const primaryDays = days.filter((day) => day.day_type_id === 1);
  // console.log("primaryDays from itinerary", primaryDays)

  const dayTab = primaryDays.map((day, id) => {
    const dayNum = day.day[4];

    const altDays = days.filter(
      (alt) => alt.day_type_id !== 1 && alt.day[4] === dayNum
    );

    const alt = altDays.map((altDay) => {
      if (day.day[4] === altDay.day[4]) {
        return altDay;
      }
    });

    const allOptions = [day].concat(alt);

    // console.log("allOptions", allOptions);

    // console.log("dayActivities", dayActivities);
    return (
      <Day
        key={id}
        itineraryId={params.id}
        allOptions={allOptions}
        allNonSelectedActivities={allNonSelectedActivities}
        setAllNonSelectedActivities={setAllNonSelectedActivities}
        setActivities={setActivities}
        activities={activities}
        days={days}
        setDays={setDays}
      ></Day>
    );
  });

  return (
    <div>
      {!token && history.push("/login")}
      {dayTab}
    </div>
  );
};

export default Itinerary;
