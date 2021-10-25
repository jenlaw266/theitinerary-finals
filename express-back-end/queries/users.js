const getUser = (db, email) => {
  return db.query(`SELECT * FROM users WHERE email = $1`, [email])
};

module.exports = getUser;