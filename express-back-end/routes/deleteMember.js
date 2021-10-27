const queryMember = require('../queries/queryMember')

const deleteMember = async function(db, username, itineraryID) {
  const query = await queryMember(db, username)
  const userID = query.rows[0].id
  await db.query(`DELETE FROM main_parties WHERE user_id = $1 AND itinerary_id = $2`,
                  [userID, itineraryID])
};

module.exports = deleteMember;