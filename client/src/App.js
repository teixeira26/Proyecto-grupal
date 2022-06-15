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
import Confirmation from "./Components/Providers/MercadoPago/Confirmation"
import PurchaseConfirmation from "./Components/Shop/MercadoPago/PurchaseConfirmation";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";
import Providers from "./Components/Providers/Providers";
import DetailProvider from "./Components/Providers/DetailProvider";
import Booking from "./Components/Providers/BookingLodging";
import CheckoutBooking from "./Components/Providers/CheckoutBooking";
import Loader from "./Components/Loading/Loader";
import Chat from "./Components/Chat/Chat";
import Favorites from "./Components/Favorites/Favorites";
import Profile from "./Views/Profile/Profile.jsx";
import About from "./Views/Profile/About/About.jsx";
import Contact from "./Views/Profile/Contact/Contact.jsx";
import ScheduleProvider from "./Components/Forms/scheduleProvider";
import CreateEvent from "./Components/Forms/ScheduleProviderLogding";
import ScheduleProviderLogding from "./Components/Forms/ScheduleProviderLogding";
import BookingLodging from "./Components/Providers/BookingLodging";
import BookingWalk from "./Components/Providers/BookingWalk";
import UsersTable from "./Components/Admin/UsersTable";
import ProductsList from "./Components/Admin/ProductsList";
import PutProduct from "./Components/Admin/PutProduct";
import PurchasesMade from "./Components/Shop/PurchasesMade";
import AdminProfile from "./Views/Profile/AdminProfile";

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
            isAuthenticated && !isLoading ? <Home/> : <Loader/>
          }/>
          <Route path="/nosotros" element={<About/>} />
          <Route path="/contacto" element={<Contact/>} />
          <Route path='/shop' element={
            !isLoading ? <Shop/> : <Loader/>}/>
          <Route path='/shop/:id' element={
            !isLoading ? <ProductDetail/> : <Loader/>
          }/>
          {/* <Route path='/shop/:id' element={<ProductDetail/>}/> */}
          <Route path='/agregarusuario' element={
            isAuthenticated && !isLoading ? <AddOwner/> : <Loader/>
          }/>
          <Route path='/agregarmascota' element={
            isAuthenticated && !isLoading ? <AddPet/> : <Loader/>
          }/>
          <Route path='/tipo-usuario' element={
            isAuthenticated && !isLoading ? <Quesos/> : <Loader/>
          }/>
          <Route path='/mi-perfil' element={
            isAuthenticated && !isLoading ? <Profile/> : <Loader/>
          }/>
          <Route path='/admin' element={
            isAuthenticated && !isLoading ? <AdminProfile/> : <Loader/>
          }/>
          
          <Route path='/servicio' element={
            isAuthenticated && !isLoading ? <InfoProvider/> : <Loader/>
          }/>
          <Route path='/providers' element={
            isAuthenticated && !isLoading ? <Providers/> : <Loader/>
          }/>
          <Route path='/providers/:name' element={
            isAuthenticated && !isLoading ? <DetailProvider/> : <Loader/>
          }/>
          <Route path='/chat/:providerEmail/:ownerEmail' element={
            isAuthenticated && !isLoading ? <Chat/> : <Loader />
          } />
          <Route path='/favoritos' element={
            isAuthenticated && !isLoading ? <Favorites/> : <Loader />
          }/>
          <Route path='/mis-datos' element={
            isAuthenticated && !isLoading ? <InfoOwner/> : <Loader/>
          }/>
          <Route path='/review/:providerEmail' element={
            isAuthenticated && !isLoading ? <Review/> : <Loader/>
          }/>
          <Route path="/no-registrado" element={<NotRegistered></NotRegistered>}></Route>
          <Route path="/mi-carrito" element={<ShoppingCart/>}/>
          <Route path="/confirmacion" element={
          isAuthenticated && !isLoading ? <Confirmación/> : <Loader/>}/>
          <Route path="/confirmation" element={
          isAuthenticated && !isLoading ? <Confirmation/> : <Loader/>}/>
          <Route path="/purchaseConfirmation" element={
          isAuthenticated && !isLoading ? <PurchaseConfirmation/> : <Loader/>}/>
          <Route path="/paseo" element={
          isAuthenticated && !isLoading ? <Walk/> : <Loader/>}/>
          <Route path="/hospedaje" element={
          isAuthenticated && !isLoading ? <Lodging/> : <Loader/>}/>
          <Route path='/reservar-hospedaje/:providerEmail' element={
          isAuthenticated && !isLoading ? <BookingLodging/> : <Loader/>}/>
          <Route path='/reservar-paseo/:providerEmail' element={
          isAuthenticated && !isLoading ? <BookingWalk/> : <Loader/>}/>
          <Route path='/mis-servicios' element={
          isAuthenticated && !isLoading ? <CheckoutBooking/> : <Loader/>}/>
          <Route path="/calificacionesProvider" element={
            isAuthenticated && !isLoading ? <Ratings/> : <Loader/>}/>
          <Route path="/calificacionesOwner" element={
            isAuthenticated && !isLoading ? <RatingsOwner/> : <Loader/>}/>
          <Route path="/cambiarCalificacion/:id" element={
            isAuthenticated && !isLoading ? <PutReview/> : <Loader/>}/>
          <Route path="/misHorarios" element={
            isAuthenticated && !isLoading ? <ScheduleProvider/> : <Loader/>}/>
          <Route path="/misHorariosHospedaje" element={
            isAuthenticated && !isLoading ? <ScheduleProviderLogding/> : <Loader/>}/>
          <Route path="/compras-realizadas" element={
            isAuthenticated && !isLoading ? <PurchasesMade/> : <Loader/>}/>

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
