import React from "react";
import { useParams } from "react-router";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";
import { StylesContext } from "@mui/styles";

const ItineraryItem = (props) => {
  //take the :id from url
  const params = useParams();
  //just city name? // need to test with dummy data
  return (
    <div>
      <Card>
        <CardHeader
          action={<Checkbox onClick={() => console.log("clicked checkbox")} />}
          title={props.children}
          subheader={props.city}
        />

        <CardContent>
          <Typography>Date: </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default ItineraryItem;
