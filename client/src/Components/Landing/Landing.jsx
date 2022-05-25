import React from "react";
import NavBar from "../NavBar/NavBar";
import Hero from "./Hero/Hero";
import styles from "../Landing/Landing.module.css";
import WhatWeOffer from "./WhatWeOffer/WhatWeOffer";
import Team from "./Team/Team";
import Footer from "./Footer/Footer";
import Login from "../Auth0/Login"
import Logout from "../Auth0/Logout"
import {useAuth0} from "@auth0/auth0-react"


function Landing() {
 const{user,isAuthenticated, isLoading } = useAuth0()
  return (
    <div>
      
      {!isAuthenticated&&<Login></Login>}
      {isAuthenticated&&<Logout></Logout>}
      {isAuthenticated&&<img src={user.picture}></img>}
      {isAuthenticated&&console.log(user)}
      <div className={styles.navBar}>
        <NavBar />
      </div>

      <div className={styles.hero}>
        <Hero />
      </div>

      <div className={styles.whatWeOffer}>
        <WhatWeOffer />
      </div>

      <div className={styles.team}>
        <Team />
      </div>

      <div className={styles.footer}>
        <Footer/>
      </div>
    </div>
  );
}

export default Landing;
