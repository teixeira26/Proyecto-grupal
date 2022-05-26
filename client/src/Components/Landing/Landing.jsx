import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Hero from "./Hero/Hero";
import styles from "../Landing/Landing.module.css";
import WhatWeOffer from "./WhatWeOffer/WhatWeOffer";
import Team from "./Team/Team";
import Footer from "./Footer/Footer";
import Login from "../Auth0/Login"
import Logout from "../Auth0/Logout"
import {useAuth0, User} from "@auth0/auth0-react"
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Landing() {
  const [nombre, setNombre] = useState();
  const{user,isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  
useEffect(()=>{
  if(isAuthenticated){
    buscarUser()
  }
}, [isAuthenticated])

const buscarUser = async()=>{
  try {
  let dbOwner = await axios.get('http://localhost:3001/owners');//[{},{},{}]
  let userInfo = dbOwner.data.find(x=>x.email === user.email)
  if(typeof userInfo === 'object') {
    setNombre(user.name);
  }
  else{
    navigate('/quesosflaco')
  }

  // console.log("soy el usuario \0/", userInfo);
  } catch (error) {
    console.log(error)
  }
  
}
  return (
    <div>
      
      {!isAuthenticated&&<Login></Login>}
      {isAuthenticated&&<Logout></Logout>}
      {isAuthenticated&&<img src={user.picture}></img>}
      {isAuthenticated&&console.log(user)}
      <div><h1>{nombre}</h1></div>
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
