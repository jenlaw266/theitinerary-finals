const getItinerary = async function (db, id) {
  const dbQuery = await db.query(`SELECT * From itineraries WHERE id = $1;`, [id])
  return dbQuery.rows[0];
};

const getDays = async function (db, id) {
  const dbQuery = await db.query(`SELECT * From days WHERE itinerary_id = $1 ORDER BY day;`, [id])
  return dbQuery.rows;  
};

const getActivities = async function (db, id) {
  const dbQuery = await db.query(`SELECT * From activities WHERE itinerary_id = $1;`, [id])
  return dbQuery.rows;
};


module.exports = { getItinerary, getDays, getActivities };