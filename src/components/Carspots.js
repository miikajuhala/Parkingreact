import React from "react";
import axios from "axios";
import { useEffect } from "react";


const baseURL = "http://localhost:8080/api/spots";


//ONGELMAKSI JÄÄ ETTÄ TÄYTYY SAADA OIKEA USERI KANNASTA

export default function Carspots() {
    const [spots, setSpot] = React.useState([]);
    const [mySpots, setmySpots]= React.useState([]);

    const [parkid, setPark]= React.useState(0);
    const [myPark, setMyPark]= React.useState(0);

    const[clicked1, setClick]=React.useState(false);


        useEffect(() => {
          axios.get(baseURL).then((response) => {
            setSpot(response.data);
          })

          }, [parkid]);

          useEffect(() => {
            //tähän vielä täytyy hakee current user!!! //https://dzone.com/articles/how-to-get-current-logged-in-username-in-spring-se
            axios.get(baseURL+"/myspots/user").then((response) => {
              setmySpots(response.data);
            })
          
            }, [clicked1]);



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
              <button
                style={{ backgroundColor: color, width: 300 }}
                onClick={()=>setPark(i-1)}
              >parkingspot {i}
              </button>);
            }
      }else{
        for (let i = 1; i <= spotit.length; i++) {

          
            steps.push(
            <button
              style={{ backgroundColor: "yellow", width: 300 }}
              onClick={()=>setMyPark(spotit[i-1].id)}
            >My parkingspot {spotit[i-1].id}
            </button>);
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
                              spotusername: "user",
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
                    spotusername: null,
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
    {/* <button onClick={onpress}>Get avaible spots</button> */}
    {board(spots,false)}
       <button onClick={()=>reserveThisSpot(parkid,false)}>Reserve spot number: {parkid+1}</button>
        <button onClick={()=>{
                if(clicked1===false){
                  setClick(true)
                  // fetchUserSpots();
                  //kutsu fetchia mikä hakee curruserin kamat
                }else{
                  setClick(false)
                }
              }}>show my parkingspots
        </button>
        <button onClick={()=>reserveThisSpot(myPark,true)}>Delete my spot number: {myPark}</button>
    {clicked1 && board(mySpots,true)}

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
 