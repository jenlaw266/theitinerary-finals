import { useState } from "react";
import { makeStyles } from "@mui/styles";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const members = ["John", "Mary", "Amy", "Leland", "Ysabel", "Jennifer"];

const drawerWidth = 200;

const useStyles = makeStyles({
  bottomSearch: {
    position: "fixed",
    bottom: 0,
    textAlign: "center",
    paddingBottom: 10,
  },
});

const Members = ({ token }) => {
  const classes = useStyles();
  const username = token ? token : "";
  const [addMember, setAddMember] = useState(false);
  const [deleteMember, setDeleteMember] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const popOutForm = () => {
    setAddMember((prev) => !prev);
    setAnchorEl(null);
  };

  const popOutDelete = () => {
    setDeleteMember((prev) => !prev);
    setAnchorEl(null);
  };

  const ITEM_HEIGHT = 48;

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem>
            <ListItemText primary={username + "'s Group Members"} />
            <ListItemIcon>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls="long-menu"
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "8ch",
                  },
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <MenuItem
                  key="add"
                  selected={"add" === "Pyxis"}
                  onClick={popOutForm}
                >
                  Add
                </MenuItem>
                <MenuItem
                  key="delete"
                  selected={"delete" === "Pyxis"}
                  onClick={popOutDelete}
                >
                  Delete
                </MenuItem>
              </Menu>
            </ListItemIcon>
          </ListItem>
        </List>
        <Divider />
        <List>
          {members.map((text, index) => (
            <ListItem button key={text}>
              {deleteMember && (
                <ListItemIcon>
                  <IconButton onClick={popOutForm}>
                    <IndeterminateCheckBoxIcon />
                  </IconButton>
                </ListItemIcon>
              )}
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>

        {addMember && (
          <div className={classes.bottomSearch}>
            <TextField
              id="filled-search"
              label="Search field"
              type="search"
              variant="filled"
            />
          </div>
        )}
      </Box>
    </Drawer>
  );
};

export default Members;
