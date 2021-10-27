const queryMember = (db, username) => {
  return db.query(`SELECT id FROM users WHERE username = $1;`,
                    [username])
};

module.exports = queryMember;