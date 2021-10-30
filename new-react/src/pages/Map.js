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
  // const [onlySelectedActivities, setOnlySelectedActivities] = useState([]);

  const [itinerary, setItinerary] = useState({});
  const [days, setDays] = useState([]);
  const [activities, setActivities] = useState([]);
  const params = useParams();

  const [daysList, setDaysList] = useState([]);
  const [show, setShow] = useState(daysList);



  //----------------------- USE EFFECT 1
  useEffect(() => {
    console.log("--- USE EFFECT 1 ---")
    getData(params.id).then((data) => {
      console.log("--- USE EFFECT 1 ---, data that front end got back on MAP PAGE: ", data)
      console.log("--- USE EFFECT 1 --- params.id", params.id)
      setActivities(data.activities);
      setItinerary(data.itinerary);
      setDays(data.days);
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



  //----------------------- USE EFFECT 2
  useEffect(() => {
    console.log("--- USE EFFECT 2 ---")
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
    console.log("--- USE EFFECT 2 ---", {daysArray, daysList})
  }, [activities]);
  
  console.log("OUTSIDE USEEFFECT", {daysList, show})



  //----------------------- USE EFFECT 3
  //assign each day properties
  useEffect(() => {
    console.log("--- USE EFFECT 3 ---")
    console.log("--- USE EFFECT 3 --- daysList", daysList)
    const daysProps = {};
    daysList.forEach((day) => {
      daysProps[day] = {};
      daysProps[day].name = day;
      daysProps[day].visibility = true;
      daysProps[day].color = Math.floor(Math.random() * 16777215).toString(16);
    });

    console.log("--- USE EFFECT 3 --- daysProps", daysProps)
    setDayProperties(daysProps);
    console.log("--- USE EFFECT 3 --- dayProperties", dayProperties)
  }, [daysList]);

  console.log("OUTSIDE USEEFFECT - dayProperties", dayProperties)
  
  const handleCallback = (childData) => {
    setShow(childData); // childData = ["day1", "day2", "day3", "day4"]
  };



  //----------------------- USE EFFECT 4
  //create a filtered list of the days selected from the checkbox.
  useEffect(() => {
    console.log("--- USE EFFECT 4 ---", {show, filteredDays, daysList})
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

  console.log("OUTSIDE USEEFFECT - show", show)
  console.log("OUTSIDE USEEFFECT - filteredDays", filteredDays)



  //----------------------- USE EFFECT 5
  //show only the markers that are enabled on checkbox
  useEffect(() => {
    console.log("--- USE EFFECT 5 ---")
    console.log("--- USE EFFECT 5 --- filteredDays", filteredDays)
    console.log("--- USE EFFECT 5 --- dayProperties", dayProperties);
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
      {Object.keys(dayProperties).length > 0 && (
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
