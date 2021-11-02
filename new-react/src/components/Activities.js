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
  const { selectedActivities, setSelectedActivities } = useContext(DataContext);
  const [currentSelected, setCurrentSelected] = useState([]);

  console.log("ITINERARY PAGE --> SELECTED ACTIVITIES", selectedActivities);

  //add selected activties
  const addToSelectedActivities = (activityId) => {
    setCurrentSelected((prev) => [...prev, activityId]);
    setSelectedActivities((prev) => [...prev, activityId]);
  };

  const filterActivities = (activityArray, activityId) => {
    return activityArray.filter((currentActivityId) => {
      return currentActivityId !== activityId;
    });
  };

  const removeFromSelectedActivities = (activityId) => {
    const updatedSelectedActivities = filterActivities(
      selectedActivities,
      activityId
    );
    setCurrentSelected(filterActivities(currentSelected, activityId));
    setSelectedActivities(updatedSelectedActivities);
  };

  const activityAlreadySelected = (activityId) =>
    currentSelected.includes(activityId);

  const toggleSelectedActivityId = (activityId) => {
    if (activityAlreadySelected(activityId)) {
      return removeFromSelectedActivities(activityId);
    }

    return addToSelectedActivities(activityId);
  };

  console.log("selectedACtivitiesID", selectedActivities);

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
  console.log('originalActivities', originalActivities)
  console.log('selected', selectedActivities)
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
          variant="outlined"
          onClick={postSelectedActivities}
          // component={Link}
          // to={`itinerary/${id}`}
        >
          Itinerary
        </Button>
      )}
    </Container>
  );
};

export default Activities;
