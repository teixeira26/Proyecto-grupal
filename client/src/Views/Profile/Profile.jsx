import React, { useEffect, useState } from "react";
import NavBarRegistered from "../../Components/NavBar/NavBarRegistered";
import NavBarShop from '../../Components/NavBar/NavBarShop'
import style from "./Profile.module.css";
import styleContainer from "../../Components/GlobalCss/InContainer.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import axios from "axios";

export default function Profile() {
    const [userData, setUser] = useState({
});
const{user, isAuthenticated} = useAuth0();
useEffect(()=>{
if (isAuthenticated){

axios.get('http://localhost:3001/owners').then(x=>{

const userdb = x.data.find(x=>x.email === user.email);

    setUser({
        nombre:user.name,
        picture:user.picture,
        email:user.email,
        pets:userdb.pets,
        address:userdb.address,
    })
})}
    },[user, isAuthenticated])
    return (
        <main>
            <NavBarShop />
            <div className={styleContainer.container}>
            <section className={style.infoProfile}>
                <img src={userData.picture} alt="profilePicture" />
                <article>
                    <h1>{userData.nombre}</h1>
                    <h2>{userData.address?userData.address.city:null}</h2>
                </article>
            </section>

            <section className={style.mainInfoProfile}>
                <h1 className={style.boxLabel}>Mis datos</h1>
                <h4>Correo electronico: {user.email}</h4>
                <h4>Direccion: {userData.address?userData.address.road:null}</h4>
                <div>
                    <NavLink to='/infoOwner'>
                        <button>Cambiar datos</button>
                    </NavLink>
                </div>
            </section>
            
            <section className={style.petsProfile}>
                <h1 className={style.boxLabel}>Mis mascotas</h1>
                <article> 
                    {userData.pets&&userData.pets.length>0?userData.pets.map((x,y)=>{
                        return(
                            <div className={style.petInfo} key={y}>
                                <img src={x.profilePicture} alt="profilePicture" />
                                <div className={style.petData}>
                                <h2>Mascota 1: {x.name}</h2>
                                <h4>Raza: {x.race}</h4>
                                <p>Sobre {x.name}: {x.description}</p>
                                </div>
                            </div>
                        )
                    }):null}
                    


                    <NavLink to='/agregarmascota'>
                        <button>Agregar mascota</button>
                    </NavLink>
                    
                </article>
            </section>
            </div>
            <Footer/>
        </main>
    )
}