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
import { useContext } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DataContext from "../context/DataContext";

export default function IconMenu({
  setAnchorEl,
  anchorEl,
  currentDay,
  setAllNonSelectedActivities,
  allNonSelectedActivities,
  setActivities,
}) {
  const { currentTrip } = useContext(DataContext);
  console.log("currentTrip dropdown", currentTrip);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const updateActivity = (id, heart) => {
    const dayId = currentDay[0].id;
    const itinId = currentTrip.id;

    console.log(dayId);
    axios
      .post(`http://localhost:8080/api/activities/update`, {
        id,
        heart,
        dayId,
        itinId,
      })
      .then((response) => {
        const newActivity = response.data.updateActivity;
        const allActivities = response.data.allActivities;
        console.log("update front end", newActivity);
        setActivities((prev) => [...prev, newActivity]);
        setAllNonSelectedActivities(allActivities);
      });
  };

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
            <MenuItem>
              <ListItemIcon>
                <ArrowForwardIosIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Activities</ListItemText>
            </MenuItem>
            <Divider />
            {genActivities}
          </MenuList>
        </Menu>
      </Paper>
    </div>
  );
}
