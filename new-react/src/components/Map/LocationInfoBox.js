import React from 'react';

const LocationInfoBox = (props) => {
  return (
    <div className="location-info">
      <div className="location-info-text">
          <h4>{props.info.day}</h4>
          <img src={props.info.img} className="location-img" alt="location-img"/>
          <h4>{props.info.name}</h4>
      </div>
    </div>
  )
}

export default LocationInfoBox