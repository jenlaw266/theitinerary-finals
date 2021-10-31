import { useState, useContext } from "react";
import Activities from "../components/Activities";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Button from "@mui/material/Button";
import axios from "axios";
import DataContext from "../context/DataContext";
import LoginContext from "../context/LoginContext";

import homeImage from "../images/travelers1.png";
import homeLogo from "../images/theitineraryfat.png";
import homeLoading from "../images/loading1.gif";
import "../components/Home.scss";

const Home = ({ currentTrip, setCurrentTrip }) => {
  const [city, setCity] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [submit, setSubmit] = useState(false);
  const { setTrips } = useContext(DataContext);
  const [activities, setActivities] = useState([]);
  // const [activityID, setActivityID] = useState([]);
  const { token } = useContext(LoginContext);
  const username = token ? token : "";
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    async function handleCall() {
      await getData({
        city: city,
        start: start,
        end: end,
        username: username,
      }).then((response) => {
        console.log("HOME", response)
        setActivities(response.act);
        // setActivityID(response.selectedActivityIds)
        axios.get("http://localhost:8080/api/itineraries").then((response) => {
          const itins = response.data.itineraries;
          setTrips(itins);
          setCurrentTrip(itins[itins.length - 1]);
          setSubmit(true);
        });
      });
    }

    handleCall();
  };

  async function getData(data) {
    setLoading(true);
    return fetch("http://localhost:8080/api/create/activities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((data) => {
      return data.json();
    });
  }

  console.log("act", activities);
  // console.log("act id", activityID);
  // console.log("selectedActivties", selectedActivities)
  
  return (
    <div className="home-body">
      <img className="home-logo" src={homeLogo} alt="home-logo" />
      <h1 className="home-title">Where is your next adventure?</h1>
      <form noValidate onSubmit={handleSubmit} className="home-form">
        <TextField
          required
          id="outlined-required"
          label="Enter City"
          onChange={(e) => setCity(e.target.value)}
        />
        <div className="home-dates">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="home-start-date">
              <DatePicker
                label="Start Date"
                value={start}
                onChange={(newValue) => {
                  setStart(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <div className="home-end-date">
              <DatePicker
                label="End Date"
                value={end}
                onChange={(newValue) => {
                  setEnd(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
          </LocalizationProvider>
        </div>
        <Button variant="contained" type="submit" className="home-search-button" sx={{ 
          borderRadius: '2rem',
          color:'theme.palette.primary.dark' }}>
          search
        </Button>
        {/* <img className="home-image" src={homeImage} alt="home-image" /> */}
      </form>
      {loading ? <img className="home-activities-loading" src={homeLoading} alt="home-activities-loading" /> : 
      <img className="home-image" src={homeImage} alt="home-image" />}
      {submit && (
        <Activities activities={activities} currentTrip={currentTrip}/>
      )}
    </div>
  );
};

export default Home;
