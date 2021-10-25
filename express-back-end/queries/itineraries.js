
const getName = (db, name) => {
  return db.query(`SELECT name FROM itineraries WHERE name = $1`, [name])
};

module.exports = getName;