import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from "./Components/Landing/Landing";
import Home from './Components/Home/Home';
import Shop from './Components/Shop/Shop';
import AddOwner from './Components/Forms/AddOwner'
import AddPet from "./Components/Forms/AddPet";
import { Quesos } from "./Components/Landing/FlujoRegistro/quesos";
import Profile from "./Views/Profile/Profile.jsx"
import { useAuth0 } from "@auth0/auth0-react";
import InfoProvider from "./Components/Forms/InfoProvider";
import InfoOwner from "./Components/Forms/InfoOwner";
import ProductDetail from "./Components/Shop/ProductDetail";
import Loading from "./Components/Loading/loading";
import NotRegistered from "./Components/Auth0/notRegistered";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";
import Providers from "./Components/Providers/Providers";
import FormPrueba from "./Components/Shop/MercadoPago/FormPrueba";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path='/home' element={
            isAuthenticated && !isLoading ? <Home /> : <Loading />
          } />
          <Route path='/shop' element={
            isAuthenticated && !isLoading ? <Shop /> : <Loading />
          } />
          <Route path='/shop/:id' element={
            isAuthenticated && !isLoading ? <ProductDetail /> : <Loading />
          } />
          <Route path='/agregarusuario' element={
            isAuthenticated && !isLoading ? <AddOwner /> : <Loading />
          } />
          <Route path='/agregarmascota' element={
            isAuthenticated && !isLoading ? <AddPet /> : <Loading />
          } />
          <Route path='/tipo-usuario' element={
            isAuthenticated && !isLoading ? <Quesos /> : <Loading />
          } />
          <Route path='/profile' element={
            isAuthenticated && !isLoading ? <Profile /> : <Loading />
          }
          />
          <Route path='/infoprovider' element={
            isAuthenticated && !isLoading ? <InfoProvider /> : <Loading />
          }
          />
          <Route path='/infoOwner' element={
            isAuthenticated && !isLoading ? <InfoOwner /> : <Loading />
          }
          />
          <Route path='/providers' element={
            isAuthenticated && !isLoading ? <Providers /> : <Loading />
          } />

          <Route path="/no-registrado" element={<NotRegistered></NotRegistered>}></Route>

          <Route path="/shoppingcart" element={<ShoppingCart />} />



        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;