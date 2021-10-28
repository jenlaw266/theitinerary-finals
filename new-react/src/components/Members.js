import { useState, useContext, useEffect } from "react";
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
import RemoveIcon from "@mui/icons-material/Remove";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import LoginContext from "../context/LoginContext";
import DataContext from "../context/DataContext"
import axios from "axios";


//const members = ["John", "Mary", "Amy", "Leland", "Ysabel", "Jennifer"];

const drawerWidth = 200;

const useStyles = makeStyles({
  bottomSearch: {
    position: "fixed",
    bottom: 0,
    textAlign: "center",
    paddingBottom: 10,
  },
});

const Members = () => {
  const classes = useStyles();
  const { token } = useContext(LoginContext);
  const { currentTrip } = useContext(LoginContext);
  const username = token ? token : "";
  const [addMembers, setAddMembers] = useState(false);
  const [deleteMember, setDeleteMember] = useState(false);
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function handleCall() {
      await getMembers({ id: currentTrip.id })
      .then((response) => {
        setMembers(response.members)
      })
      
    }

    handleCall();
  }, [currentTrip.id]);

  async function getMembers(id) {
    return fetch("http://localhost:8080/api/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    }).then((data) => data.json());
  }
  console.log('members', members)

  console.log('current', currentTrip.id)


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      async function handleCall() {
        await addMember({
          username: search,
          itineraryID: currentTrip.id
        }).then((response) => {
          setMembers(prevState => [...prevState, response.member[0]])
        });
      }
      handleCall();
    }
  };

  async function addMember(data) {
    return fetch("http://localhost:8080/api/member/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((data) => data.json());
  }

  async function handleDelete(username, id) {
    await delMember({
      username: username,
      id: id
    })
    .then((response) => {
      setMembers(response.members)
    })
  };

  async function delMember(data) {
    return fetch("http://localhost:8080/api/member/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((data) => data.json());
  }


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setAddMembers(false);
    setDeleteMember(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const popOutForm = () => {
    setAddMembers(true);
    setAnchorEl(null);
  };

  const popOutDelete = () => {
    setDeleteMember(true);
    setAnchorEl(null);
  };

 

  console.log('search', search)

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
            <ListItemIcon>
              <Avatar sx={{ bgcolor: deepPurple[500] }}>{username[0]}</Avatar>
            </ListItemIcon>
            <ListItemText primary={username + "'s Group"} />
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
              <ListItemIcon>
                <Avatar sx={{ width: 24, height: 24 }}>{text[0]}</Avatar>
              </ListItemIcon>
              <ListItemText primary={text} />
              {deleteMember && (
                <ListItemIcon>
                  <IconButton onClick={() => {
                    popOutForm();
                    handleDelete(text, currentTrip.id);
                  }}>
                    <RemoveIcon />
                  </IconButton>
                </ListItemIcon>
              )}
            </ListItem>
          ))}
        </List>

        {addMembers && (
          <div className={classes.bottomSearch}>
            <TextField
              id="filled-search"
              label="Search field"
              type="search"
              variant="filled"
              onKeyDown={handleKeyDown}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}
      </Box>
    </Drawer>
  );
};

export default Members;
