const queryAddMember = (db, id, itinerary) => {
  return db.query(`INSERT INTO main_parties(user_id, itinerary_id)
                  VALUES ($1, $2) RETURNING *`, [id, itinerary])
};

module.exports = queryAddMember;