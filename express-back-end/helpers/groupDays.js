// function averageCenter(coords) {
//   if (coords.length === 1) {
//     return coords[0];
//   }

//   let x = 0.0;
//   let y = 0.0;
//   let z = 0.0;

//   for (let coord of coords) {
//     let latitude = coord.lat * Math.PI / 180;
//     let longitude = coord.long * Math.PI / 180;

//     x += Math.cos(latitude) * Math.cos(longitude);
//     y += Math.cos(latitude) * Math.sin(longitude);
//     z += Math.sin(latitude);
//   }

//   let total = coords.length;

//   x = x / total;
//   y = y / total;
//   z = z / total;

//   let centralLongitude = Math.atan2(y, x);
//   let centralSquareRoot = Math.sqrt(x * x + y * y);
//   let centralLatitude = Math.atan2(z, centralSquareRoot);

//   return {
//     lat: centralLatitude * 180 / Math.PI,
//     long: centralLongitude * 180 / Math.PI
//   };
// }

function deg2rad(deg) {
  return deg * (Math.PI / 180)
};

const getDistanceFromLatLongInKM = (lat1, long1, lat2, long2) => {
  const R = 6371; //radius of the earth
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(long2 - long1);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
   const d = R * c; // Distance in km
   return d;
};

const getMaxDistance = (arr, perDay) => {
  const copy = arr.slice();
  for(let i = 0; i < perDay - 2; i++){
     const minIndex = copy.indexOf(Math.min(...copy));
     copy.splice(minIndex, 1);
  };
  return Math.min(...copy);
};

const groupActivities = (activities, days) => {
  const activitiesPerDay = activities.length / days.length
  let perDay = 0;
  if (activitiesPerDay % 2 === 0) {
    perDay = activitiesPerDay
  } else {
    activitiesPerDay
    perDay = Math.ceil(activitiesPerDay)
  }

  const dayGroups = [];
  for (let x = 0; x < activities.length; x ++) {
    activities[x].group = [];
    for(let i = 0; i < activities.length; i++) {

      if (activities[x].name !== activities[i].name) {
        let distance = getDistanceFromLatLongInKM(activities[x].lat, 
          activities[x].long, activities[i].lat,
        activities[i].long); 
        activities[x].group.push({
          name: activities[i].name,
          distance: distance
        })
        if (activities[x].group.length > perDay - 1) {
          activities[x].group.sort(function(a, b) {
            return a.distance - b.distance
          });
          activities[x].group.pop();
        }
      }
    }
    dayGroups.push(activities[x])
 
    for (const act of activities[x].group) {
      for (let y = 0; y < activities.length; y++) {
        if (act.name === activities[y].name) {
          activities.splice(y, 1)
        }
      }
    }
    activities.splice(x, 1)
    x--
  }
  return dayGroups;
};

module.exports = groupActivities;