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

const updateSelectedActivities = async function(db, activities, selectedActivityIds) {
  console.log("activityArray Liked", selectedActivityIds)
  console.log("original activities for itinerary", activities)

  for (const id of selectedActivityIds) {
    db.query(`UPDATE activities SET heart = $1 WHERE id = $2;`, [true, id])
    .catch(error =>{
      console.log(error)
    })
  }
}

const getSelectedActivities = async function(db, id, activities, selectedActivityIds) {
  await updateSelectedActivities(db, activities, selectedActivityIds)

  const dbQuery = await db.query(`SELECT * From activities WHERE (itinerary_id = $1 AND heart is true);`, [id])
  console.log("id", id)
  console.log("dbquery rows", dbQuery.rows)
  return dbQuery.rows;
}

module.exports = { getItinerary, getDays, getActivities, getSelectedActivities };