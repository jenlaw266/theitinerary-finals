import Activity from "./Activity";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import axios from "axios";
const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;

//diff list for different cities  

const Activities = (props) => {
  const activityCard = props.activities.map((act, id) => {
    console.log("FROM ACTIVITIES", act)
    return (
      <Grid key={id} item xs={12} sm={6} md={4}>
        <Activity
          key={id}
          name={act.name}
          location={act.location}
          img={act.image}
          address={act.address}
          heart={act.heart}
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
