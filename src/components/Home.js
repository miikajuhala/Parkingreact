import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function Home() {

  return (
    <div>
     <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justifyContent="top"
  
  style={{ minHeight: '100vh',
    padding: 40,
    margin: 10,
    border: "1px solid black" }}
> 




<Paper style={{
    width: 500,
    height:500,
    padding: 40,
    margin: 10,
    border: "1px solid black"
  }}>

<Typography variant="h4" display="block" gutterBottom>
        Parking spot rental  
      </Typography>

<Typography variant="overline" display="block" gutterBottom>
        Tuomarila asoy
      </Typography>


<Typography variant="p3" display="block" gutterBottom>
    Login/Register with your asoy credentials to rent parkingspots <br></br>
    
   -testing testing-
</Typography>


</Paper>



 </Grid> 

    </div>
  );
}