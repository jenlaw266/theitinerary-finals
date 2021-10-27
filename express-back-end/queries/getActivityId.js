const getActivityId = async function (db, id) {
  const query = await db.query(`SELECT * FROM activities WHERE itinerary_id = $1 ORDER BY id;`, [id])
  return activity_ids = query.rows
}

module.exports = getActivityId;