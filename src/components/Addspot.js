import React, { useState } from 'react';
import axios from "axios";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button, Paper, TextField } from '@mui/material';
import { Box } from '@mui/system';
import UserComponent from './UserComponent';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';




export default function Addspot() {
    
    const baseURL = "https://parkkiappi.herokuapp.com/api";
    //spot consts
    const [spot, setSpot] = useState({reserved: true, premium: false, spotusername:""})
    const [spotid, setSpotid] = useState(null);
    //user const
    const [user, setUser] = useState({username: "", password: "", role:""})

    // SPOTTIEN LISÄYS EDIT JA POISTO
    function addspots(){

      console.log(sessionStorage.getItem("jwt"))
      axios.post(baseURL+"/spots/add",{
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

    function editspots(){

      console.log(sessionStorage.getItem("jwt"))
      axios.put(baseURL+"/spots/edit/"+spotid,{
        reserved: spot.reserved,
        premium: spot.premium,
        spotusername: spot.spotusername
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

    function deletespots(){

      axios.delete(baseURL+"/spots/delete/"+spotid,{
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

// USERIN LISÄYS
function createNewUser(){

  axios.post(baseURL+"/admin/newuser",{
   username: user.username,
   passwordHash: user.password,
   role: user.role
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

//INPUTTIEN HANDLECHANGET

    const handleChange = (event) => {
      setSpot({...spot, [event.target.name]:event.target.value});
    };


    const handleChange1 = (event)=>{
      setSpotid(event.target.value);
      
      }


      const handleChange2 = (event) => {
        setUser({...user, [event.target.name]:event.target.value});
      };

  return (


<Container maxWidth="100">
<p>Admin window--be careful ;)</p>
<Box
        sx={{
          
         
        }}
      >
{/* FIRST PAPER COMPONENT FOR  ADDING NEW SPOTS (ADMIN) */}
  <Paper  style={{
      padding: 40,
      margin: 10,
      border: "1px solid black"
    }}> 

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
 
</Paper>
{/* SECOND PAPER FOR EDITING EXISTING SPOTS */}
<Paper style={{
    padding: 40,
    margin: 10,
    border: "1px solid black"
  }}> 
    

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
                    onChange={handleChange}
                    >
                    <FormControlLabel value={true} name="premium" control={<Radio />} label="true" />
                    <FormControlLabel value={false} name="premium" control={<Radio />} label="false" />
                    <TextField id="filled-basic" label="Spot id" variant="filled"  onChange={handleChange1} />
              </RadioGroup>
              {/* BUTTON TO EDIT SELECTED ID SPOT */}
              <Button onClick={editspots}>Edit spot (Admin)</Button>
              {/* BUTTON TO DELETE SELECTED ID */}
              <Button onClick={deletespots}>DELETE (Admin)</Button>
  
</Paper>

{/* USER SECTION  */}
<Paper style={{
    padding: 40,
    margin: 10,
    border: "1px solid black"
  }}>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" name ="username" label="username" variant="outlined" onChange={handleChange2}/>
      <TextField id="filled-basic" name ="password"  label="password" variant="filled" onChange={handleChange2} />
      <TextField id="outlined-basic" name ="role" label="role" variant="outlined" onChange={handleChange2}/>
      {/* create new user as a admin */}
      <Button onClick={createNewUser}>create New User(ADMIN)</Button>
    </Box>



  
</Paper>

</Box>


 

    </Container>

  );
}