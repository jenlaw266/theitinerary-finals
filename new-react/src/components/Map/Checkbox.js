import React, { useState } from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function DaysCheckbox() {
  const [state, setState] = useState({
    day1: true,
    day2: true,
    day3: true,
    day4: true
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { day1, day2, day3, day4 } = state;

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Days</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={day1} onChange={handleChange} name="day1" />
            }
            label="Day 1"
          />
          <FormControlLabel
            control={
              <Checkbox checked={day2} onChange={handleChange} name="day2" />
            }
            label="Day 2"
          />
          <FormControlLabel
            control={
              <Checkbox checked={day3} onChange={handleChange} name="day3" />
            }
            label="Day 3"
          />
           <FormControlLabel
            control={
              <Checkbox checked={day4} onChange={handleChange} name="day4" />
            }
            label="Day 4"
          />
        </FormGroup>
        {/* <FormHelperText>Be careful</FormHelperText> */}
      </FormControl>
    </Box>
  );
}

export default DaysCheckbox;