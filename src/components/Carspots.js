import React from "react";
import axios from "axios";
import { useEffect } from "react";
import CarRepairOutlinedIcon from '@mui/icons-material/CarRepairOutlined';
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Myspots from "./Myspots";


const baseURL = "http://localhost:8080/api/spots";

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
    const classes = useStyles();

      useEffect(() => {
        axios.get(baseURL).then((response) => {
          setSpot(response.data);
        })

        }, [parkid, clicked1, myPark]);

              useEffect(() => {
                //tähän vielä täytyy hakee current user!!! //https://dzone.com/articles/how-to-get-current-logged-in-username-in-spring-se
                axios.get(baseURL+"/myspots/user").then((response) => {
                  setmySpots(response.data);
                })
              
                }, [clicked1, myPark]);



function board(spotit,personal){
let color="";
const steps = [];

      if(personal===false){

            for (let i = 1; i <= spotit.length; i++) {

            if(spotit[i-1].reserved===true){
              color="red"
            }else{
            color="green"
            }
              steps.push(
                  <Tooltip title={i}>
                    <CarRepairOutlinedIcon fontSize="large" className={classes.customHoverFocus}
                        style={{ color: color, margin: 10}}
                        onClick={()=>setPark(i-1)}
                        >parkingspot {i}
                    </CarRepairOutlinedIcon>
                  </Tooltip>
              );
            }
      }else{
        for (let i = 1; i <= spotit.length; i++) {

          
            steps.push(
                <Tooltip title={i}>
                  <CarRepairOutlinedIcon fontSize="large" className={classes.customHoverFocus} 
                      style={{ color: "yellow" , margin: 10 }}
                      onClick={()=>setMyPark(spotit[i-1].id)}
                      >My parkingspot {spotit[i-1].id}
                  </CarRepairOutlinedIcon>
                </Tooltip>
            );
          }

        }
  return(
  
  <div className="progressBar">{ steps }</div>

);


}


function reserveThisSpot(i, dele){
  if(dele===false){
                  //JOS VARATAAN PAIKKA
                  if(spots[i].reserved===false){
                          axios.put(baseURL+"/newres/"+spots[i].id, {
                              id:spots[i].id,
                              reserved: true,
                              premium: spots[i].premium,
                              spotuser: "user",
                          })
                            .then(function (response) {
                              setPark(0)
                              console.log(response);
                          })
                            .catch(function (error) {
                              console.log(error);
                          });
                          alert("You have succesfully reserved spot: "+spots[parkid].id)
                  }else{
                    alert("this spot is already taken :(")
                }
                //jos poistetaan/lopetetaan varaus NIIN ALEMPI
      }else{
                //servupuolella katsoa että curruser omistaa tällä id:llä varauksen 
                  axios.put(baseURL+"/delres/"+i, {
                    // id:i,
                    reserved: false,
                    // premium: spots[i].premium,
                    spotuser: null,
                })
                  .then(function (response) {
                    
                    setMyPark(0)
                    
                    console.log(response);
                })
                  .catch(function (error) {
                    console.log(error);
                });
                alert("You have succesfully deleted reservation for spot: "+i)


                }     
}




  return (
    
    <>

      {/*Button to reserve currently selected parkinspot */}
      <Button onClick={()=>reserveThisSpot(parkid,false)}>Click to reserve spot: {parkid+1}</Button>

{/* Element that shows reserved and tobe reserved parking spots */}
{board(spots,false)}




{/* Button to show personal reservations */}
<Button onClick={()=>{
    if(clicked1===false){
      setClick(true)
      // fetchUserSpots();
      //kutsu fetchia mikä hakee curruserin kamat
    }else{
      setClick(false)
    }
  }}>show my parkingspots
</Button>




 {/*Function that displays personal reservations  */}
{clicked1 && board(mySpots,true)}

{/* Button for ending own reservations */}
{clicked1 && <Button onClick={()=>reserveThisSpot(myPark,true)}>Delete my spot number: {myPark}</Button>}

    </>

    );
  }
    // <div>
    // {/* <button onClick={onpress}>get spots !</button> */}
    // <table>
    
    //   <tbody>
    //     <tr><th>reserved</th><th>Premim spot</th><th  >Reservant</th></tr>
    //     <tr> {spots.length}</tr>
    //     {
    //       spots.map((spot) => 
    //         <tr key={spot.id}>
    //           <td>{spot.reserved.toString()}</td>
    //           <td>{spot.premium.toString()}</td>
    //           <td>{spot.spotusername}</td>
    //         </tr>
    //      )
        
    //       }
    //   </tbody>
    // </table>
    // </div>
 