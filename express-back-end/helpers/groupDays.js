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

const updateDays = async function (db, activities, days) {
  const actDays = groupActivities(activities, days);
  for (let i = 0; i < actDays.length; i++) {
    const names = []
    names.push(actDays[i].name)
    for (const name of actDays[i].group) {
      names.push(name.name);
    }
    
    for (const name of names) { 
      await db.query(`UPDATE activities SET day_id = $1 
                      WHERE name = $2 RETURNING *`, 
                      [days[i].id, name])
    }
  }
};

module.exports = updateDays;