const router = require("express").Router();
const getApi = require("./getApi");

const getActivities = async function (db) {
  const queryString = `INSERT INTO activities(name, location, lat, long, heart, day_id, itinerary_id)
                        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
  let output = [];
  await getApi().then((response) => {
    const day_id = 1;
    const itinerary_id = 1;
    const heart = false;
    for (let i = 0; i < response.length; i++) {
      let name = response[i].name;
      let location = "London";
      let address = response[i].formatted_address;
      let lat = response[i].geometry.location.lat;
      let long = response[i].geometry.location.lng;
      let rating = response[i].rating;
      output.push({
        name: name,
        location: location,
        address: address,
        lat: lat,
        long: long,
        rating: rating,
      });
      db.query(`${queryString}`, [
        name,
        location,
        lat,
        long,
        heart,
        day_id,
        itinerary_id,
      ]);
    }
  });
  console.log("output", output);
  return output;
};

module.exports = getActivities;
