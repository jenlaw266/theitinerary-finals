const bcrypt = require('bcryptjs');
const getUser = require('../queries/users')
const salt = bcrypt.genSaltSync(10);

const login = async function(db, body) {
  const username = body.username;
  const email = body.email;
  const title = body.title;
  const password = body.password;

  if (title === 'Register') {
    const hashPassword = bcrypt.hashSync(password, salt);
    const dbQuery = await getUser(db, email);
    const hasEmail = dbQuery.rows
    
    if (hasEmail.length === 0) {
      await db.query(`INSERT INTO users(username, email, password)
                      VALUES ($1, $2, $3)`, [username, email, hashPassword])
    }
    return username
  }

  if (title === 'Login') {
    const dbQuery = await getUser(db, email);
    const hasUser = dbQuery.rows[0];
    console.log('hasUser', hasUser)
    
    if (hasUser.email = email && bcrypt.compareSync(password, hasUser.password)) {
      return username
    }
    
  }
  
};

module.exports = login;