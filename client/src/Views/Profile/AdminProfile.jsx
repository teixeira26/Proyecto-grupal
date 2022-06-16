import React, { useEffect, useState } from "react";
import NavBarShop from "../../Components/NavBar/NavBarShop";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import styleContainer from "../../Components/GlobalCss/InContainer.module.css";
import style from "./Profile.module.css";

export default function Profile() {
    const pets = useSelector((state) => state.pets);
    const dispatch = useDispatch();
    const [userData, setUser] = useState({});
    const { user, isAuthenticated } = useAuth0();

    useEffect(() => {
        if (isAuthenticated) {
            axios.get("https://proyecto-grupal.herokuapp.com/owners").then((x) => {
                const userdb = x.data.find((x) => x.email === user.email);
                console.log(userdb);
                setUser({
                    nombre: user.name,
                    picture:
                        userdb && userdb.profilePicture && userdb.profilePicture[0]
                            ? userdb.profilePicture[0]
                            : "/assets/img/notloged.png",
                    email: user.email,
                    pets: userdb ? userdb.pets : [],
                    address: userdb.address,
                    isAdmin: userdb.isAdmin
                });
                console.log("userdb", userdb);
            }).then(() => {
                return axios.get('https://proyecto-grupal.herokuapp.com/events')
            })
        }
    }, [user, dispatch]);

    return (
        <main>
            <NavBarShop />
            <div className={styleContainer.container}>
                <section className={style.infoProfile}>
                    <img src={userData.picture} alt="profilePicture" />
                    <article className={style.profile}>
                        <h1 className={style.name}>{user.name}</h1>
                        <div>
                            <Link to="/mis-datos">
                                <button className={style.data}>Editar perfil</button>
                            </Link>
                        </div>
                    </article>
                </section>
                <section className={style.mainInfoProfile}>
                    <h2>Mis datos</h2>
                    <h4 className={style.email}>
                        {" "}
                        Correo electronico: <span className={style.span}>{user.email}</span>
                    </h4>
                    <h4 className={style.address}>
                        Direccion:{" "}
                        <span className={style.span}>
                            {userData.address ? userData.address.road : null}
                        </span>{" "}
                    </h4>
                </section>
                <br />
                <br />
                <section>
                    {
                        userData.isAdmin ?
                            <div>
                                <Link to='/admin/listado-productos'><button>Ver listado de productos en Petshop</button></Link>
                                <Link to='/admin/ventas-petshop'><button>Ver listado de comprobantes de compra</button></Link>
                                <Link to='/admin/get-users'><button>Ver listado de usuarios registrados</button></Link>
                            </div>
                            : null
                    }
                </section>
            </div>
            <Footer />
        </main>
    );
};