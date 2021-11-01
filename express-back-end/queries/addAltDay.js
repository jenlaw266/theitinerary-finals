const addAltDay = async function (db, day, itineraryID) {
  const query = await db.query(`SELECT max(id) FROM days;`);
  const lastId = query.rows[0].max + 1;
  const dayArray = day.split(" ");
  let dayName = `${day} Alt 1`;

  if (dayArray.length > 3) {
    const altNum = Number(day.split(" ")[3]) + 1;
    dayArray.pop();
    dayArray.push(altNum);
    dayName = dayArray.join(" ");
  }

  const newDay = await db.query(
    `INSERT INTO days(id, day, day_type_id, itinerary_id) VALUES ($1, $2, $3, $4) RETURNING *`,
    [Number(lastId) + 1, dayName, 2, itineraryID]
  );
  return newDay.rows[0];
};

module.exports = addAltDay;
