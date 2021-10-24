import Activity from "./Activity";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

//diff list for different cities
const activitiesList = [
  {
    name: "activity 1",
    city: "Vancouver",
    img: "sample-img.jpeg",
    desc: "Enim nisi labore cupidatat dolore aute.",
  },
  {
    name: "activity 2",
    city: "Vancouver",
    img: "./sample-img.jpeg",
    desc: "Enim nisi labore cupidatat dolore aute.",
  },
  {
    name: "activity 3",
    city: "Vancouver",
    img: "./sample-img.jpeg",
    desc: "Enim nisi labore cupidatat dolore aute.",
  },
];

const id = activitiesList.length - 1;

const Activities = () => {
  const activityCard = activitiesList.map((act, id) => {
    return (
      <Grid key={id} item xs={12} sm={6} md={4}>
        <Activity
          key={id}
          name={act.name}
          city={act.city}
          img={act.img}
          desc={act.desc}
        />
      </Grid>
    );
  });
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
