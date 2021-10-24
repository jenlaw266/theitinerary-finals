const router = require("express").Router();
const getApi = require("./getApi");

const getActivities = async function () {
  let output = [];
  await getApi().then((response) => {
    for (let i = 0; i < response.length; i++) {
      output.push({
        name: response[i].name,
        address: response[i].formatted_address,
        lat: response[i].geometry.location.lat,
        lng: response[i].geometry.location.lng,
        rating: response[i].rating,
      });
    }
  });
  console.log("output", output);
  return output;
};

module.exports = getActivities;
