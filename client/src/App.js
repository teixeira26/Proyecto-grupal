import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from "./Components/Landing/Landing";
import Home from './Components/Home';
import AddOwner from './Components/Forms/AddOwner'
import AddPet from "./Components/Forms/AddPet";


function App() {
  return (
    <BrowserRouter>      
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path='/home' element={<Home />} />
          <Route path='/agregarUsuario' element={<AddOwner />} />
          <Route path='/agregarMascota' element={<AddPet />} />


        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
