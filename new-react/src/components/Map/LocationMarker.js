import React from 'react';
// import { Icon } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn';

const LocationMarker = ({lat, lng, onClick}) => {
  return (
    <div className="location-marker" onClick={onClick}>
      <LocationOnIcon color="secondary" fontSize="large" />
    </div>
  )
}

export default LocationMarker;