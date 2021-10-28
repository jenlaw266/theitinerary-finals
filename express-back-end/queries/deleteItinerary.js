const deleteItinerary = function (db, id) {
  return db.query(`DELETE FROM itineraries WHERE id = $1;`, [id]);
};

module.exports = deleteItinerary;
