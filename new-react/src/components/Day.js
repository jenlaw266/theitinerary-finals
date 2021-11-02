import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import DaysDropDown from "./DaysDropDown";
import Button from "@mui/material/Button";
import Activity from "./Activity";
import axios from "axios";
import "../styles/itinerary.scss"

const Day = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const updateActivity = (id, heart) => {
    axios
      .post(`http://localhost:8080/api/activities/update`, {
        id,
        heart,
        dayId: null,
      })
      .then(async (response) => {
        const updated = await response.data.updateActivity;
        props.setActivities((prev) => {
          return prev.map((activity, i) => {
            if (activity.id === updated.id) {
              return updated;
            }
            return activity;
          });
        });
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
    const day = props.allOptions[0];
    const dayActivities = props.activities.filter(
      (activity) => activity?.day_id === Number(day.id)
    );
    const activityCard = dayActivities.map((activity, i) => {
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

    return activityCard;
  };

  const dayTab = (all) => {
    return all.map((each, id) => (
      <Typography key={id} variant="h4">
        {each.day}
      </Typography>
    ));
  };

  return (
    <Grid container direction="row" justifyContent="space-between">
      <Box sx={{ width: "90%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          {dayTab(props.allOptions)}
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
          color="secondary"
        >
          Edit
        </Button>

        <DaysDropDown
          setAnchorEl={setAnchorEl}
          anchorEl={anchorEl}
          currentDay={props.allOptions}
          allNonSelectedActivities={props.allNonSelectedActivities}
          setAllNonSelectedActivities={props.setAllNonSelectedActivities}
          setActivities={props.setActivities}
        />
      </Box>
    </Grid>
  );
};

export default Day;
