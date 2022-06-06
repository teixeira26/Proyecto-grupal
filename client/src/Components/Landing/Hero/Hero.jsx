import React from "react";
import LoginLanding from '../../Auth0/LoginLanding'
import global from "../../GlobalCss/Global.module.css";
import InContainer from "../../GlobalCss/InContainer.module.css";
import styles from "../Hero/Hero.module.css";

const Hero = (props) => {
  return (
    <div className={InContainer.container}>
      <section className={styles.flexHero}>
        <div className={styles.leftHero}>
          <h1 className={styles.textHero}>¡Te damos la <br /> bienvenida a <br /> yumPaw!</h1>
          <p className={styles.paragraph}>Donde podrás encontrar todo para tus mascotas en un solo sitio. <br /> ¿Qué estás esperando para ingresar?</p>
          <div className={styles.previewItems}>
            <LoginLanding/ >
          </div>
        </div>

        <div className={styles.rightHero}>
          <img src="/assets/img/vector.png" alt="" className={styles.imgHero}/>
          {/* <span className={styles.imgHero}>Imagen</span> */}
        </div>
      </section>
    </div>
  );
};

export default Hero;
