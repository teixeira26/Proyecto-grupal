import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from "./Components/Landing/Landing";
import Home from './Components/Home';


function App() {
  return (
    <BrowserRouter>      
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
