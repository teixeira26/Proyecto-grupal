import React from "react";
import global from "../../GlobalCss/Global.module.css";
import InContainer from "../../GlobalCss/InContainer.module.css";
import styles from "../Hero/Hero.module.css";

const Hero = () => {
  return (
    <div className={InContainer.container}>
      <section className={styles.flexHero}>
        <div className={styles.leftHero}>
          <h1 className={styles.textHero}>Lorem ipsum dolor <br /> sit amet  consectetur <br />adipisicing elit. Sint.</h1>

          <div className={styles.previewItems}>
            <span className={styles.recuadro}>Recuadro</span>
            <span className={styles.recuadro}>Recuadro2</span>
          </div>
        </div>

        <div className={styles.rightHero}>
          <span className={styles.imgHero}>Imagen</span>
        </div>
      </section>
    </div>
  );
};

export default Hero;
