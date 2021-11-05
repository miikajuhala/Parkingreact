import React from "react";
import UserComponent from './UserComponent';
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Carspots from "./Carspots";
import Carspage from "./Carspage";
import Addspot from "./Addspot";
import App from "./UserComponent";
import Home from "./Home";
export default function Topmenu() {


return (

<>




<BrowserRouter>
<div className="topnav">
<Link to="/">Home</Link>
<Link to="/users">users</Link>
<Link to="/addspot">Add p-spots</Link>
<Link to="/carspage">Rent a spot</Link>
</div>

<Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/users" element={<UserComponent />}></Route>
      <Route path="/addspot" element={<Addspot />}></Route>
      <Route path="/carspage" element={<Carspage />}></Route>
</Routes>
</BrowserRouter>
 
  </>  

    );
}