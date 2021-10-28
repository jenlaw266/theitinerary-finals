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

export default function IconMenu({ setAnchorEl, anchorEl, allOptions }) {
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const deleteAlt = (id) => {
    console.log("clicked delete dropdown", id);
    axios.delete(`http://localhost:8080/api/days/${id}`);
    /*  .then((response) => {
        console.log(response);
        axios.get("http://localhost:8080/api/itineraries").then((response) => {
          const itins = response.data.itineraries;
          setTrips(itins);
        });
      }); */
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
        <ListItemText>{text}</ListItemText>
        <ListItemIcon>
          <DeleteOutlineIcon fontSize="small" />
        </ListItemIcon>
      </MenuItem>
    );
  });
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <Paper sx={{ width: 320, maxWidth: "100%" }}>
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              <AddIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Add Alternative Day</ListItemText>
          </MenuItem>

          {/* <MenuItem onClick={() => console.log("clicked add")}>
            <ListItemIcon>
              <AddIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Add Alternative Day</ListItemText>
            <Typography variant="body2" color="text.secondary">
              +
            </Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <DeleteOutlineIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete Alternative Day</ListItemText>
            <Typography variant="body2" color="text.secondary">
              -
            </Typography>
          </MenuItem> */}
          <Divider />

          {altList}
        </MenuList>
      </Paper>
    </Menu>
  );
}
