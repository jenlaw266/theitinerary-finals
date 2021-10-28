const queryAddAltDay = (db, props) => {
  return db.query(
    `INSERT INTO days(id, day, day_type_id, itinerary_id) VALUES ($1, $2, $3, $4) RETURNING *`,
    [id, day]
  );
};

module.exports = queryAddAltDay;

// {id: 2, day: 'Day 1 Alt 1', day_type_id: 2, itinerary_id: 1}
