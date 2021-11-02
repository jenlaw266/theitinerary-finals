import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import AddIcon from "@mui/icons-material/Add";
import Menu from "@mui/material/Menu";
import axios from "axios";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import KitesurfingIcon from "@mui/icons-material/Kitesurfing";

export default function IconMenu({
  setAnchorEl,
  anchorEl,
  currentDay,
  setAllNonSelectedActivities,
  allNonSelectedActivities,
  setActivities,
}) {
  const { currentTrip } = useContext(DataContext);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const updateActivity = (id, heart) => {
    const dayId = currentDay[0].id;
    const itinId = currentTrip.id;

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
                <KitesurfingIcon fontSize="small" />
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
