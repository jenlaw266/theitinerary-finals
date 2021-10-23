import React, { useState, useEffect } from 'react';
// import React, { useState, useCallback, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import LocationMarker from './LocationMarker'
import LocationInfoBox from './LocationInfoBox';

const Map = ({ eventData, center, zoom }) => {
  const [locationInfo, setLocationInfo] = useState(null);

  // const [map, setMap] = useState(null);
  // const onLoad = useCallback((map) => setMap(map), []);

  useEffect(() => {
  //MUST FIGURE OUT HOW TO AUTOZOOM, AUTOCENTER, FIND THE CENTER!
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
  }, [])

  const allDays = [];
  const markers = eventData.map(event => {
    allDays.push(event.day)
    return (
    <LocationMarker 
      lat={event.lat} 
      lng={event.lng} 
      onClick={() => setLocationInfo({
        name: event.name, 
        day: event.day, 
        img: event.img
      })}
    />)
  })

  const days = allDays.filter((value, index, self) => self.indexOf(value) === index)
  console.log("days", days)

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