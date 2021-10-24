require("dotenv").config();
const axios = require("axios");
const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;

const getApi = async function () {
  let output = [];
  let response = await axios
    .get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=london+tourist+attraction&language=en&key=${REACT_APP_API_KEY}`
    )
    .then((response) => {
      console.log(response);
      output = response.data.results;
    });
  return output;
};

module.exports = getApi;
