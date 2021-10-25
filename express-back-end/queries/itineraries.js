
const getName = (db, name) => {
  return db.query(`SELECT id FROM itineraries WHERE name = $1`, [name])
};

module.exports = getName;