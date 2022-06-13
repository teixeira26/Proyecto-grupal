import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Landing from "./Components/Landing/Landing";
import Shop from "./Components/Shop/Shop";
import AddOwner from "./Components/Forms/AddOwner";
import NotRegistered from "./Components/Auth0/NotRegistered";
import { Quesos } from "./Components/Landing/FlujoRegistro/quesos";
import Home from './Components/Home/Home';
import AddPet from "./Components/Forms/AddPet";
import InfoProvider from "./Components/Forms/InfoProvider";
import InfoOwner from "./Components/Forms/InfoOwner";
import Walk from "./Components/Forms/Walk";
import Lodging from "./Components/Forms/Lodging";
import Review from "./Components/Forms/Review";
import MapView from "./Components/Map/MapView";
import GeoLocProvider from "./Components/Map/GeoLocProvider";
import "./App.css";
import SalesReceipts from "./Components/Admin/SalesReceipts";
import PostProducts from "./Components/Admin/PostProducts";
import axios from "axios";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import Ratings from "./Components/Providers/Ratings";
import RatingsOwner from "./Components/Providers/RatingsOwner";
import PutReview from "./Components/Providers/PutReview";
import ProductDetail from "./Components/Shop/ProductDetail";
import Confirmación from "./Components/Shop/MercadoPago/Confirmación";
import PurchaseConfirmation from "./Components/Shop/MercadoPago/PurchaseConfirmation";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";
import Providers from "./Components/Providers/Providers";
import DetailProvider from "./Components/Providers/DetailProvider";
import Booking from "./Components/Providers/BookingLodging";
import CheckoutBooking from "./Components/Providers/CheckoutBooking";
import Loading from "./Components/Loading/loading";
import Chat from "./Components/Chat/Chat";
import Favorites from "./Components/Favorites/Favorites";
import Profile from "./Views/Profile/Profile.jsx";
import About from "./Views/Profile/About";
import Contact from "./Views/Profile/Contact";
import ScheduleProvider from "./Components/Forms/scheduleProvider";
import CreateEvent from "./Components/Forms/ScheduleProviderLogding";
import ScheduleProviderLogding from "./Components/Forms/ScheduleProviderLogding";
import BookingLodging from "./Components/Providers/BookingLodging";
import BookingWalk from "./Components/Providers/BookingWalk";
import UsersTable from "./Components/Admin/UsersTable";
import ProductsList from "./Components/Admin/ProductsList";
import PutProduct from "./Components/Admin/PutProduct";
import PurchasesMade from "./Components/Shop/PurchasesMade";


function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false);
  const [finalizado, setFinalizado] = useState(false);

  useEffect(() => {
    const searchUser = () => {
      axios.get("http://localhost:3001/owners").then((res) => {
        let resp = res.data.find((x) => x.email === user.email);
        console.log(resp)
        if(resp){
        setIsAdmin(resp.isAdmin);
        setFinalizado(true);
        }
      });
    };
    if (user) {
      searchUser();
    }
  }, [user]);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/mapview" element={<MapView/>} />
          <Route path="/geolocprovider" element={<GeoLocProvider/>} />
          <Route path='/inicio' element={
            isAuthenticated && !isLoading ? <Home/> : <Loading/>
          }/>
          <Route path="/nosotros" element={<About/>} />
          <Route path="/contacto" element={<Contact/>} />
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
          <Route path='/mi-perfil' element={
            isAuthenticated && !isLoading ? <Profile/> : <Loading/>
          }/>
          <Route path='/servicio' element={
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
          <Route path='/favoritos' element={
            isAuthenticated && !isLoading ? <Favorites/> : <Loading />
          }/>
          <Route path='/mis-datos' element={
            isAuthenticated && !isLoading ? <InfoOwner/> : <Loading/>
          }/>
          <Route path='/review/:providerEmail' element={
            isAuthenticated && !isLoading ? <Review/> : <Loading/>
          }/>
          <Route path="/no-registrado" element={<NotRegistered></NotRegistered>}></Route>
          <Route path="/mi-carrito" element={<ShoppingCart/>}/>
          <Route path="/confirmacion" element={
          isAuthenticated && !isLoading ? <Confirmación/> : <Loading/>}/>
          <Route path="/purchaseConfirmation" element={
          isAuthenticated && !isLoading ? <PurchaseConfirmation/> : <Loading/>}/>
          <Route path="/paseo" element={
          isAuthenticated && !isLoading ? <Walk/> : <Loading/>}/>
          <Route path="/hospedaje" element={
          isAuthenticated && !isLoading ? <Lodging/> : <Loading/>}/>
          <Route path='/reservar-hospedaje/:providerEmail' element={
          isAuthenticated && !isLoading ? <BookingLodging/> : <Loading/>}/>
          <Route path='/reservar-paseo/:providerEmail' element={
          isAuthenticated && !isLoading ? <BookingWalk/> : <Loading/>}/>
          <Route path='/confirmar-reserva' element={
          isAuthenticated && !isLoading ? <CheckoutBooking/> : <Loading/>}/>
          <Route path="/calificacionesProvider" element={
            isAuthenticated && !isLoading ? <Ratings/> : <Loading/>}/>
          <Route path="/calificacionesOwner" element={
            isAuthenticated && !isLoading ? <RatingsOwner/> : <Loading/>}/>
          <Route path="/cambiarCalificacion/:id" element={
            isAuthenticated && !isLoading ? <PutReview/> : <Loading/>}/>
          <Route path="/misHorarios" element={
            isAuthenticated && !isLoading ? <ScheduleProvider/> : <Loading/>}/>
          <Route path="/misHorariosHospedaje" element={
            isAuthenticated && !isLoading ? <ScheduleProviderLogding/> : <Loading/>}/>
          <Route path="/compras-realizadas" element={
            isAuthenticated && !isLoading ? <PurchasesMade/> : <Loading/>}/>

                      {/* -------------- RUTAS PRIVADAS -------------------- */}
          
          <Route
            path="/admin/dashboard"
            element={
              user && finalizado ? (
                isAdmin ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/home" />
                )
              ) : null
            } />

          <Route
            path="/admin/agregar-productos"
            element={
              user && finalizado ? (
                isAdmin ? (
                  <PostProducts />
                ) : (
                  <Navigate to="/home" />
                )
              ) : null
            }
          />

          <Route
            path="/admin/sales-receipts"
            element={
              user && finalizado ? (
                isAdmin ? (
                  <SalesReceipts />
                ) : (
                  <Navigate to="/home" />
                )
              ) : null
            }
          />

          <Route
            path="/admin/modificar-producto"
            element={
              user && finalizado ? (
                isAdmin ? (
                  <PutProduct />
                ) : (
                  <Navigate to="/home" />
                )
              ) : null
            }
          />

          <Route
            path="/admin/get-users"
            element={
              user && finalizado ? (
                isAdmin ? (
                  <UsersTable />
                ) : (
                  <Navigate to="/home" />
                )
              ) : null
            }
          />

          <Route
            path="/admin/listado-productos"
            element={
              user && finalizado ? (
                isAdmin ? (
                  <ProductsList />
                ) : (
                  <Navigate to="/home" />
                )
              ) : null
            }
          />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
