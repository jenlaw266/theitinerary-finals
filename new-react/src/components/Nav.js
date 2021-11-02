import { useState, useContext } from "react";
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
import { Link, useHistory } from "react-router-dom";
import LoginContext from "../context/LoginContext";
import { Typography } from "@mui/material";

import logo from "../images/theitinerary.png";
import "../styles/nav.scss";



const Nav = (props) => {
  const history = useHistory();
  const id = props.currentTrip?.id;
  const { token } = useContext(LoginContext);

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
    props.setToken(null);
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
      {!token && (
        <MenuItem onClick={handleMenuClose} component={Link} to="/login">
          Login
        </MenuItem>
      )}
      {!token && (
        <MenuItem onClick={handleMenuClose} component={Link} to="/register">
          Register
        </MenuItem>
      )}
      {token && (
        <MenuItem onClick={handleMenuClose} component={Link} to="/itineraries">
          Itineraries
        </MenuItem>
      )}
      {token && <MenuItem onClick={toggleDrawer}>Members</MenuItem>}
      {token && <MenuItem onClick={logout}>Logout</MenuItem>}
    </Menu>
  );

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar className="toolbar">
        <Box sx={{ flexGrow: 1 }}>
          <Button size="large" color="inherit" component={Link} to="/">
            <img className="logo" src={logo} alt="Logo" />
          </Button>
        </Box>
        <IconButton
          // classes={{ root: classes.button }}
          disabled={token ? false : true}
          size="large"
          color="inherit"
          component={Link}
          to={`/itinerary/${id}`}
        >
          <ListAltIcon />
        </IconButton>
        <IconButton
          disabled={token ? false : true}
          size="large"
          color="inherit"
          component={Link}
          to={`/itinerary/${id}/map`}
        >
          <MapIcon />
        </IconButton>
        <IconButton
          disabled={token ? false : true}
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
        <Typography>{token}</Typography>
      </Toolbar>
      {renderMenu}
    </AppBar>
  );
};

export default Nav;
