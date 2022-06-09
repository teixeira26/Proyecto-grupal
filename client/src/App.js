import React, {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Landing from "./Components/Landing/Landing";
import Home from './Components/Home/Home';
import Shop from './Components/Shop/Shop';
import AddOwner from './Components/Forms/AddOwner'
import AddPet from "./Components/Forms/AddPet";
import { Quesos } from "./Components/Landing/FlujoRegistro/quesos";
import Profile from "./Views/Profile/Profile.jsx";
import InfoProvider from "./Components/Forms/InfoProvider";
import InfoOwner from "./Components/Forms/InfoOwner";
import ProductDetail from "./Components/Shop/ProductDetail";
import Loading from "./Components/Loading/loading";
import NotRegistered from "./Components/Auth0/notRegistered";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";
import Providers from "./Components/Providers/Providers";
import DetailProvider from "./Components/Providers/DetailProvider";
import Chat from "./Components/Chat/Chat";
import Favorites from "./Components/Favorites/Favorites";
import Confirmación from "./Components/Shop/MercadoPago/Confirmación";
import PurchaseConfirmation from "./Components/Shop/MercadoPago/PurchaseConfirmation";
import About from "./Views/Profile/About";
import Contact from "./Views/Profile/Contact";
import Walk from "./Components/Forms/Walk";
import Lodging from "./Components/Forms/Lodging";
import MapView from "./Components/Map/MapView";
import GeoLocProvider from "./Components/Map/GeoLocProvider";
import './App.css';
import SalesReceipts from "./Components/Admin/SalesReceipts";
import DeleteProducts from "./Components/Admin/DeleteProducts"
import PostProducts from "./Components/Admin/PostProducts";
import GetUsers from "./Components/Admin/GetUsers";
import axios from "axios";
import BanUser from "./Components/Admin/BanUser";

function App() {

  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false)
  const [finalizado, setFinalizado] = useState(false)


  

  useEffect(() => {
    const searchUser = () => {
     
      axios.get("http://localhost:3001/owners")
      .then(res =>{

        let resp = res.data.find((x) => x.email === user.email)
        setIsAdmin(resp.isAdmin)
        setFinalizado(true)
      })
      
        
  };
      if(user){
          searchUser()
      }
    }, [user]);


  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/mapview" element={<MapView/>} />
          <Route path="/geolocprovider" element={<GeoLocProvider/>} />
          <Route path='/home' element={
            isAuthenticated && !isLoading ? <Home/> : <Loading/>
          }/>
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path='/shop' element={
            !isLoading ? <Shop/> : <Loading/>}/>
          <Route path='/shop/:id' element={
            !isLoading ? <ProductDetail/> : <Loading/>
          }/>
          <Route path='/agregarusuario' element={
            isAuthenticated && !isLoading ? <AddOwner/> : <Loading/>
          }/>
          <Route path='/agregarmascota' element={
            isAuthenticated && !isLoading ? <AddPet/> : <Loading/>
          }/>
          <Route path='/tipo-usuario' element={
            isAuthenticated && !isLoading ? <Quesos/> : <Loading/>
          }/>
          <Route path='/profile' element={
            isAuthenticated && !isLoading ? <Profile/> : <Loading/>
          }/>
          <Route path='/infoprovider' element={
            isAuthenticated && !isLoading ? <InfoProvider/> : <Loading/>
          }/>
          <Route path='/providers' element={
            isAuthenticated && !isLoading ? <Providers/> : <Loading/>
          }/>
          <Route path='/providers/:name' element={
            isAuthenticated && !isLoading ? <DetailProvider/> : <Loading/>
          }/>
          <Route path='/chat/:providerEmail/:ownerEmail' element={
            isAuthenticated && !isLoading ? <Chat/> : <Loading />
          } />
          <Route path='/favorites' element={
            isAuthenticated && !isLoading ? <Favorites/> : <Loading />
          }/>
          <Route path='/infoOwner' element={
            isAuthenticated && !isLoading ? <InfoOwner/> : <Loading/>
          }/>
          <Route path="/no-registrado" element={<NotRegistered></NotRegistered>}></Route>
          <Route path="/shoppingcart" element={<ShoppingCart/>}/>
          <Route path="/confirmacion" element={
          isAuthenticated && !isLoading ? <Confirmación/> : <Loading/>}/>
          <Route path="/purchaseConfirmation" element={
          isAuthenticated && !isLoading ? <PurchaseConfirmation/> : <Loading/>}/>
          <Route path="/paseo" element={
          isAuthenticated && !isLoading ? <Walk/> : <Loading/>}/>
          <Route path="/hospedaje" element={
          isAuthenticated && !isLoading ? <Lodging/> : <Loading/>}/>




          {/* -------------- RUTAS PRIVADAS -------------------- */}
          <Route path="/admin/post-products" element={
          user&&finalizado? 
          isAdmin? <PostProducts /> : <Navigate to='/home' /> : null}/>

          <Route path="/admin/banUser" element={
          user&&finalizado? 
          isAdmin? <BanUser /> : <Navigate to='/home' /> : null}/>

          <Route path="/admin/sales-receipts" element={
          user&&finalizado? 
          isAdmin? <SalesReceipts /> : <Navigate to='/home' /> : null}/>

          <Route path="/admin/sales-receipts" element={
          user&&finalizado? 
          isAdmin? <DeleteProducts /> : <Navigate to='/home' /> : null}/>

          <Route path="/admin/get-users" element={
          user&&finalizado? 
          isAdmin? <GetUsers /> : <Navigate to='/home' /> : null}/>

        </Routes>
            
      </div>
    </BrowserRouter>
  );
}

export default App;