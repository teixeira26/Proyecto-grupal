import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from "./Components/Landing/Landing";
import Home from './Components/Home/Home';
import Shop from './Components/Shop/Shop'
import Checkout from './Components/Shop/Checkout'
import AddOwner from './Components/Forms/AddOwner'
import AddPet from "./Components/Forms/AddPet";


function App() {
  return (
    <BrowserRouter>      
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path='/home' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/agregarUsuario' element={<AddOwner />} />
          <Route path='/agregarMascota' element={<AddPet />} />


        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
