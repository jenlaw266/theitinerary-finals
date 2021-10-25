import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";
import { StylesContext } from "@mui/styles";

const Activity = (props) => {
  console.log("props activity", props.name, props.img);
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
    </div>
  );
};

export default Activity;
