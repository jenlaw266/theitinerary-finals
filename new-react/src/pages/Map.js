import React, { useEffect, useState } from 'react';
// import React, { useState, useCallback, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import LocationMarker from '../components/Map/LocationMarker'
import LocationInfoBox from '../components/Map/LocationInfoBox';
import DaysCheckbox from '../components/Map/Checkbox';
// import { color } from '@mui/system';

const Map = ({ eventData, center, zoom }) => {
  const [locationInfo, setLocationInfo] = useState(null);
  const [filteredDays, setFilteredDays] = useState(eventData);
  const [colorByDay, setColorByDay] = useState(null)

  // const [map, setMap] = useState(null);
  // const onLoad = useCallback((map) => setMap(map), []);
  
  // useEffect(() => {
    // MUST FIGURE OUT HOW TO AUTOZOOM, AUTOCENTER, FIND THE CENTER!
    //   if (map) {
      //     const bounds = new window.google.maps.LatLngBounds();
      //     eventData.map(marker => {
        //       bounds.extend({
          //         lat: marker.latitude,
          //         lng: marker.longitude,
          //       });
          //     });
          //     map.fitBounds(bounds);
          //   }
          // }, [map, eventData]);
          // }, [])
    
  const uniqueDays = (eventData) => {
    const allDays = [];
    eventData.map(event => allDays.push(event.day))

    const days = allDays.filter((value, index, self) => self.indexOf(value) === index);

    return days;
  }

  const daysList = uniqueDays(eventData)
  const [show, setShow] = useState(daysList); 

  useEffect(() => {
    const daysWithColor = {};
    for (const day of daysList) {
      daysWithColor[day] = Math.floor(Math.random()*16777215).toString(16)
    };
    
    console.log("color by day inside", colorByDay)
    setColorByDay(daysWithColor)
  }, [])
  
  console.log("color by day outside", colorByDay)

  //assign each day properties
  const assignDayProperties = (daysList) => {
    const daysProps = {};
    
    daysList.forEach(day => {
      console.log("day", day)
      daysProps[day] = {};
      daysProps[day].name = day;
      daysProps[day].visibility = true;

      //assign color based on the 
      daysProps[day].color = colorByDay[day];
    })
  
    return daysProps;
  };

  const dayProperties = assignDayProperties(daysList, eventData);

  const assignMarkerColor = (dayProperties, dayName) => {
    const color = dayProperties[dayName].color;
    return color;
  };

  const handleCallback = (childData) => {
    setShow(childData) // childData = ["day1", "day2", "day3", "day4"]
  };

  //create a filtered list of the days selected from the checkbox.
  useEffect(()=> {
    console.log({show, filteredDays, daysList})

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
  }, [show])
  
  //show only the markers that are enabled on checkbox
    
  const markers = filteredDays.map(event => {
    return (
      <LocationMarker 
      key = {event.name}
      lat={event.lat} 
      lng={event.lng} 
      onClick={() => setLocationInfo({
        name: event.name, 
        day: event.day, 
        img: event.img
      })}
      color={assignMarkerColor(dayProperties, event.day)}
      />)
    })

  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key:
          // process.env.REACT_GOOGLE_MAP_API
          'AIzaSyBTwu8B2_jxWotAM4c_9uEJJJoTmiBE7Aw'
        }}
        defaultCenter={center}
        defaultZoom={zoom}
        // onLoad={onLoad}
      >
       {markers}
      </GoogleMapReact>
      {locationInfo && <LocationInfoBox info={locationInfo}/>}
      <DaysCheckbox daysList={daysList} dayProperties={dayProperties} parentCallback={handleCallback} />
    </div>
  )
}

Map.defaultProps = {
  center: {
    lat: 49.2827,
    lng: -123.1207
  },
  zoom: 12
}

export default Map;
