
import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function DaysCheckbox(props) {
  // console.log("propsdaylist inside dayscheckbox", props.daysList);
  // console.log("propsdayproperties inside dayscheckbox", props.dayProperties);

  const [checked, setChecked] = useState(props.daysList);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);

    //call function to send back checked days 
    props.parentCallback(newChecked);

    // console.log(" inside handle toggle, newChecked", newChecked)
    // console.log(" inside handle toggle, checked", checked)
  };

  useEffect(() => {
    // console.log("checked", checked)
  }, [checked]);

  // console.log("checked outside handleToggle", checked)

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {props.daysList.slice(0).reverse().map((value) => {
        const labelId = `checkbox-list-label-${value}`;
        // {console.log(props.dayProperties)}
        return (
          <ListItem
            key={value}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                <LocationOnIcon style={{ color: props.dayProperties[value].color}} />
                {/* <LocationOnIcon style={{ color: '000000'}} /> */}
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              {/* <ListItemText id={labelId} primary={`${value}`} /> */}
              <ListItemText id={labelId} primary={`${props.dayProperties[value].name}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

export default DaysCheckbox;
