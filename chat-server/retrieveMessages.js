const retrieveMessages = async function(db) {
  const dbQuery = await db.query(`SELECT * FROM chat ORDER BY id DESC LIMIT 15`)
  return dbQuery.rows
};

module.exports = retrieveMessages;