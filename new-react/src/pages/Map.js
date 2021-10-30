import { useEffect, useState, useContext } from "react";
// import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from "react-router";
import GoogleMapReact from "google-map-react";
import LocationMarker from "../components/Map/LocationMarker";
import LocationInfoBox from "../components/Map/LocationInfoBox";
import DaysCheckbox from "../components/Map/Checkbox";
import { useHistory } from "react-router-dom";
import LoginContext from "../context/LoginContext";
import DataContext from "../context/DataContext";


const Map = ({ eventData, center, zoom }) => {
  const [locationInfo, setLocationInfo] = useState(null);
  const [filteredDays, setFilteredDays] = useState([]);
  const history = useHistory();
  const { token } = useContext(LoginContext);
  const { currentTrip, selectedActivities } = useContext(DataContext);
  const [dayProperties, setDayProperties] = useState([]);
  const [markers, setMarkers] = useState(null);
  const [onlySelectedActivities, setOnlySelectedActivities] = useState([]);

  const [itinerary, setItinerary] = useState({});
  const [days, setDays] = useState([]);
  const [activities, setActivities] = useState([]);
  const params = useParams();

  const [daysList, setDaysList] = useState([]);
  const [show, setShow] = useState(daysList);

  //-----------------------

  useEffect(() => {
    getData(params.id).then((data) => {
      console.log("data that front end got back - mapp page", data);
      console.log("params.id", params.id);
      // console.log("data ONLYselectedActivities", data.onlySelectedActivities);
      setActivities(data.activities);
      // setSelectedActivityIds(data.selectedActivityIds);
      setItinerary(data.itinerary);
      setDays(data.days);
      // setOnlySelectedActivities(data.onlySelectedActivities); */
      console.log("MAP PAGE ---- activities", activities)
      console.log("MAP PAGE ---- days", days)
      console.log("MAP PAGE ---- itinerary", itinerary)
    });
  }, [params.id]);

  async function getData(id) {
    return fetch(`http://localhost:8080/api/itinerary/${id}/map`, {
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


 //----------------------
  // useEffect(() => {
  //   console.log("useEffect in itinerary fired");
  //   async function handleCall() {
  //     const data = await getData({ id: params.id, act: selectedActivities });
  //     setOnlySelectedActivities(data.onlySelectedActivities)
  //   }


  //   handleCall();

  // }, [params.id]);

  // async function getData(id) {
  //   return fetch("http://localhost:8080/api/itinerary", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     }, 
  //     body: JSON.stringify(id),
  //   }).then((data) => {
  //     return data.json();
  //   });
  // }
  // //----------------------

  useEffect(() => {
    const uniqueDays = (activities) => {
      const allDays = [];
      activities.map((activity) => allDays.push(activity.day_id));
  
      const days = allDays.filter(
        (value, index, self) => self.indexOf(value) === index
      );
  
      return days.sort();
    };
  
    let daysArray = uniqueDays(activities);
    setDaysList(daysArray);
    setShow(daysArray);
    console.log({daysArray, daysList})
  }, [activities]);
  
  console.log("outside useeffect", {daysList, show})

  //assign each day properties
  useEffect(() => {
    const daysProps = {};
    daysList.forEach((day) => {
      daysProps[day] = {};
      daysProps[day].name = day;
      daysProps[day].visibility = true;
      daysProps[day].color = Math.floor(Math.random() * 16777215).toString(16);
    });

    console.log("daysProps", daysProps)
    setDayProperties(daysProps);
    console.log("dayProperties inside useeffect", dayProperties)
  }, [daysList]);

  console.log("dayProperties outside useeffect", dayProperties)
  
  const handleCallback = (childData) => {
    setShow(childData); // childData = ["day1", "day2", "day3", "day4"]
  };

  //create a filtered list of the days selected from the checkbox.
  useEffect(() => {
    console.log("USEEFFECT - ", {show, filteredDays, daysList})
    if (show.length === daysList.length) {
      setFilteredDays(activities);
    } else {
      const newFilteredDays = activities.filter((activity) => {
        if (show.includes(activity.day_id)) {
          return activity;
        }
      });

      setFilteredDays(newFilteredDays);
    }
  }, [show]);

  console.log("show outside useeffect", show)
  console.log("filteredDays outside useeffect", filteredDays)

  //show only the markers that are enabled on checkbox
  useEffect(() => {
    console.log("INSIDE USEFFECT - filteredDays", filteredDays)
    console.log("INSIDE USEFFECT - dayProperties", dayProperties);
    setMarkers(
      filteredDays.map((activity) => {
        const dayNameFromEvent = activity.day_id;

        const assignedColor = !dayProperties ? "000000" : dayProperties[dayNameFromEvent].color;
        // const assignedColor = '000000'
        // console.log(assignedColor);

        return (
          <LocationMarker
            key={activity.name}
            lat={activity.lat}
            lng={activity.long}
            onClick={() =>
              setLocationInfo({
                name: activity.name,
                day_id: activity.day_id,
                image: activity.image,
              })
            }
            color={assignedColor}
          />
        );
      })
    );
  }, [filteredDays, dayProperties]);

  // // console.log(" MAP current", currentTrip);
  // // console.log(" MAP selectedActivitiesIds", selectedActivities);
  // console.log(" MAP onlySelectedActivities", onlySelectedActivities);
  // console.log(" day props", dayProperties);

  const start_date = new Date(itinerary.start_date);
  const end_date = new Date(itinerary.end_date);

  return (
    <div className="map">
      {!token && history.push("/login")}
      <h2>{itinerary.name} Tripz</h2>
      <h3>{start_date.toDateString()} to {end_date.toDateString()}</h3>
      <GoogleMapReact
        bootstrapURLKeys={{
          key:
            // process.env.REACT_GOOGLE_MAP_API
            "AIzaSyBTwu8B2_jxWotAM4c_9uEJJJoTmiBE7Aw",
        }}
        defaultCenter={center}
        defaultZoom={zoom}
        // onLoad={onLoad}
      >
        {markers}
      </GoogleMapReact>
      {locationInfo && <LocationInfoBox info={locationInfo} />}
      {dayProperties && (
        <DaysCheckbox
          daysList={daysList}
          dayProperties={dayProperties}
          parentCallback={handleCallback}
        />
      )}
    </div>
  );

  // return (
  //   <div className="map">
  //     {!token && history.push("/login")}
  //     <h2>{itinerary.name} Tripz</h2>
  //     <h3>{start_date.toDateString()} to {end_date.toDateString()}</h3>
  //   </div>
  // );
};


//need to swwap out the center default to average center from all points.
Map.defaultProps = {
  center: {
    lat: 49.2827,
    lng: -123.1207,
  },
  zoom: 12,
};

export default Map;
