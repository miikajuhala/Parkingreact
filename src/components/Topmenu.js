import React from "react";
import UserComponent from './UserComponent';
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Carspots from "./Carspots";
import Carspage from "./Carspage";
import Addspot from "./Addspot";
import App from "./UserComponent";
import Home from "./Home";
import Admin from "./Admin";
export default function Topmenu() {

  
  function Logout(){
    sessionStorage.clear("jwt")
    window.location.reload();
  
  }

return (

<>




<BrowserRouter>
<div className="topnav">
<Link to="/">Home</Link>
<Link to="/users">users</Link>
<Link to="/loginpage">Login</Link>
<Link to="/addspot">Add p-spots</Link>
<Link to="/carspage">Rent a spot</Link>
<button onClick={Logout}>Logout </button>
</div>

<Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/users" element={<UserComponent />}></Route>
      <Route path="/addspot" element={<Addspot />}></Route>
      <Route path="/carspage" element={<Carspage />}></Route>
      <Route path="/loginpage" element={<Admin />}></Route>
</Routes>
</BrowserRouter>
 
  </>  

    );
}