const updateActivityDayID = async function (db, heart, id, dayId) {
  return await db.query(
    `UPDATE activities SET heart = $1, day_id = $2 WHERE id = $3 RETURNING *;`,
    [heart, dayId, id]
  );
};

module.exports = updateActivityDayID;
