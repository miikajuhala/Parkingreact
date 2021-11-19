import React, { useState } from 'react';
import axios from "axios";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button } from '@mui/material';


export default function Addspot() {
    
    const baseURL = "http://localhost:8080/api/spots";
    const [spot, setSpot] = useState({reserved: true, premium: false, spotusername:""})

    function addspots(){

      console.log(sessionStorage.getItem("jwt"))
      axios.post(baseURL+"/add",{
        reserved: spot.reserved,
        premium: spot.premium,
        spotusername: null
    }, {
        headers: {
          'Authorization': sessionStorage.getItem("jwt")
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    }

    const handleChange = (event) => {
      setSpot({...spot, [event.target.name]:event.target.value});
    };

  return (
    <FormControl component="fieldset">
            <FormLabel component="legend">reserved</FormLabel>
            <RadioGroup
              aria-label="reserved"
              name="controlled-radio-buttons-group"
              value={spot.reserved}
              onChange={handleChange}
              >
              <FormControlLabel value={true} name="reserved" control={<Radio />} label="true" />
              <FormControlLabel value={false} name="reserved" control={<Radio />} label="false" />
            </RadioGroup>

                  <FormLabel component="legend">Premium</FormLabel>
                  <RadioGroup
                    aria-label="reserved"
                    name="controlled-radio-buttons-group"
                    value={spot.premium}
                    onChange={handleChange}>
                    <FormControlLabel value={true} name="premium" control={<Radio />} label="true" />
                    <FormControlLabel value={false} name="premium" control={<Radio />} label="false" />
                  </RadioGroup>

      <Button onClick={addspots}>Add new spot (Admin)</Button>
        
    </FormControl>

  );
}