
import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function DaysCheckbox(props) {
  console.log("propsdaylist inside dayscheckbox", props.daysList);
  console.log("propsdayproperties inside dayscheckbox", props.dayProperties);

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
    props.parentCallback(daysToMark(checked));
  };

  console.log("checked outside handleToggle", checked)
  //send data of days to place on map if box is checked
  const daysToMark = (checked) => {
    return checked;
  }

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {props.daysList.map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                <LocationOnIcon style={{ color: props.dayProperties[value].color}} />
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
              <ListItemText id={labelId} primary={`${value}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

export default DaysCheckbox;


























// ----------------------------------------------------------

// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import FormLabel from '@mui/material/FormLabel';
// import FormControl from '@mui/material/FormControl';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import LocationOnIcon from '@mui/icons-material/LocationOn';

// function DaysCheckbox(props) {
//   const [state, setState] = useState({
//     day1: true,
//     day2: true,
//     day3: true,
//     day4: true
//   });
  
//   // console.log("inside daysheckbox component ", props.daysList)
//   // console.log("inside daysheckbox component ", props.dayProperties)

//   const handleChange = (event) => {
//     setState({
//       ...state,
//       [event.target.name]: event.target.checked,
//     });
//   };

//   const { day1, day2, day3, day4 } = state;

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
//         <FormLabel component="legend">Days</FormLabel>
//         <FormGroup>
//           <FormControlLabel
//             control={
//               <Checkbox checked={day1} onChange={handleChange} name="day1" />
//             }
//             label="Day 1"
//           />
//           <FormControlLabel
//             control={
//               <Checkbox checked={day2} onChange={handleChange} name="day2" />
//             }
//             label="Day 2"
//           />
//           <FormControlLabel
//             control={
//               <Checkbox checked={day3} onChange={handleChange} name="day3" />
//             }
//             label="Day 3"
//           />
//            <FormControlLabel
//             control={
//               <Checkbox checked={day4} onChange={handleChange} name="day4" />
//             }
//             label="Day 4"
//           />
//         </FormGroup>
//         {/* <FormHelperText>Be careful</FormHelperText> */}
//       </FormControl>
//     </Box>
//   );
// }

// export default DaysCheckbox;