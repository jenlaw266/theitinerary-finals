import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Menu from "@mui/material/Menu";
import axios from "axios";
import { CSSTransition } from "react-transition-group";
import { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function IconMenu({
  setAnchorEl,
  anchorEl,
  allOptions,
  setDays,
  days,
  theDayId,
  allNonSelectedActivities,
  setActivities,
}) {
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const [active, setActive] = useState("default");
  const [height, setHeight] = useState(null);

  const calcHeight = (el) => {
    const height = el.offsetHeight;
    setHeight(height);
  };

  const addAlt = (data) => {
    fetch("http://localhost:8080/api/days/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (response) => {
      const result = await response.json();
      setDays((prev) => [...prev, result]);
    });
  };

  const deleteAlt = (dayId) => {
    console.log("clicked delete dropdown", dayId);
    axios.delete(`http://localhost:8080/api/days/${dayId}`).then((response) => {
      setDays((prev) => prev.filter((day) => day.id !== dayId));
    });
  };

  const updateActivity = (id, heart) => {
    axios
      .post(`http://localhost:8080/api/activities/update`, {
        id,
        heart,
        theDayId,
      })
      .then((response) => {
        const newActivity = response.data;
        console.log("update front end", newActivity);
        setActivities((prev) => [...prev, newActivity]);
      });
  };

  const altList = allOptions.map((day, id) => {
    let text = "";
    if (id !== 0) {
      text = `Delete Alternative ${id}`;
    } else {
      text = `Delete ${day.day}`;
    }
    return (
      <MenuItem onClick={() => deleteAlt(day.id)}>
        <ListItemIcon>
          <DeleteOutlineIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>{text}</ListItemText>
      </MenuItem>
    );
  });

  const genActivities = allNonSelectedActivities.map((activity) => {
    return (
      <MenuItem onClick={() => updateActivity(activity.id, true)}>
        <ListItemIcon>
          <AddIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>{activity.name}</ListItemText>
      </MenuItem>
    );
  });

  const toggleMenu = (prev) => {
    return prev === "default" ? "activity" : "default";
  };

  /*   anchorOrigin={{
    vertical: "bottom",
    horizontal: "left",
  }} */

  return (
    <div className="dropdown">
      <Paper sx={{ width: 320, maxWidth: "100%" }}>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuList>
            <CSSTransition
              style={{ height: height }}
              in={active === "default"}
              unmountOnExit
              timeout={500}
              className="menu-primary"
              onEnter={calcHeight}
            >
              <div className="menu">
                <MenuItem
                  onClick={() => addAlt(allOptions[allOptions.length - 1])}
                >
                  <ListItemIcon>
                    <AddIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add Alternative Day</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => setActive((prev) => toggleMenu(prev))}>
                  <ListItemIcon>
                    <ArrowBackIosNewIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add Activity</ListItemText>
                </MenuItem>
                <Divider />
                {altList}
              </div>
            </CSSTransition>
            <CSSTransition
              in={active === "activity"}
              unmountOnExit
              timeout={500}
              className="menu-secondary"
            >
              <div className="menu">
                <MenuItem
                  onClick={
                    () =>
                      setActive((prev) => toggleMenu(prev)) /*genActivities*/
                  }
                >
                  <ListItemIcon>
                    <ArrowForwardIosIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Activities</ListItemText>
                </MenuItem>
                {genActivities}
              </div>
            </CSSTransition>
          </MenuList>
        </Menu>
      </Paper>
    </div>
  );
}
