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

const getName = require("./queries/itineraries");
const login = require("./routes/login");
const getActivityId = require('./queries/getActivityId')
const getMembers = require('./routes/getMembers')
const addMember = require('./routes/addMember')
const deleteMember = require('./routes/deleteMember')

const getAllItineraries = require("./routes/getAllItineraries");
const {
  getItinerary,
  getDays,
  getActivities,
} = require("./routes/getItinerary");
const deleteItinerary = require("./queries/deleteItinerary");
const { response } = require("express");
const getImage = require("./routes/getImage");

// Express Configuration
App.use(
  cors({
    origin: "http://localhost:3000",
  })
);
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static("public"));

App.get("/api/data", (req, res) => res.send(JSON.stringify(data)));

// Sample GET route
App.use("/api/create/activities", async function (req, res) {
  const body = req.body;
  const actObj = await createActivities(db, body);
  const activities = await getImage(db, actObj);
  const activity_id = await getActivityId(db, activities[0].itinerary_id)
  res.json({
    message: "Success, able to get data from api",
    act: activities,
    id: activity_id
  });
});

App.delete("/api/itineraries/:id", async function (req, res) {
  await deleteItinerary(db, req.params.id).then((response) => {
    console.log("app.delete response", response);
    res.status(200).send("delete success");
  });
});

App.use("/api/itineraries", async function (req, res) {
  const itineraries = await getAllItineraries(db);
  res.json({
    itineraries: itineraries,
  });
});

App.use("/api/itinerary", async function (req, res) {
  const id = req.body.id;
  const itinerary = await getItinerary(db, id);
  const days = await getDays(db, id);
  const activities = await getActivities(db, id);

  res.json({
    itinerary: itinerary,
    days: days,
    activities: activities,
  });
});

App.use("/api/login", async function (req, res) {
  const token = await login(db, req.body);
  console.log('token', token)
  res.json({
    token: token,
  });
});

App.use("/api/members", async function(req, res) {
  const id = req.body.id
  const members = await getMembers(db, id)
  console.log('mem', members)
  res.json({
    members: members
  })
});

App.use("/api/member/add", async function(req, res) {
  const username = req.body.username;
  const itineraryID = req.body.itineraryID;
  await addMember(db, username, itineraryID)
  const member = []
  member.push(username)
  res.json({
    member: member
  })
});

App.use("/api/member/delete", async function(req, res) {
  console.log('req', req.body)
  const username = req.body.username;
  const itineraryID = req.body.id;
  console.log('itin', itineraryID)
  await deleteMember(db, username, itineraryID)
  const members = await getMembers(db, itineraryID)
  console.log(members)
  res.json({
    members: members
  })
});

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
