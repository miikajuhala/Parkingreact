import React from "react";
import axios from "axios";
import { useEffect } from "react";
import CarRepairOutlinedIcon from '@mui/icons-material/CarRepairOutlined';
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, IconButton, Paper, Snackbar, Typography } from "@mui/material";
const baseURL = "https://parkkiappi.herokuapp.com/api/spots";

const useStyles = makeStyles(theme => ({
  customHoverFocus: {
    "&:hover, &.Mui-focusVisible": { backgroundColor: "black" },
  }
}));

//ONGELMAKSI JÄÄ ETTÄ TÄYTYY SAADA OIKEA USERI KANNASTA

export default function Carspots() {




    const [spots, setSpot] = React.useState([]);
    const [mySpots, setmySpots]= React.useState([]);

    const [parkid, setPark]= React.useState(0);
    const [myPark, setMyPark]= React.useState(0);

    const[clicked1, setClick]=React.useState(false);

    //snackbar constit
    const [open, setOpen] = React.useState(false)
    const [msg, setMsg] = React.useState('')
    const [loaded, setLoaded] = React.useState(false)

    //Snackbar maarittelyä
    const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="primary"
        onClick={()=>setOpen(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
    )

    const classes = useStyles();
    useEffect(() => {
      axios.get(baseURL).then((response) => {
        setSpot(response.data);
        console.log(response.data);
        setLoaded(true)
      })}, [parkid, clicked1, myPark]);

    useEffect(() => {
      axios.get(baseURL+"/myspots/"+sessionStorage.getItem("username"), {
        headers: {
          'Authorization': sessionStorage.getItem("jwt")
        },
      })
      .then((response) => {
        setmySpots(response.data);
      
      })}, [clicked1, myPark]);



    function board(spotit,personal){
      console.log(spotit.length+"SPOTIT")
      let color="";
      const steps = [];

      if(personal===false){

        for (let i = 1; i <= spotit.length; i++) {
            console.log(i);
        if(spotit[i-1].reserved===true){
          console.log("läpi")
          color="red"
        }else{
          console.log("läpi")
        color="green"
        }
          steps.push(
              <Tooltip title={spotit[i-1].id}>
                <CarRepairOutlinedIcon fontSize="large" className={classes.customHoverFocus}
                    style={{ color: color, margin: 10}}
                    onClick={()=>setPark(spotit[i-1].id)}
                    >parkingspot {i}
                </CarRepairOutlinedIcon>
              </Tooltip>
          );
        }
      }else{
         for (let i = 1; i <= spotit.length; i++) {
            steps.push(
                <Tooltip title={mySpots[i-1].id}>
                  <CarRepairOutlinedIcon fontSize="large" className={classes.customHoverFocus} 
                      style={{ color: "orange" , margin: 10 }}
                      onClick={()=>setMyPark(spotit[i-1].id)}
                      >My parkingspot {spotit[i-1].id}
                  </CarRepairOutlinedIcon>
                </Tooltip>
            );
          }
      }
  return(
  // div including spots
  <div className="progressBar">{ steps }</div>

);


}


  function reserveThisSpot(i, dele){
    if(dele===false){

      //match id to spot
      let rspotid=0;
        for(let ig=0; ig<spots.length; ig++){
            if(spots[ig].id===i){
              rspotid = ig;
            }
        }

            //If reserving a spot
            if(spots[rspotid].reserved===false){
              axios.put(baseURL+"/newres/"+i, {
                  id:i,
                  reserved: true,
                  premium: spots[rspotid].premium,
                  spotuser: sessionStorage.getItem("username"),
              }, {
                headers: {
                  'Authorization': sessionStorage.getItem("jwt")
                },
              })
                .then(function (response) {
                  setPark(0)
                  console.log(response);
              })
                .catch(function (error) {
                  console.log(error);
              });
              setMsg("You have succesfully reserved spot: "+i)
              setOpen(true)
            }else{
              setMsg("This spot is already taken :(")
              setOpen(true)
              }
        
       
    }
     //if stopping rental
    else{
          axios.put(baseURL+"/delres/"+i, {
            // id:i,
            reserved: false,
            // premium: spots[i].premium,
            spotuser: null,
        },{
          headers: {
            'Authorization': sessionStorage.getItem("jwt")
          },
        })
          .then(function (response) {
            
            setMyPark(0)
            
            console.log(response);
        })
          .catch(function (error) {
            console.log(error);
        });

        setMsg("You have succesfully deleted reservation for spot: "+i)
        setOpen(true)
   }     
  }




  return (
    
<>

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


      


  {/* Element that shows reserved and tobe reserved parking spots */}
  {loaded && sessionStorage.getItem("jwt")!==null &&
  <Paper  
  style={{
  padding: 40,
  margin: 10,
  border: "1px solid black",
  }}>
    {/* Displays every existing parking spot  */}
    {loaded && sessionStorage.getItem("jwt")!==null && board(spots,false)}

    {/*Button to reserve currently selected parkinspot */}
    {loaded && sessionStorage.getItem("jwt")!==null &&<Button onClick={()=>reserveThisSpot(parkid,false)}>Click to reserve spot: {parkid}</Button>}

  </Paper>}




 {/* PERSONAL RENTALS */}
 {loaded && sessionStorage.getItem("jwt")!==null &&
 <Paper
  style={{
    padding: 40,
    margin: 10,
    border: "1px solid black"
  }}>
    <Button onClick={()=>{
        if(clicked1===false){
          setClick(true)
        }else{
          setClick(false)
        }}}>show my parkingspots
    </Button>

    {/*Function that displays personal reservations  */}
    {clicked1 && board(mySpots,true)}
    {/* Button for ending own reservation */}
    {clicked1 && <Button onClick={()=>reserveThisSpot(myPark,true)}>Stop renting spot number: {myPark}</Button>}
</Paper>}






{/* IF PERSON NOT LOGGED IN */}
{sessionStorage.getItem("jwt")===null && <Paper style={{
    maxwidth: 500,
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
</Paper>}



<Snackbar
  open={open}
  autoHideDuration={3000}
  onClose={()=>setOpen(false)}
  message={msg}
  action={action}
  alignItems="center"
  justifyContent="center"
  color="secondary"
/>

</Grid> 
</>
    );
  }
   