import React from "react";
import { useEffect } from "react";
import axios from "axios";


export default function Myspots(clicked1) {
const[myspots, setSpots]= React.useState();
const baseURL = "http://localhost:8080/api/myspots";


    useEffect(() => {
        axios.get(baseURL).then((response) => {
          setSpots(response.data);
        })
      
        }, [clicked1.clicked1]);

  return (
    <div>
    <p>see and delete ur own reservations!!!</p>
     

    </div>
  );
}