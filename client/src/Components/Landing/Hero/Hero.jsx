import React from "react";
import global from "../../GlobalCss/Global.module.css";
import InContainer from "../../GlobalCss/InContainer.module.css";
import styles from "../Hero/Hero.module.css";

const Hero = (props) => {
  return (
    <div className={InContainer.container}>
      <section className={styles.flexHero}>
        <div className={styles.leftHero}>
          <h1 className={styles.textHero}>¡Te damos la bienvenida a Pettin!</h1>
          <div className={styles.previewItems}>
            <span className={styles.recuadro}>Recuadro</span>
            <span className={styles.recuadro}>Recuadro2</span>
          </div>
        </div>

        <div className={styles.rightHero}>
          <img src="/assets/img/pets-landing-cover.jpg" alt="" className={styles.imgHero}/>
          {/* <span className={styles.imgHero}>Imagen</span> */}
        </div>
      </section>
    </div>
  );
};

export default Hero;
