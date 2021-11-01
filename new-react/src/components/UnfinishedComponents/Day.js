import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import DaysDropDown from "../DaysDropDown";
import Button from "@mui/material/Button";
import Activity from "../Activity";
import axios from "axios";
import DayTab from "./DayTab";
import Tab from "@mui/material/Tab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  console.log("value", value);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Day = (props) => {
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [theDayId, setTheDayId] = useState();
  const open = Boolean(anchorEl);

  const updateActivity = (id, heart) => {
    axios
      .post(`http://localhost:8080/api/activities/update`, {
        id,
        heart,
        theDayId,
      })
      .then(async (response) => {
        const updated = await response.data.rows;
        props.setActivities((prev) => [...prev, updated]);
      });
  };

  const checkActivities = (activity) => props.activities.includes(activity);

  const toggleSelectedActivityId = (activity) => {
    if (checkActivities(activity)) {
      return updateActivity(activity.id, false);
    }
    return updateActivity(activity.id, true);
  };

  const activitiesOfTheDay = () => {
    return props.allOptions.map((day, index) => {
      const dayActivities = props.activities.filter(
        (activity) => activity.day_id === Number(day.id)
      );
      console.log("dayActivities", dayActivities);
      const activityCard = dayActivities.map((activity, i) => {
        console.log("activites", activity);
        return (
          <Activity
            key={i}
            name={activity.name}
            city={activity.location}
            img={activity.image}
            isChecked={(activity) => checkActivities(activity)}
            toggleSelectedActivityId={() => {
              toggleSelectedActivityId(activity);
            }}
          />
        );
      });

      return (
        <TabPanel value={day.id} index={day.id}>
          {activityCard}
        </TabPanel>
      );
    });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChange = (event, newValue, id) => {
    setValue(newValue);
  };

  const dayTab = (all) => {
    console.log("dayTab all", all);
    return all.map((each, id) => (
      <Tab
        key={each.id}
        label={each.day}
        id={each.id}
        onClick={() => setTheDayId(each.id)}
      >
        {/* <DayTab key={id} setDayId={() => setTheDayId(each.id)}></DayTab> */}

        {/* <DayTab
        setDayId={setTheDayId}
        id={each.id}
        label={each.day}
        key={each.id}
      ></DayTab> */}
      </Tab>
    ));
  };
  console.log(theDayId, "theDayId");
  return (
    <Grid container direction="row" justifyContent="space-between">
      <Box sx={{ width: "90%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {dayTab(props.allOptions)}
          </Tabs>
        </Box>
        {activitiesOfTheDay()}
      </Box>
      <Box sx={{ width: "10%" }}>
        <Button
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          Edit
        </Button>

        <DaysDropDown
          setAnchorEl={setAnchorEl}
          anchorEl={anchorEl}
          allOptions={props.allOptions}
          setDays={props.setDays}
          days={props.days}
          theDayId={theDayId}
          // updateActivity={updateActivity}
          allNonSelectedActivities={props.allNonSelectedActivities}
          setActivities={props.setActivities}
        />
      </Box>
    </Grid>
  );
};

export default Day;
