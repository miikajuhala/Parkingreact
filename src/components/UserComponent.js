import React from "react";
import axios from "axios";
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Box } from '@mui/system';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';


const baseURL = "https://parkkiappi.herokuapp.com/api/users";

export default function UserComponent() {
  const [post, setPost] = React.useState([]);

 const onpress = ()=> {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
 }

  return (
  
    
    <>
       <Box sx={{
          
          alignItems: 'flex-end',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          height: 100,
        }}>
      <FormControl variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">
          With a start adornment
        </InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
      <TextField
        id="input-with-icon-textfield"
        label="TextField"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" label="With sx" variant="standard" />
      </Box>
    </Box>
    </>

            
  

    
  );
}