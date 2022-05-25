import React from "react";
import NavBar from "../NavBar/NavBar";
import Hero from "./Hero/Hero";
import styles from "../Landing/Landing.module.css";
import WhatWeOffer from "./WhatWeOffer/WhatWeOffer";
import Team from "./Team/Team";
import Footer from "./Footer/Footer";

function Landing() {
  return (
    <div>
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
