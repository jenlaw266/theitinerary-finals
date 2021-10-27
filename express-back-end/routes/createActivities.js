const getApi = require("./getApi");
const getName = require("../queries/itineraries");
const dayDiff = require("../helpers/convertDate");

const createActivities = async function (db, body) {
  await db.query(
    `INSERT INTO itineraries(name, start_date, end_date, completed)
                  VALUES ($1, $2, $3, $4) RETURNING *`,
    [body.city, body.start, body.end, false]
  );
  const databaseQuery = await getName(db, body.city);
  const itinerary_id = databaseQuery.rows[0].id;

  let days = dayDiff(body.start, body.end);

  while (days > 0) {
    await db.query(
      `INSERT INTO days(day, day_type_id, itinerary_id)
              VALUES ($1, $2, $3) RETURNING *`,
      [`Day ${days}`, 1, itinerary_id]
    );
    days--;
  }

  const query = await db.query(`SELECT id FROM users WHERE username = $1;`, [body.username])
  const userID = query.rows[0].id

  await db.query(`INSERT INTO main_parties(user_id, itinerary_id, creator)
                  VALUES ($1, $2, $3) RETURNING *`, [userID, itinerary_id, true]);

  let output = [];
  await getApi(body.city).then((response) => {
    const day_id = 1;
    const heart = false;
    for (let i = 0; i < response.length; i++) {
      //console.log('response', response[i].photos[0].photo_reference)
      let name = response[i].name;
      let location = "London";
      let address = response[i].formatted_address;
      let lat = response[i].geometry.location.lat;
      let long = response[i].geometry.location.lng;
      let rating = response[i].rating;
      let imageString = "null"
      if (response[i].photos) {
        imageString = response[i].photos[0].photo_reference
      }
      output.push({
        itinerary_id: itinerary_id,
        name: name,
        location: location,
        address: address,
        lat: lat,
        long: long,
        rating: rating,
        image: imageString
      });
      db.query(
        `INSERT INTO activities(name, location, lat, long, heart, image, day_id, itinerary_id)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [name, body.city, lat, long, heart, imageString, day_id, itinerary_id]
      );
    }
  });
  return output;
};

module.exports = createActivities;
