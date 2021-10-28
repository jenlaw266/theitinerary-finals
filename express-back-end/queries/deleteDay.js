const deleteDays = function (db, id) {
  return db.query(`DELETE FROM days WHERE id = $1;`, [id]);
};

module.exports = deleteDays;
