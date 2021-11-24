import React from "react";
import UserComponent from './UserComponent';
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Carspots from "./Carspots";
import Addspot from "./Addspot";
import Home from "./Home";
import Admin from "./Admin";
import { Button } from "@mui/material";

export default function Topmenu() {

  const [logged, setLogged]= React.useState(false);

  
  function Logout(){
    sessionStorage.clear("jwt")
    sessionStorage.clear("role")
    sessionStorage.clear("username")
    setLogged(false);
    // window.location.replace("http://localhost:3000/loginpage")
  
  }

return (

<>




<BrowserRouter>
<div className="topnav">
<Link to="/">Home</Link>

{sessionStorage.getItem("jwt")===null &&
<Link to="/loginpage">Login</Link>}

{sessionStorage.getItem("username")==="miika" && 
<Link to="/addspot">Admin UI</Link>}

<Link to="/carspage">Parking reservations</Link>

{logged===true && <Link style={{color: "red", textAlign: "right"}} to="/loginpage" onClick={Logout}>Logout </Link>}
</div>

<Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/users" element={<UserComponent />}></Route>
      <Route path="/addspot" element={<Addspot />}></Route>
      <Route path="/carspage"   element={<Carspots />}></Route>
      <Route path="/loginpage" element={<Admin setLogged={setLogged}/>}></Route>
</Routes>
</BrowserRouter>
 
  </>  

    );
}