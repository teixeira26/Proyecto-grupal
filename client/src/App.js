import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from "./Components/Landing/Landing";
import Home from './Components/Home/Home';
import Shop from './Components/Shop/Shop'
import Checkout from './Components/Shop/Checkout'
import AddOwner from './Components/Forms/AddOwner'
import AddPet from "./Components/Forms/AddPet";
import { Quesos } from "./Components/Landing/FlujoRegistro/quesos";
import Profile from "./Views/Profile/Profile.jsx"
import Food from "./Components/Shop/Food";

function App() {
  return (
    <BrowserRouter>      
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path='/home' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/food' element={<Food />} />
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/agregarUsuario' element={<AddOwner />} />
          <Route path='/agregarMascota' element={<AddPet />} />
          <Route path='/quesosflaco' element={<Quesos />} />
          <Route path="/user" element={<Profile/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
