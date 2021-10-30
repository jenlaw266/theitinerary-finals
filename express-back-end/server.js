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
// const getActivityId = require('./queries/getActivityId')
const getMembers = require("./routes/getMembers");
const addMember = require("./routes/addMember");
const deleteMember = require("./routes/deleteMember");

const getAllItineraries = require("./routes/getAllItineraries");
const {
  getItinerary,
  getDays,
  getActivities,
  getActivitiesForItinerary,
  updateSelectedActivities,
  getNonSelectedActivities,
} = require("./routes/getItinerary");
const deleteItinerary = require("./queries/deleteItinerary");
const getImage = require("./routes/getImage");
const deleteDays = require("./queries/deleteDay");
const addAltDay = require("./queries/addAltDay");
const updateActivityDayID = require("./queries/updateActivityDayID");

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
  // const activity_id = await getActivityId(db, activities[0].itinerary_id);
  res.json({
    message: "Success, able to get data from api",
    act: activities,
    // id: activity_id,
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

App.use("/api/itinerary/:id", async function (req, res) {
  const id = req.params.id;
  const activities = await getActivitiesForItinerary(db, id);
  const allActivities = await getNonSelectedActivities(db, id);
  const days = await getDays(db, id);
  const itinerary = await getItinerary(db, id);
  // console.log("data", itinerary, days, activities);
  // res.json(Promise.all([activities, allActivities, days, itinerary ]));
  res.json({ activities, allActivities, days, itinerary });
});

App.use("/api/itinerary", async function (req, res) {
  console.log("SERVER FILE", req.body);
  const { id, currentSelected } = req.body;

  await updateSelectedActivities(db, id, currentSelected);
  res.send("success posted to db");
});

App.use("/api/itinerary/:id/map", async function (req, res) {
  const id = req.params.id;
  const activities = await getActivitiesForItinerary(db, id);
  const days = await getDays(db, id);
  const itinerary = await getItinerary(db, id);
  console.log("data from map page", itinerary, days, activities);
  console.log("data from map page id", id);
  res.json({ itinerary, days, activities });
});

App.use("/api/login", async function (req, res) {
  const token = await login(db, req.body);
  console.log("token", token);
  res.json({
    token: token,
  });
});

App.use("/api/members", async function (req, res) {
  const id = req.body.id;
  const members = await getMembers(db, id);
  console.log("mem", members);
  res.json({
    members: members,
  });
});

App.use("/api/member/add", async function (req, res) {
  const username = req.body.username;
  const itineraryID = req.body.itineraryID;
  await addMember(db, username, itineraryID);
  const member = [];
  member.push(username);
  res.json({
    member: member,
  });
});

App.use("/api/member/delete", async function (req, res) {
  console.log("req", req.body);
  const username = req.body.username;
  const itineraryID = req.body.id;
  console.log("itin", itineraryID);
  await deleteMember(db, username, itineraryID);
  const members = await getMembers(db, itineraryID);
  console.log(members);
  res.json({
    members: members,
  });
});

App.use("/api/days/add", async function (req, res) {
  if (req.body) {
    const day = req.body.day;
    const itineraryID = req.body.itinerary_id;
    const newDay = await addAltDay(db, day, itineraryID);
    res.status(200).send(newDay);
  }
});

App.delete("/api/days/:id", async function (req, res) {
  await deleteDays(db, req.params.id).then((response) => {
    res.status(200).send("delete success");
  });
});

App.post("/api/activities/update", async function (req, res) {
  const { id, heart, theDayId } = req.body;
  console.log("backend", id, heart, theDayId);
  const updateActivity = await updateActivityDayID(db, id, heart, theDayId);
  res.status(200).send(updateActivity);
});

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
