import { useState, useContext } from "react";
import Activities from "../components/Activities";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Button from "@mui/material/Button";
import axios from "axios";
import DataContext from "../context/DataContext";

const Home = ({ eventData }) => {
  const [city, setCity] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [submit, setSubmit] = useState(false);
  const { setTrips } = useContext(DataContext);
  const [activities, setActivities] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    if (city && start && end) {
      console.log(city, start, end);
    }

    async function handleCall() {
        await getData({
        city: city,
        start: start,
        end: end,
      }).then((response) => {
        setActivities(response.act);
        axios.get("http://localhost:8080/api/itineraries")
        .then((response) => {
          const itins = response.data.itineraries;
          setTrips(itins);
        });
      });
    }

    handleCall();
  };

  async function getData(data) {
    return fetch("http://localhost:8080/api/create/activities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((data) => data.json());
  }

  console.log("act", activities);

  return (
    <div>
      <h1>home</h1>
      <form noValidate onSubmit={handleSubmit}>
        <TextField
          required
          id="outlined-required"
          label="Enter City"
          onChange={(e) => setCity(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            value={start}
            onChange={(newValue) => {
              setStart(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="End Date"
            value={end}
            onChange={(newValue) => {
              setEnd(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button variant="outlined" type="submit">
          Submit
        </Button>
      </form>
      {submit && <Activities eventData={eventData} activities={activities} />}
    </div>
  );
};

export default Home;
