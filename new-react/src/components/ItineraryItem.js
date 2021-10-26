import { useEffect, useContext } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import DataContext from "../context/DataContext";
import { Typography } from "@mui/material";
import { StylesContext } from "@mui/styles";
import axios from "axios";

const ItineraryItem = (props) => {
  const { setTrips } = useContext(DataContext);

  async function deleteData(id) {
    console.log("clicked delete", id);
    axios
      .delete(`http://localhost:8080/api/itineraries/${id}`)
      .then((response) => {
        console.log(response);
        axios.get("http://localhost:8080/api/itineraries").then((response) => {
          const itins = response.data.itineraries;
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
        </CardContent>
      </Card>
    </div>
  );
};

export default ItineraryItem;
