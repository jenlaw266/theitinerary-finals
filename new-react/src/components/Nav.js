import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MapIcon from "@mui/icons-material/Map";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SmsIcon from "@mui/icons-material/Sms";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { makeStyles } from "@mui/styles";
import { Link, useHistory } from "react-router-dom";

const userItineraries = [
  { id: 1, name: "London" },
  { id: 2, name: "Vancouver" },
  { id: 3, name: "Calgary" },
];

const useStyles = makeStyles({
  // button: { color: "black" },
  text: { color: "pink" },
});

const Nav = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const id = userItineraries[userItineraries.length - 1].id;

  const menuId = "primary-search-account-menu";
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    props.setLogin(false);
    setAnchorEl(null);
    history.push("/");
  };

  const toggleDrawer = () => {
    props.setDrawer((prev) => !prev);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!props.login && (
        <MenuItem onClick={handleMenuClose} component={Link} to="/login">
          Login
        </MenuItem>
      )}
      {!props.login && (
        <MenuItem onClick={handleMenuClose} component={Link} to="/register">
          Register
        </MenuItem>
      )}
      {props.login && (
        <MenuItem onClick={handleMenuClose} component={Link} to="/itineraries">
          Itineraries
        </MenuItem>
      )}
      {props.login && <MenuItem onClick={toggleDrawer}>Members</MenuItem>}
      {props.login && <MenuItem onClick={logout}>Logout</MenuItem>}
    </Menu>
  );

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button size="large" color="inherit" component={Link} to="/">
            The Itinerary
          </Button>
        </Box>
        <IconButton
          // classes={{ root: classes.button }}
          disabled={props.login ? false : true}
          size="large"
          color="inherit"
          component={Link}
          to={`/itinerary/${id}`}
        >
          <ListAltIcon />
        </IconButton>
        <IconButton
          disabled={props.login ? false : true}
          size="large"
          color="inherit"
          component={Link}
          to={`/itinerary/${id}/map`}
        >
          <MapIcon />
        </IconButton>
        <IconButton
          disabled={props.login ? false : true}
          size="large"
          color="inherit"
          component={Link}
          to={`/itinerary/${id}/chat`}
        >
          <SmsIcon />
        </IconButton>
        <IconButton
          onClick={handleMenuOpen}
          size="large"
          color="inherit"
          aria-label="menu"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
        >
          <AccountCircle />
        </IconButton>
      </Toolbar>
      {renderMenu}
    </AppBar>
  );
};

export default Nav;
