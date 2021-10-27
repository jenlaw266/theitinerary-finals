import React, { useState } from "react";
import Activity from "./Activity";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import axios from "axios";
const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;

//diff list for different cities  

const Activities = (props) => {
  const [selectedActivities, setSelectedActivities] = useState([]);
  const originalActivities = props.activities;
  // console.log("ORIGINAL ACTIVITIES", originalActivities)
  // const fakeActivities = originalActivities.map((act, index) => {
  //   return {...act, id: index}
  // });

  //add selected activties
  const addToSelectedActivities = (activityId) => {
    setSelectedActivities([...selectedActivities, activityId]);
  };

  //remove from selecyed activities if user unselects. 
  const removeFromSelectedActivities = (activityId) => {
    const updatedSelectedActivities = selectedActivities.filter( (currentActivityId) => { 
      return currentActivityId !== activityId
    });

    setSelectedActivities(updatedSelectedActivities);
  };

  const activityAlreadySelected = (activityId) => selectedActivities.includes(activityId);

  const toggleSelectedActivityId = (activityId) => {
    //if activity already exists in the selectedActivities
    if (activityAlreadySelected(activityId)) { 
      return removeFromSelectedActivities(activityId)
    };

    return addToSelectedActivities(activityId);
  };

  console.log("selectedACtivities", selectedActivities);

  //swap fakeActivities for originalActivities
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
          selectedActivities={selectedActivities}
          toggleSelectedActivityId={() => {
            toggleSelectedActivityId(act.id)
            console.log("FROM ACTIVITIES", act)
          }}
          isChecked={activityAlreadySelected(act.id)}
        />
      </Grid>
    );
  });
  const id = props.eventData.length;
  return (
    <Container>
      <Grid container spacing={3}>
        {activityCard}
      </Grid>
      {/* axios - check if the button generates after getting data */}
      {activityCard && (
        <Button variant="outlined" component={Link} to={`itinerary/${id}`}>
          Itinerary
        </Button>
      )}
    </Container>
  );
};

export default Activities;
