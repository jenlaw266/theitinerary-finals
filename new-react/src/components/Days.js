import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import DaysDropDown from "./DaysDropDown";
import Button from "@mui/material/Button";
import Activity from "./Activity";

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

const alt = (value, dayActivities) => {
  //missing alt column
  const activityCard = dayActivities.map((activity, id) => {
    return (
      <Activity
        key={id}
        name={activity.name}
        city={activity.location}
        img={activity.image}
        isChecked={false}
        onChange={() => console.log("clicked")}
      />
    );
  });
  return (
    <TabPanel value={value} index={0}>
      {activityCard}
    </TabPanel>
  );
};

const Days = (props) => {
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [theDayId, setTheDayId] = useState();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChange = (event, newValue, id) => {
    setValue(newValue);
  };

  const dayTab = (all) => {
    return all.map((each, id) => (
      <Tab
        label={each.day}
        onClick={() => setTheDayId(each.id)}
        {...a11yProps(each.id)}
      />
    ));
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
            {dayTab(props.allOptions)}
          </Tabs>
        </Box>
        {alt(value, props.dayActivities)}
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

        <DaysDropDown
          setAnchorEl={setAnchorEl}
          anchorEl={anchorEl}
          allOptions={props.allOptions}
          setDays={props.setDays}
          days={props.days}
          theDayId={theDayId}
          allActivities={props.allActivities}
          setActivities={props.setActivities}
        />
      </Box>
    </Grid>
  );
};

export default Days;
