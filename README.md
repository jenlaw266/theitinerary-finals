![theItinerary](https://github.com/jenlaw266/theitinerary-finals/blob/master/new-react/src/images/theitineraryfat.png)

## About
**The ITinerary** is a quick and easy-to-use itinerary generator application that can alleviate the stress in planning for the next adventure. 

**Features:**
* **CREATE AN APP IN LESS THAN 5 MINUTES**: Create an itinerary for any city in the world! 

* **OPTIMIZED DAILY PLAN:** 
The ITinerary generates equal amount of activities per day (with the possible exception of the trip's last day).

* **SHORTER TRANSIT TIME BETWEEN ACTIVITIES:** Daily activities are grouped based on relative proximity to one another. This eliminates the hassle of travelling across town to the next activity!

* **ADD YOUR FRIENDS:** The ITinerary app allows for a user to add registered users to let them in on the plan and group chat!


*Note: The ITinerary was built as a fulfillment to Lighthouse Lab's final project requirement. This demo is intended for mobile viewing only.*

*Created by: Leland M. (@lmckibben), Jennifer L. (@jenlaw266), and Ysabel G. (@ysabelgarcia10)*

## Final Product
Login/Register
![1](https://github.com/jenlaw266/theitinerary-finals/blob/master/new-react/src/images/screenshots/1_register.gif)

Create an Itinerary
![2](https://github.com/jenlaw266/theitinerary-finals/blob/master/new-react/src/images/screenshots/2_create.gif)

Itinerary Map
![3](https://github.com/jenlaw266/theitinerary-finals/blob/master/new-react/src/images/screenshots/3_map.gif)

Edit Itinerary
![4](https://github.com/jenlaw266/theitinerary-finals/blob/master/new-react/src/images/screenshots/4_edit.gif)

Add Members to Trip
![5](https://github.com/jenlaw266/theitinerary-finals/blob/master/new-react/src/images/screenshots/5_add_members.gif)

Chat with Other Members
![6](https://github.com/jenlaw266/theitinerary-finals/blob/master/new-react/src/images/screenshots/6_chat.gif)

View Past Trips
![7](https://github.com/jenlaw266/theitinerary-finals/blob/master/new-react/src/images/screenshots/7_past_trips.gif)


## Getting Started

From here, you can start working on your project!

As soon as the dependencies are installed, your Express server can serve JSON and static assets (like images) in response to API calls from the React app. You can get started on developing your React app, routing plan, etc. right away! Any request that isn't handled by React is passed on to the Express server. That means that you can call a route like `/api/users` from React using `fetch`, `axios`, or something else, and Express will receive it as though they originated from the same app. For routing, best practice is to namespace all of your data routes to `/api`, so that they don't clash with other routing schemes, like React Router.

At some point, you'll likely want to install and configure a database driver for Postgres or MongoDB-- Refer to past projects for hints on how to do this.

And don't forget to update the README!

## Dependencies
### Backend
* axios
* bcrypt
* body-parser
* cookie-session
* cors
* dotenv
* express
* postgresql

### Frontend
* axios
* framer motion
* google react map
* material ui
* react
* sass
* socket.io
* styled components

### Others
* Google Places API
* Google Map JavaScript API 
* Google Geocoding API
* Google Service Usage API

## Credits
This repository is a bootleg of @NimaBoscarino's [React Rails Boilerplate](https://github.com/NimaBoscarino/react-rails-boilerplate). It uses the same React app, but replaces the Rails server with an Express server.
