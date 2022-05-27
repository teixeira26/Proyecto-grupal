import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from "./Components/Landing/Landing";
import Home from './Components/Home/Home';
import Shop from './Components/Shop/Shop';
import FilterStructure from './Components/FilterStructure';
import AddOwner from './Components/Forms/AddOwner'
import AddPet from "./Components/Forms/AddPet";
import { Quesos } from "./Components/Landing/FlujoRegistro/quesos";
import Profile from "./Views/Profile/Profile.jsx"
import { useAuth0 } from "@auth0/auth0-react";
import InfoProvider from "./Components/Forms/infoProvider";
import Loading from "./Components/Loading/loading";
import NotRegistered from "./Components/Auth0/notRegistered";


function App() {
  const {isAuthenticated, isLoading} = useAuth0();
  
  return (
    <BrowserRouter>      
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path='/home' element={
            isAuthenticated&&!isLoading?<Home/>:<Loading/>
          } />
          <Route path='/shop' element={
          isAuthenticated&&!isLoading?<Shop />:<Loading/>
          } />
          <Route path='/filterstructure' element={
           isAuthenticated&&!isLoading?<FilterStructure />:<Loading/>
          } />
          <Route path='/agregarUsuario' element={
           isAuthenticated&&!isLoading?<AddOwner />:<Loading/>
          } />
          <Route path='/agregarMascota' element={
           isAuthenticated&&!isLoading?<AddPet />:<Loading/>
          } />
          <Route path='/quesosflaco' element={
          isAuthenticated&&!isLoading?<Quesos />:<Loading/>
          } />
          <Route path='/profile' element={
            isAuthenticated&&!isLoading?<Profile />:<Loading/>
          } 
          />
          <Route path='/infoProvider' element={
            isAuthenticated&&!isLoading?<InfoProvider />:<Loading/>
          } 
          />
          <Route path="/notRegistered" element={<NotRegistered></NotRegistered>}></Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
