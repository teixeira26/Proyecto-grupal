import React, { useEffect, useState } from "react";
import NavBarRegistered from "../../Components/NavBar/NavBarRegistered";
import style from "./Profile.module.css";
import styleContainer from "../../Components/GlobalCss/InContainer.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from 'react-router-dom';
import axios from "axios";

export default function Profile() {
    const [userData, setUser] = useState({
        pets:[]
});
const{user, isAuthenticated} = useAuth0();
useEffect(()=>{
if (isAuthenticated){

axios.get('http://localhost:3001/owners').then(x=>{
    console.log(x)
    const userdb = x.data.find(x=>x.email == user.email);
    console.log(userdb)
    setUser({
        nombre:user.name,
        picture:user.picture,
        email:user.email,
        pets:x.data[0].pets,
        address:x.data[0].address,
    })
})}
    },[user])
    return (
        <main>
            <NavBarRegistered />
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
                    {userData.map((x,y)=>{
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
                    })}


                    <NavLink to='/agregarmascota'>
                        <button>Agregar mascota</button>
                    </NavLink>
                    
                </article>
            </section>
            </div>
        </main>
    )
}