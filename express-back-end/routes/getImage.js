const axios = require('axios')

const getImage = async function(activities) {
  let image = null
  axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${imageString}&sensor=false&key=AIzaSyDbGykD5qCfrjRre1A0l8b4JrV3x8PDz60`)
  .then((response) => {
    image = response.data
  })
  .catch((error) => {
    console.log(error)
  })
  return image
};

module.exports = getImage;