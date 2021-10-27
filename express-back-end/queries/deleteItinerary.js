const deleteItinerary = function (db, id) {
  console.log("delete function backend");
  return db.query(`DELETE FROM itineraries WHERE id = $1;`, [id]);
};

module.exports = deleteItinerary;
