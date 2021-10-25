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
  console.log("props activity", props.name, props.img);
  //just city name? // need to test with dummy data
  return (
    <div>
      <Card>
        <CardHeader
          action={<Checkbox onClick={() => console.log("clicked checkbox")} />}
          title={props.name}
          subheader={props.city}
        />
        <CardMedia
          component="img"
          height="150"
          image={props.img}
          alt={props.img}
        />
        <CardContent>
          <Typography>{props.address}</Typography>
        </CardContent>
      </Card>
      <h1>location: {props.location}</h1>
      <h2>Link: {props.children}</h2>
      <h3>id: {params.id} </h3>
    </div>
  );
};

export default ItineraryItem;
