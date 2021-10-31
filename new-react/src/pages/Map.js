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


const Map = ({ zoom }) => {
  const [locationInfo, setLocationInfo] = useState(null);
  const [filteredDays, setFilteredDays] = useState([]);
  const history = useHistory();
  const { token } = useContext(LoginContext);
  const [dayProperties, setDayProperties] = useState([]);
  const [markers, setMarkers] = useState(null);
  const [itinerary, setItinerary] = useState({});
  const [days, setDays] = useState([]);
  const [activities, setActivities] = useState([]);
  const params = useParams();
  const [daysList, setDaysList] = useState([]);
  const [show, setShow] = useState(daysList);
  const [center, setCenter] = useState({ lat: 49.2827, lng: -123.1207 })



  //----------------------- USE EFFECT 1
  useEffect(() => {
    getData(params.id).then((data) => {
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
    }).then((data) => {
      return data.json();
    });
  }



  //----------------------- USE EFFECT 2
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
  }, [activities]);

  //----------------------- USE EFFECT 3
  //assign each day properties
  useEffect(() => {

    const dayIdWithName = {};
    for (const day of days) {
      dayIdWithName[day.id] = day.day
    };

    const daysProps = {};
    daysList.forEach((day) => {
      daysProps[day] = {};
      daysProps[day].id = day;
      daysProps[day].name = dayIdWithName[day];
      daysProps[day].visibility = true;
      daysProps[day].color = Math.floor(Math.random() * 16777215).toString(16);
    });

    setDayProperties(daysProps);
  }, [daysList, days]);

  
  const handleCallback = (childData) => {
    setShow(childData); // childData = ["day1", "day2", "day3", "day4"]
  };



  //----------------------- USE EFFECT 4
  //create a filtered list of the days selected from the checkbox.
  useEffect(() => {
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
  console.log('dayList', daysList)

  //----------------------- USE EFFECT 5
  //show only the markers that are enabled on checkbox
  useEffect(() => {

    setMarkers(
      filteredDays.map((activity) => {
        const dayNameFromEvent = activity.day_id;

        const assignedColor = !dayProperties ? "000000" : dayProperties[dayNameFromEvent].color;

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


  
  //----------------------- USE EFFECT 6
  useEffect(() => {
    let centerLat = 0;
    let centerLong = 0;
    let activitiesLength = 0.000001;

    for (const activity of activities) {
      centerLat += Number(activity.lat);
      centerLong += Number(activity.long);
      activitiesLength++;
    }

    centerLat = centerLat/activitiesLength;
    centerLong = centerLong/activitiesLength;
    setCenter({lat: centerLat, lng: centerLong});

  }, [activities])

  return (
    <div className="map">
      {!token && history.push("/login")}
      <h2>{itinerary.name} Trips</h2>
      <h3>{start_date.toDateString()} to {end_date.toDateString()}</h3>
      {activities.length > 0 && 
      <GoogleMapReact
        bootstrapURLKeys={{
          key:
            // process.env.REACT_GOOGLE_MAP_API
            "AIzaSyBTwu8B2_jxWotAM4c_9uEJJJoTmiBE7Aw",
        }}
        center={center}
        defaultZoom={zoom}
      >
        {markers}
      </GoogleMapReact>
      }
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
};


Map.defaultProps = {
  zoom: 12,
};

export default Map;
