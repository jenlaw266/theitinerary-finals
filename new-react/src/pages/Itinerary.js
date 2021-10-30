import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import LoginContext from "../context/LoginContext";
import Days from "../components/Days";
import Activity from "../components/Activity";
import axios from "axios";
import { Link } from "react-router-dom";
import DataContext from "../context/DataContext";

const Itinerary = ({ props }) => {
  //take the :id from url
  const params = useParams();
  const { token } = useContext(LoginContext);
  const history = useHistory();
  const [itinerary, setItinerary] = useState({});
  const [days, setDays] = useState([]);
  const [activities, setActivities] = useState([]);
  // const [selectedActivityIds, setSelectedActivityIds] = useState({});
  const [onlySelectedActivities, setOnlySelectedActivities] = useState([]);
  const { currentTrip, setSelectedActivties } = useContext(DataContext);

  // console.log("ITINERARY PAGE2 --> SELECTED ACTIVITIES", selectedActivities);

  useEffect(() => {
    getData(params.id).then((data) => {
      console.log("data that front end got back", data);
      // console.log("data ONLYselectedActivities", data.onlySelectedActivities);
      setActivities(data.activities);
      // setSelectedActivityIds(data.selectedActivityIds);
      setItinerary(data.itinerary);
      setDays(data.days);
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

  console.log("current trip", currentTrip);
  console.log("days", days);
  console.log("itin", itinerary);
  console.log("act", activities);
  // console.log("likedactivitiesids", selectedActivityIds);
  console.log("onlySelectedActivities", onlySelectedActivities);

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
        itineraryId={params.id}
        allOptions={allOptions}
        dayActivities={dayActivities}
      ></Days>
    );
  });

  // const likedActivitiesInfo = onlySelectedActivities.map((likedActivity) => {
  //   return (
  //     <Days
  //       key={id}
  //       allOptions={allOptions}
  //       setDays={setDays}
  //       dayActivities={dayActivities}
  //     ></Days>
  //   );
  //   <div>
  //     <h1>      </h1>
  //     <img src={likedActivity.image}></img>
  //     <h2>Name: {likedActivity.name}</h2>
  //     <h2>Location: {likedActivity.location} {likedActivity.itinerary_id}</h2>
  //     <h3>Day: Day {likedActivity.day_id}</h3>
  //   </div>
  // )
  // });

  return (
    <div>
      {!token && history.push("/login")}
      {dayTab}
      {/* {onlySelectedActivities.length ? (
        likedActivitiesInfo
      ) : (
        <h2>LOADING ITINERARY</h2>
      )} */}
    </div>
  );
};

export default Itinerary;
