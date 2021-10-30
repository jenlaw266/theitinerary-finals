const axios = require("axios");
const { query } = require("express");
const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;

const getImage = async function (db, activities) {
  output = [];
  for (const activity of activities) {
    imageString = activity.image;
    if (imageString !== "null") {
      await axios
        .get(
          `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${imageString}&sensor=false&key=${REACT_APP_API_KEY}`
        )
        .then((response) => {
          const url = response.request._redirectable._options.href;

          activity.image = url;
          output.push(activity);
          db.query(`UPDATE activities SET image = $1 WHERE name = $2;`, [
            url,
            activity.name,
          ]).catch((error) => {
            console.log(error);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  return output;
};

module.exports = getImage;
