import React from "react";
import styles from "../Home/Home.module.css";
import NavBarRegistered from "../NavBar/NavBarRegistered";
import inContainer from "../GlobalCss/InContainer.module.css";
import HomeCard from "./HomeCard";
import Footer from "../Landing/Footer/Footer";

import Login from "../Auth0/Login";
import Logout from "../Auth0/Logout";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const Home = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    <div>
      {isAuthenticated && console.log(user)}


        <NavBarRegistered />


      <div className={inContainer.container}>
        <h1 className={styles.homeTitle}>¿Qué estás buscando?</h1>

        <div className={styles.cardWrapper}>
          <Link to='/providers'>
          <HomeCard name='Paseos y hospedaje' img='assets/img/pets-paseos-hospedaje.jpg'/>
          </Link>
          <Link to="/shop">
            <HomeCard name='Comprar productos' img='assets/img/pets-comprar-productos.jpg'/>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
