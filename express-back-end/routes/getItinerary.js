const getItinerary = async function (db, id) {
  const dbQuery = await db.query(`SELECT * From itineraries WHERE id = $1;`, [id])
  const trip = dbQuery.rows[0];
  return trip
};

module.exports = getItinerary;