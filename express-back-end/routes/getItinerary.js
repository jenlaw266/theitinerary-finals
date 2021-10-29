const dayDiff = require("../helpers/convertDate");

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

const updateSelectedActivities = async function(db, id, activities, selectedActivityIds) {
  // console.log("activityArray Liked", selectedActivityIds)
  // console.log("original activities for itinerary", activities)

  //add random day ids to activities -- to remove
  const currentItinerary = await getItinerary(db, id)
  const numDays = dayDiff(currentItinerary.start_date, currentItinerary.end_date)

  for (const selectedId of selectedActivityIds) {
    const generateDayId = Math.floor(Math.random() * numDays) + 1;
    console.log({numDays, generateDayId})

    db.query(`UPDATE activities SET heart = $1, day_id = $2 WHERE id = $3;`, [true, generateDayId, selectedId])
    .catch(error =>{
      console.log(error)
    })
  }
}

const getSelectedActivities = async function(db, id, activities, selectedActivityIds) {
  await updateSelectedActivities(db, id, activities, selectedActivityIds)

  const dbQuery = await db.query(`SELECT * From activities WHERE (itinerary_id = $1 AND heart is true);`, [id])
  // console.log("id", id)
  console.log("dbquery rows", dbQuery.rows)
  return dbQuery.rows;
}

module.exports = { getItinerary, getDays, getActivities, getSelectedActivities };