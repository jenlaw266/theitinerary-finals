const Express = require("express");
const App = Express();
const BodyParser = require("body-parser");
const createActivities = require("./routes/createActivities");
const PORT = 8080;
const data = require("./db.json");
const cors = require("cors");
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

const getName = require('./queries/itineraries');
const login = require('./routes/login');

const getAllItineraries = require('./routes/getAllItineraries')
const { getItinerary, getDays, getActivities } = require('./routes/getItinerary')

// Express Configuration
App.use(
  cors({
    origin: "http://localhost:3000",
  })
);
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static("public"));


App.get('/api/data', (req, res) => res.send(JSON.stringify(data)));


// Sample GET route
App.use("/api/create/activities", async function (req, res) {
  const body = req.body
  const activities = await createActivities(db, body);
  res.json({
    message: "Success, able to get data from api",
    act: activities,
  });
});


App.use("/api/itineraries", async function (req, res) {
  const itineraries = await getAllItineraries(db);
  res.json({
    itineraries: itineraries
  })
});

App.use("/api/itinerary", async function (req, res) {
  const id = req.body.id
  const itinerary = await getItinerary(db, id);
  const days = await getDays(db, id)
  const activities = await getActivities(db, id)

  res.json({
    itinerary: itinerary,
    days: days,
    activities: activities
  })
});

App.use("/api/login", async function (req, res) {
  const token = await login(db, req.body);
  res.json({
    token: token
  })
});

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
