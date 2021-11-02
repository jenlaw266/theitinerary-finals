import React, { useState, useContext } from "react";
import Activity from "./Activity";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import DataContext from "../context/DataContext";

//diff list for different cities

const Activities = (props) => {
  const originalActivities = props.activities;
  const id = props.currentTrip?.id;
  const history = useHistory();
  const [currentSelected, setCurrentSelected] = useState([]);
  // console.log("ORIGINAL ACTIVITIES", originalActivities)
  // const fakeActivities = originalActivities.map((act, index) => {
  //   return {...act, id: index}
  // });

  //add selected activties
  const addToSelectedActivities = (activityId) => {
    setCurrentSelected((prev) => [...prev, activityId]);
  };

  const filterActivities = (activityArray, activityId) => {
    return activityArray.filter((currentActivityId) => {
      return currentActivityId !== activityId;
    });
  };

  //remove from selecyed activities if user unselects.
  const removeFromSelectedActivities = (activityId) => {
    setCurrentSelected(filterActivities(currentSelected, activityId));
  };

  const activityAlreadySelected = (activityId) =>
    currentSelected.includes(activityId);

  const toggleSelectedActivityId = (activityId) => {
    //if activity already exists in the selectedActivities
    if (activityAlreadySelected(activityId)) {
      return removeFromSelectedActivities(activityId);
    }

    return addToSelectedActivities(activityId);
  };

  const postSelectedActivities = () => {
    //post to backend
    // console.log("currentSelected HERE!!", currentSelected);
    axios
      .post("http://localhost:8080/api/itinerary", {
        currentSelected,
        id,
      })
      .then(() => {
        history.push(`/itinerary/${id}`);
      });
  };

  const activityCard = originalActivities.map((act, index) => {
    return (
      <Grid key={index} item xs={12} sm={6} md={4}>
        <Activity
          key={index}
          name={act.name}
          location={act.location}
          img={act.image}
          address={act.address}
          heart={act.heart}
          toggleSelectedActivityId={() => {
            toggleSelectedActivityId(act.id);
            // console.log("FROM ACTIVITIES", act)
          }}
          isChecked={activityAlreadySelected(act.id)}
        />
      </Grid>
    );
  });

  return (
    <Container>
      <Grid container spacing={3}>
        {activityCard}
      </Grid>
      {activityCard && (
        <Button
          variant="contained"
          onClick={postSelectedActivities}
          // component={Link}
          // to={`itinerary/${id}`}
        >
          create your itinerary
        </Button>
      )}
    </Container>
  );
};

export default Activities;
