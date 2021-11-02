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
    const dbQuery = await db.query(`SELECT * From activities WHERE id = $1;`, [
      i,
    ]);
    activities.push(dbQuery.rows[0]);
  }
  return activities;
};

const updateSelectedActivities = async function (db, id, selectedActivityIds) {
  const currentDays = await getDays(db, id);
  const daysIdArray = [];
  for (const day of currentDays) {
    daysIdArray.push(day.id);
  }

  for (const selectedId of selectedActivityIds) {
    await db.query(
      `UPDATE activities SET heart = $1 WHERE id = $2 RETURNING *;`,
      [true, selectedId]
    );
  }
};

const getActivitiesForItinerary = async function (db, id) {
  const dbQuery = await db.query(
    `SELECT * From activities WHERE (itinerary_id = $1 AND heart is true);`,
    [id]
  );

  return dbQuery.rows;
};

const getNonSelectedActivities = async function (db, id) {
  const dbQuery = await db.query(
    `SELECT * From activities WHERE (itinerary_id = $1 AND heart is false);`,
    [id]
  );
  return dbQuery.rows;
};

module.exports = {
  getItinerary,
  getDays,
  getActivities,
  getActivitiesForItinerary,
  updateSelectedActivities,
  getNonSelectedActivities,
};
