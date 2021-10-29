import { useEffect, useState, useContext } from "react";
// import React, { useState, useCallback, useEffect } from 'react';
import GoogleMapReact from "google-map-react";
import LocationMarker from "../components/Map/LocationMarker";
import LocationInfoBox from "../components/Map/LocationInfoBox";
import DaysCheckbox from "../components/Map/Checkbox";
import { useHistory } from "react-router-dom";
import LoginContext from "../context/LoginContext";
import DataContext from "../context/DataContext";


const Map = ({ eventData, center, zoom }) => {
  const [locationInfo, setLocationInfo] = useState(null);
  const [filteredDays, setFilteredDays] = useState(eventData);
  const history = useHistory();
  const { token } = useContext(LoginContext);
  const { currentTrip, selectedActivities } = useContext(DataContext);
  const [dayProperties, setDayProperties] = useState(null);
  const [markers, setMarkers] = useState(null);
  
  const uniqueDays = (eventData) => {
    const allDays = [];
    eventData.map((event) => allDays.push(event.day));

    const days = allDays.filter(
      (value, index, self) => self.indexOf(value) === index
    );

    return days;
  };

  const daysList = uniqueDays(eventData);
  const [show, setShow] = useState(daysList);

  //assign each day properties
  useEffect(() => {
    const daysProps = {};
    daysList.forEach((day) => {
      daysProps[day] = {};
      daysProps[day].name = day;
      daysProps[day].visibility = true;
      daysProps[day].color = Math.floor(Math.random() * 16777215).toString(16);
    });

    setDayProperties(daysProps);
  }, []);

  const handleCallback = (childData) => {
    setShow(childData); // childData = ["day1", "day2", "day3", "day4"]
  };

  //create a filtered list of the days selected from the checkbox.
  useEffect(() => {
    // console.log({show, filteredDays, daysList})
    if (show.length === daysList.length) {
      return setFilteredDays(eventData);
    } else {
      const newFilteredDays = eventData.filter((event) => {
        if (show.includes(event.day)) {
          return event;
        }
      });

      return setFilteredDays(newFilteredDays);
    }
  }, [show]);

  //show only the markers that are enabled on checkbox
  useEffect(() => {
    setMarkers(
      filteredDays.map((event) => {
        const dayNameFromEvent = event.day;
        // console.log(dayProperties);

        const assignedColor = !dayProperties
          ? "000000"
          : dayProperties[dayNameFromEvent].color;
        // console.log(assignedColor);

        return (
          <LocationMarker
            key={event.name}
            lat={event.lat}
            lng={event.lng}
            onClick={() =>
              setLocationInfo({
                name: event.name,
                day: event.day,
                img: event.img,
              })
            }
            color={assignedColor}
          />
        );
      })
    );
  }, [filteredDays, dayProperties]);

  console.log("current", currentTrip);
  console.log("selectedActivities", selectedActivities);

  const start_date = new Date(currentTrip.start_date);
  const end_date = new Date(currentTrip.end_date);

  return (
    <div className="map">
      {!token && history.push("/login")}
      <h2>{currentTrip.name} Tripz</h2>
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
