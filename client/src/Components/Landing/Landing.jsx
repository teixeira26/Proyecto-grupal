import React, { useEffect, useState } from "react";
import NavBarShop from '../NavBar/NavBarShop'
import Hero from "./Hero/Hero";
import styles from "../Landing/Landing.module.css";
import WhatWeOffer from "./WhatWeOffer/WhatWeOffer";
import Team from "./Team/Team";
import Footer from "../Footer/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Landing() {
  const [nombre, setNombre] = useState();
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();


  const buscarUser = async () => {
    try {
      let dbOwner = await axios.get("http://localhost:3001/owners");
      console.log(dbOwner);
      let userInfo = dbOwner.data.find((x) => x.email === user.email);
      if (typeof userInfo === "object") {
        console.log('se ejecuto if')
        navigate("/inicio");
        setNombre(user.name);
      } else {
        axios.post('http://localhost:3001/mailer/', {email:user.email, subject:"Bienvenido a YumPaw", text:"Te damos la bienvenida por ingresar a nuestra app, espero que disfrutes :)"})
        navigate("/inicio");
      }
    } catch (error) {
      console.log('se ejecutó catch')
      navigate("/inicio");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      buscarUser();
    }
  }, [isAuthenticated, buscarUser]);

  return (
    <div id="landing">
      {/* {!isAuthenticated && (
        <div className={styles.navBar}>
          <NavBar />
        </div>
      )} */}
      {/* {isAuthenticated && ( */}
      <div className={styles.navBar}>
        <NavBarShop />
      </div>
      {/* )} */}
      <div className={styles.hero}>
        <Hero img="/assets/img/pets-landing-cover.jpg" />
      </div>
      <div id="wwo" className={styles.whatWeOffer}>
        <WhatWeOffer />
      </div>
      <div id="team" className={styles.team}>
        <Team />
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}

export default Landing;