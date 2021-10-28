const queryMembers = require('../queries/queryMembers')

const getMembers = async function(db, id) {
  const output = []
  const query = await queryMembers(db, id)
  for (const member of query.rows) {
    output.push(member.username)
  }
  return output
};

module.exports = getMembers