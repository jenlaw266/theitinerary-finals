const dayDiff = require("../helpers/convertDate");

const getItinerary = async function (db, id) {
  const dbQuery = await db.query(`SELECT * From itineraries WHERE id = $1;`, [
    id,
  ]);
  return dbQuery.rows[0];
};

const getDays = async function (db, id) {
  const dbQuery = await db.query(
    `SELECT * From days WHERE itinerary_id = $1 ORDER BY day;`,
    [id]
  );
  return dbQuery.rows;
};

const getActivities = async function (db, id) {
  const activities = [];
  for (const i of id) {
    const dbQuery = await db.query(`SELECT * From activities WHERE id = $1;`, [i]);
    activities.push(dbQuery.rows[0]);
  }
  return activities
};

const updateSelectedActivities = async function (db, id, selectedActivityIds) {
  // const currentItinerary = await getDays(db, id);
  // const numDays = dayDiff(
  //   currentItinerary.start_date,
  //   currentItinerary.end_date
  // );

  const currentDays = await getDays(db, id);
  const daysIdArray = [];
  for (const day of currentDays) {
    daysIdArray.push(day.id);
  };

  // for (const selectedId of selectedActivityIds) {
  //   const generateDayId = Math.floor(Math.random() * numDays) + 1;
    // console.log({ numDays, generateDayId });

    for (const selectedId of selectedActivityIds) {

    // const favActivities =
    await db.query(
      `UPDATE activities SET heart = $1 WHERE id = $2 RETURNING *;`,
      [true, selectedId]
    );
    // console.log("favActivites.rows", favActivities.rows);
    // return favActivities.rows;
  }
};

const getActivitiesForItinerary = async function (db, id) {
  // console.log("SELECTED ACTIVITY ID Length", selectedActivityIds.length);
  // await updateSelectedActivities(db, id, selectedActivityIds);

  const dbQuery = await db.query(
    `SELECT * From activities WHERE (itinerary_id = $1 AND heart is true);`,
    [id]
  );
  // console.log("id", id)
  // console.log("dbquery rows", dbQuery.rows);
  return dbQuery.rows;
};
// const getActivitiesForItineraryWithDays = async function (db, id) {
//   const dbQuery = await db.query(
//     `SELECT * From activities JOIN days ON activities.day_id = days.id WHERE (activities.itinerary_id = $1 AND heart is true);`,
//     [id]
//   );
//   // console.log("id", id)
//   console.log("getActivitiesForItineraryWithDays", dbQuery.rows);
//   return dbQuery.rows;
// };
module.exports = {
  getItinerary,
  getDays,
  getActivities,
  getActivitiesForItinerary,
  // getActivitiesForItineraryWithDays,
  updateSelectedActivities,
};
