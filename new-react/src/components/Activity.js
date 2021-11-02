import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";
import { StylesContext } from "@mui/styles";

const Activity = (props) => {
  // console.log("props activity", props.name, props.img);
  const { toggleSelectedActivityId, isChecked } = props;

  return (
    <div>
      <Card>
        <CardHeader
          action={<Checkbox 
          checked={isChecked}
          onChange={() => {
            toggleSelectedActivityId()
          }}
          />}
          title={props.name}
          subheader={props.location}
        />
        <CardMedia
          component="img"
          height="150"
          image={props.img}
          alt={props.img}
        />
        <CardContent>
          <Typography>{props.address}</Typography>
          <Typography>{props.description}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Activity;
