import React, { useState } from "react";
import Activity from "./Activity";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Activities = (props) => {
  const originalActivities = props.activities;
  const id = props.currentTrip?.id;
  const history = useHistory();
  const [currentSelected, setCurrentSelected] = useState([]);

  const addToSelectedActivities = (activityId) => {
    setCurrentSelected((prev) => [...prev, activityId]);
  };

  const filterActivities = (activityArray, activityId) => {
    return activityArray.filter((currentActivityId) => {
      return currentActivityId !== activityId;
    });
  };

  const removeFromSelectedActivities = (activityId) => {
    setCurrentSelected(filterActivities(currentSelected, activityId));
  };

  const activityAlreadySelected = (activityId) =>
    currentSelected.includes(activityId);

  const toggleSelectedActivityId = (activityId) => {
    if (activityAlreadySelected(activityId)) {
      return removeFromSelectedActivities(activityId);
    }

    return addToSelectedActivities(activityId);
  };

  const postSelectedActivities = () => {
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
        >
          create your itinerary
        </Button>
      )}
    </Container>
  );
};

export default Activities;