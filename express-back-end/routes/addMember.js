const queryMember = require('../queries/queryMember')

const addMember = async function(db, id, itinerary) {
  const query = await queryMember(db, id)
  const userID = query.rows[0].id
  
};

module.exports = addMember;