const queryMembers = async function (db, id) {
 return db.query(`SELECT username FROM main_parties INNER JOIN users
                          ON main_parties.user_id = users.id WHERE itinerary_id = $1`,
                          [id]);

};

module.exports = queryMembers;