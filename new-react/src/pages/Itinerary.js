import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import LoginContext from "../context/LoginContext";
import Days from "../components/Days";
import Activity from "../components/Activity";
import axios from "axios";

const Itinerary = ({ currentTrip }) => {
  //take the :id from url
  const params = useParams();
  const { token } = useContext(LoginContext);
  const history = useHistory();
  const [itinerary, setItinerary] = useState({});
  const [days, setDays] = useState([]);
  const [activities, setActivities] = useState([]);

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

  console.log("current trip", currentTrip);
  console.log("days", days, itinerary, activities);

  const primaryDays = days.filter((day) => day.day_type_id === 1);

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
    console.log("allOptions", allOptions);
    const dayActivities = activities.filter(
      (activity) => activity.day_id === Number(day.day.split(" ")[1])
    );

    return (
      <Days
        key={id}
        allOptions={allOptions}
        setDays={setDays}
        dayActivities={dayActivities}
      ></Days>
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
