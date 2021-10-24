const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const getActivities = require('./routes/getActivities');
const PORT = 8080;
const data = require('./db.json')
const cors = require('cors')

// Express Configuration
App.use(
  cors({
    origin: "http://localhost:3000"
  })
)
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));

// Sample GET route
App.get('/api/data', (req, res) => res.send(JSON.stringify(data)));

App.get('/api/activities', async function(req, res) {
  const activities = await getActivities();
  res.json({
    message: 'Success, able to get data from api',
    act: activities
  })
});

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
