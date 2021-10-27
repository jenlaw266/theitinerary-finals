import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import Activities from "./Activities";
import DaysDropDown from "./DaysDropDown";
import Button from "@mui/material/Button";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === 100 && <DaysDropDown />}
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const dayTab = (name) => {
  return <Tab label={name} {...a11yProps(0)} />;
};

const alt = (value, activitiesList) => {
  return (
    <TabPanel value={value} index={0}>
      {activitiesList}
    </TabPanel>
  );
};

const edit = () => {
  return <Tab label="Edit" {...a11yProps(1)} />;
};

const Day = (props) => {
  const [value, setValue] = useState(0);
  const [prevValue, setprevValue] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChange = (event, newValue) => {
    if (newValue !== 100) {
      setValue((prev) => {
        setprevValue(prev);
        return newValue;
      });
    } else {
      setValue(newValue);
    }
  };

  return (
    <Grid container direction="row" justifyContent="space-between">
      <Box sx={{ width: "90%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {dayTab(props.day)}
            {/* {edit()} */}
          </Tabs>
        </Box>
        {alt(value, props.children)}
        {/* <TabPanel value={value} index={100}></TabPanel> */}
      </Box>
      <Box sx={{ width: "10%" }}>
        <Button
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          Edit
        </Button>
        <DaysDropDown setAnchorEl={setAnchorEl} anchorEl={anchorEl} />
      </Box>
    </Grid>
  );
};

export default Day;
