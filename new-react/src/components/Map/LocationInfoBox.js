import React from 'react';

const LocationInfoBox = (props) => {
  return (
    <div className="location-info">
      <div className="location-info-text">
          <img src={props.info.image} className="location-img" alt="location-img"/>
          <h4 className="location-name">{props.info.name}</h4>
      </div> 
    </div>
  )
}

export default LocationInfoBox