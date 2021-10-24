import React from 'react';

const LocationInfoBox = ({info}) => {
  return (
    <div className="location-info">
      <div className="location-info-text">
          <h4>{info.day}</h4>
          <img src={info.img} className="location-img" alt="location-img"/>
          <h4>{info.name}</h4>
      </div>
    </div>
  )
}

export default LocationInfoBox