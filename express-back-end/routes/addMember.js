const queryMember = require("../queries/queryMember");
const queryAddMember = require("../queries/addMember");

const addMember = async function (db, id, itinerary) {
  const query = await queryMember(db, id);
  const userID = query.rows[0].id;
  await queryAddMember(db, userID, itinerary)
  .catch((error) => {
    console.log(error);
  });
};

module.exports = addMember;
