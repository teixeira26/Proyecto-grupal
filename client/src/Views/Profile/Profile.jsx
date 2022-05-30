import React, { useEffect, useState } from "react";
import NavBarRegistered from "../../Components/NavBar/NavBarRegistered";
import style from "./Profile.module.css";
import styleContainer from "../../Components/GlobalCss/InContainer.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';

export default function Profile() {
    const [userData, setUser] = useState({});
    const{user, isAuthenticated} = useAuth0();
    useEffect(()=>{
        if (isAuthenticated){
            setUser({
                nombre:user.name,
                picture:user.picture,
            })
        }
    },[user])
    return (
        <main>
            <NavBarRegistered />
            <div className={styleContainer.container}>
                <section className={style.infoProfile}>
                    <img src={userData.picture} alt="profilePicture"/>
                    <h2>{userData.nombre}</h2>
                </section>
                <section className={style.mainInfoProfile}>
                    <div>
                    <h3>Mis datos</h3>
                    <div>
                        <h4>Contraseña</h4>
                        <p>********</p>
                        <h4>Correo electronico:</h4>
                        <p>correo@correo.com</p>
                        <h4>Direccion:</h4>
                        <p>Localidad - Provincia - Pais</p>
                    </div>
                    </div>
                    <div>
                        <button>Editar datos</button>
                    </div>
                </section>
                <section className={style.petsProfile}>
                    <h3>Mis mascotas</h3>
                    <article>
                        <div className={style.pets}>
                            <div className={style.petInfo}>
                                <img src="/assets/img/pets-comprar-productos.jpg" alt="profilePicture" />
                                <div className={style.petData}>
                                    <h3>Mabel</h3>
                                    <h4>Gato</h4>
                                    <p>Descripcion sobre Mabel:</p>
                                </div>
                            </div>
                            <div className={style.petInfo}>
                                <img src="/assets/img/pets-landing-cover.jpg" alt="profilePicture" />
                                <div className={style.petData}>
                                    <h3>Armandito</h3>
                                    <h4>Perro</h4>
                                    <p>Descripcion sobre Armandito:</p>
                                </div>
                            </div>
                        </div>
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