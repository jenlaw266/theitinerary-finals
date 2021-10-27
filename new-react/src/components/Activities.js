import Activity from "./Activity";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Activities = (props) => {
  const activityCard = props.activities.map((act, id) => {
    return (
      <Grid key={id} item xs={12} sm={6} md={4}>
        <Activity
          key={id}
          name={act.name}
          city={act.city}
          img={act.image}
          address={act.address}
        />
      </Grid>
    );
  });
  const id = props.currentTrip?.id;
  return (
    <Container>
      <Grid container spacing={3}>
        {activityCard}
      </Grid>
      {activityCard && (
        <Button variant="outlined" component={Link} to={`itinerary/${id}`}>
          Itinerary
        </Button>
      )}
    </Container>
  );
};

export default Activities;
