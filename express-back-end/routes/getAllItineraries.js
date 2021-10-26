const getAllItineraries = async function (db) {
  const dbQuery = await db.query(`SELECT * From itineraries;`)
  const trips = dbQuery.rows
  const output = []
  for (const trip of trips) {
    output.push(trip)
  }
  return output
};

module.exports = getAllItineraries;