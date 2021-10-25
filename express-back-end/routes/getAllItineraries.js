const getAllItineraries = (db) => {
  const dbQuery = db.query(`SELECT * From itineraries;`)
  console.log('dbQuery', dbQuery);
};