import React from 'react';
// import { Icon } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn';

const LocationMarker = ({lat, lng, onClick}) => {
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  
  // console.log("randomColor", randomColor)

  return (
    <div className="location-marker" onClick={onClick}>
      {/* <LocationOnIcon style={{ color: '5f951f'}} fontSize="large" /> */}
      <LocationOnIcon style={{ color: {randomColor}}} fontSize="large" />
    </div>
  )
}

export default LocationMarker;

