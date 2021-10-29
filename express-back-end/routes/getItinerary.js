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
  const dbQuery = await db.query(
    `SELECT * From activities WHERE itinerary_id = $1;`,
    [id]
  );
  return dbQuery.rows;
};

const updateSelectedActivities = async function (db, id, selectedActivityIds) {
  const currentItinerary = await getItinerary(db, id);
  const numDays = dayDiff(
    currentItinerary.start_date,
    currentItinerary.end_date
  );

  for (const selectedId of selectedActivityIds) {
    const generateDayId = Math.floor(Math.random() * numDays) + 1;
    // console.log({ numDays, generateDayId });

    // const favActivities =
    await db.query(
      `UPDATE activities SET heart = $1, day_id = $2 WHERE id = $3 RETURNING *;`,
      [true, generateDayId, selectedId]
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
const getSelectedActivities = async function (db, id) {
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
module.exports = {
  getItinerary,
  getDays,
  getActivities,
  getActivitiesForItinerary,
  getSelectedActivities,
  updateSelectedActivities,
};
