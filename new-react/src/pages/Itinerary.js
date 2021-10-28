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
    return fetch("http://localhost:8080/api/itinerary/:id", {
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

  const fakeDay = {
    id: 4,
    day: "Day 1",
    day_type_id: 1,
    itinerary_id: 2,
  };

  const fakeAltDay = {
    id: 6,
    day: "Day 1 Alt 1",
    day_type_id: 2,
    itinerary_id: 2,
  };

  const primaryDays = days.filter((day) => day.day_type_id === 1);
  const altDays = days.filter((day) => day.day_type_id !== 1);

  const dayTab = primaryDays.map((day, id) => {
    const alt = altDays.map((altDay) => {
      if (day.day.split(" ")[1] === altDay.day.split(" ")[1]) {
        return altDay;
      }
    });
    const allOptions = [day].concat(alt);

    const dayActivities = activities.filter(
      (activity) => activity.day_id === Number(day.day.split(" ")[1])
    );
    const activityCard = dayActivities.map((activity, id) => {
      return (
        <Activity
          key={id}
          name={activity.name}
          city={activity.location}
          img={activity.image}
        />
      );
    });
    return (
      <Days key={id} day={day.day} allOptions={allOptions}>
        {activityCard}
      </Days>
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
