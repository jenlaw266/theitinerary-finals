import { useContext } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import DataContext from "../context/DataContext";
import { CardActions } from "@mui/material";
import { Typography } from "@mui/material";
import { StylesContext } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import MapIcon from "@mui/icons-material/Map";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { Link } from "react-router-dom";
import axios from "axios";

const ItineraryItem = (props) => {
  const { setTrips } = useContext(DataContext);

  async function deleteData(id) {
    console.log("clicked delete", id);
    axios
      .delete(`http://localhost:8080/api/itineraries/${id}`)
      .then((response) => {
        axios.get("http://localhost:8080/api/itineraries").then((res) => {
          const itins = res.data.itineraries;
          setTrips(itins);
        });
      });
  }

  return (
    <div>
      <Card>
        <CardHeader
          action={
            <DeleteIcon
              onClick={() => {
                deleteData(props.id);
              }}
            />
          }
          title={props.children}
          subheader={props.completed ? "Archived" : "Current"}
        />

        <CardContent>
          <Typography>
            Date: {props.start_date} to {props.end_date}
          </Typography>
          <CardActions disableSpacing>
            <IconButton
              aria-label="go to map"
              component={Link}
              to={`/itinerary/${props.id}/map`}
            >
              <MapIcon />
            </IconButton>
            <IconButton
              aria-label="go to chat"
              component={Link}
              to={`/itinerary/${props.id}/chat`}
            >
              <ChatBubbleIcon />
            </IconButton>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
};

export default ItineraryItem;
