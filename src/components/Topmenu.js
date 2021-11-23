import React from "react";
import UserComponent from './UserComponent';
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Carspots from "./Carspots";
import Addspot from "./Addspot";
import Home from "./Home";
import Admin from "./Admin";

export default function Topmenu() {

  
  function Logout(){
    sessionStorage.clear("jwt")
    sessionStorage.clear("role")
    sessionStorage.clear("username")
    window.location.reload();
  
  }

return (

<>




<BrowserRouter>
<div className="topnav">
<Link to="/">Home</Link>
{sessionStorage.getItem("jwt")===null &&<Link to="/loginpage">Login</Link>}
{/* {/* {sessionStorage.getItem("role")==="admin" &&  */}
{sessionStorage.getItem("username")==="miika" && <Link to="/addspot">Admin UI</Link>}
<Link to="/carspage">Parking reservation</Link>
{sessionStorage.getItem("jwt")!==null && <button onClick={Logout}>Logout </button>}
</div>

<Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/users" element={<UserComponent />}></Route>
      <Route path="/addspot" element={<Addspot />}></Route>

      <Route path="/carspage"   element={<Carspots />}></Route>

      <Route path="/loginpage" element={<Admin />}></Route>
</Routes>
</BrowserRouter>
 
  </>  

    );
}